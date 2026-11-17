# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Commands, linting rules, navigation conventions, EAS usage and the Expo docs policy live in `AGENTS.md`, imported here so there is one source of truth:

@AGENTS.md

No test runner is configured, so `pnpm lint` and `pnpm typecheck` are the only automated checks. Copy `.env.example` to `.env` and set `EXPO_PUBLIC_API_URL` before starting the app; `src/app/config/env.ts` throws at import time if it is missing or not a URL.

## What the app is

Foodiary is a diet tracker. A new user goes through an onboarding questionnaire (goal, gender, birthdate, height, weight, activity level) and creates an account; the API answers with daily targets for calories, proteins, carbohydrates and fats. The user then logs meals by **recording an audio** describing what they ate or **taking a photo** of the plate. The file goes to the backend, which processes it asynchronously with AI and returns the meal's name, icon and foods with their macros. The home screen shows the meals of the selected day and the progress against the daily targets.

The backend is a separate REST API, not in this repo. UI text and validation messages are in Brazilian Portuguese.

Stack: Expo SDK 58, React Native 0.88, React 19 with the React Compiler, React Navigation (native stack), TanStack Query, axios, react-hook-form + zod 4, `@gorhom/bottom-sheet`, Reanimated, `expo-audio`, `expo-camera`, `expo-video`, `expo-file-system`, `lucide-react-native` icons.

## Source layout

Three layers under `src/`, each with a path alias:

- `@app/*` (`src/app/`): non-visual infrastructure. `config/` (env), `contexts/` (global providers), `lib/` (query client, token storage, file helpers), `navigation/` (stacks), `types/` (domain enums and types), `hooks/`.
- `@services/*` (`src/services/`): API access and the React Query hooks for it.
- `@ui/*` (`src/ui/`): `App.tsx`, shared `components/`, `screens/`, `styles/` (theme and `createVariants`), `utils/` (formatters and calculations), `assets/`.

Domain types live in `src/app/types/` as TypeScript string enums whose values match the API (`Goal.LOSE`, `MealStatus.PROCESSING`, `ERROR_CODE.INVALID_CREDENTIALS`).

## Startup and navigation

`index.ts` registers `src/ui/App.tsx`, which loads the Host Grotesk fonts (rendering nothing until they are ready), then nests `GestureHandlerRootView` → `SafeAreaProvider` → `QueryClientProvider` → `AuthProvider` → `Navigation`.

Route tree:

```
NavigationContainer (src/app/navigation/index.tsx)
└─ RootStack
   ├─ auth → AuthStack              rendered when signed out
   │  ├─ greetings                  Greetings: landing, "Criar conta" + SignInBottomSheet
   │  └─ onboarding                 Onboarding → OnboardingStack (independent tree)
   │     ├─ goal                    GoalStep
   │     ├─ gender                  GenderStep
   │     ├─ birthdate               BirthdateStep
   │     ├─ height                  HeightStep
   │     ├─ weight                  WeightStep
   │     ├─ activityLevel           ActivityLevelStep
   │     └─ createAccount           CreateAccountStep: calls signUp
   └─ app → AppStack                rendered when signed in
      ├─ home                       Home: meals of the day, goals, FAB
      ├─ mealDetails { mealId }     MealDetails: foods of one meal
      ├─ editGoals                  EditGoals: daily calorie and macro targets
      └─ profile                    Profile: name, birthdate, height, weight, gender; sign out
```

### Stacks

| Stack             | File                                            | Routes                                        | Typed helpers      |
| ----------------- | ----------------------------------------------- | --------------------------------------------- | ------------------ |
| `RootStack`       | `src/app/navigation/RootStack.tsx`              | `auth`, `app`                                 | `RootStack*`       |
| `AuthStack`       | `src/app/navigation/AuthStack.tsx`              | `greetings`, `onboarding`                     | `AuthStack*`       |
| `AppStack`        | `src/app/navigation/AppStack.tsx`               | `home`, `mealDetails`, `editGoals`, `profile` | `AppStack*`        |
| `OnboardingStack` | `src/ui/screens/Onboarding/OnboardingStack.tsx` | the seven steps, in `orderedSteps` order      | `OnboardingStack*` |

- Every stack is a `createNativeStackNavigator` with `headerShown: false`; headers are custom components inside the screens.
- Each file exports its `<Name>StackParamList` and three helpers: `<Name>StackNavigationProps` (for `useNavigation`), `<Name>StackScreenProps<Route>` and `<Name>StackRouteProps<Route>` (for `useRoute`). Example: `useRoute<AppStackRouteProps<'mealDetails'>>()`.
- A screen navigates only within its own stack. `navigate('mealDetails', { mealId })` is the only route with params.
- `RootStack` does not navigate between `auth` and `app`: it conditionally renders one `Stack.Screen` or the other from `signedIn`, so sign in, sign up and sign out just change the session and the stack swaps (`animationTypeForReplace` is `pop` for auth, `push` for app). Never call `navigate('app')`.
- Components rendered inside `AppStack` but outside a screen's own tree (modals opened from Home, like `AudioModal` and `PictureModal`) still use `useNavigation<AppStackNavigationProps>()`.
- `editGoals` is opened by the "Metas" button in Home's `UserHeader`, and `profile` by tapping the avatar and name next to it.

To add a screen to `AuthStack` or `AppStack`: add the route to the `ParamList`, create the screen in `src/ui/screens/<Name>/`, and register it with `Stack.Screen`. Onboarding steps follow their own rules (see below).

## Auth and session

`AuthProvider` (`src/app/contexts/AuthContext/`) restores the tokens saved in AsyncStorage by `AuthTokensManager` on startup and keeps the splash screen visible until that finishes. `useAuthContext()` exposes `signedIn`, `signedUp`, `signIn`, `signUp` and `signOut`.

- `signedIn` is true when the `['account']` query has data. Because `AppStack` only renders when the account exists, its screens read `useAccountQuery().account!` with a non-null assertion.
- `signedUp` is true only in the session where the account was just created; Home's `WelcomeModal` uses it to show the daily targets once.
- `signIn` and `signUp` reject if the account fails to load after the tokens are issued, so callers must handle that failure as well as a rejected credentials request.
- `setupAuth` installs a response interceptor through `Service.setRefreshTokenHandler`. On a 401 it calls `/auth/refresh-token` once (concurrent 401s share one refresh promise), saves the new tokens and retries the request. If the refresh fails, it calls `signOut`.
- `signOut` drops the token and interceptor, clears the whole query cache and the stored tokens. The UI calls it from the log out button in the `Profile` header.

## Service layer

All HTTP access lives in `src/services/` (alias `@services/*`). Components never import axios to call the API; they go through a query or mutation hook, or, for auth, through `AuthContext`.

```
src/services/
├─ Service.ts                    abstract base: shared client, token, refresh, upload
├─ AuthService.ts                no hooks; used only by AuthProvider
├─ AccountsService/
│  ├─ index.ts
│  └─ hooks/useAccountQuery.ts
├─ GoalsService/
│  ├─ index.ts
│  └─ hooks/useUpdateGoalMutation.ts
├─ ProfilesService/
│  ├─ index.ts
│  └─ hooks/useUpdateProfileMutation.ts
└─ MealsService/
   ├─ index.ts
   └─ hooks/useMealsQuery.ts, useMealQuery.ts, useCreateMealMutation.ts
```

### `Service` (base class)

Every service extends `Service` and uses `this.client`, a single static axios instance with `baseURL` from `env.api.url`. Because the client is static and shared, the token and interceptor set on `Service` apply to every service.

- `setAccessToken` / `removeAccessToken`: set or delete the default `Authorization: Bearer` header.
- `setRefreshTokenHandler(handler)` / `removeRefreshTokenHandler`: install or eject the 401 interceptor described in Auth and session. It skips requests already retried (`_retry`) and the `/auth/refresh-token` call itself.
- `uploadPresignedPOST({ uploadSignature, file })`: decodes the base64 signature into `{ url, fields }` and posts a `multipart/form-data` form to that URL using plain `axios`, not `this.client`, so the API's `Authorization` header is not sent to the storage provider.

### Services and endpoints

| Service           | Method           | Endpoint                         | Notes                                                                          |
| ----------------- | ---------------- | -------------------------------- | ------------------------------------------------------------------------------ |
| `AuthService`     | `signIn`         | `POST /auth/sign-in`             | returns `{ accessToken, refreshToken }`                                        |
|                   | `signUp`         | `POST /auth/sign-up`             | `{ account, profile }`; `birthDate` as `YYYY-MM-DD`                            |
|                   | `refresh`        | `POST /auth/refresh-token`       | returns a new token pair                                                       |
| `AccountsService` | `getMe`          | `GET /me`                        | profile plus daily `goal` (calories and macros)                                |
| `GoalsService`    | `update`         | `PUT /goals`                     | `{ calories, proteins, carbohydrates, fats }`; 204                             |
| `ProfilesService` | `update`         | `PUT /profiles`                  | `{ name, birthDate, gender, height, weight }`; 204; does not recalculate goals |
| `MealsService`    | `getMealsByDate` | `GET /meals?date=YYYY-MM-DD`     | `SimplifiedMeal[]`                                                             |
|                   | `getMealById`    | `GET /meals/:id`                 | `Meal` with `status`, `inputType`, `inputFileURL`                              |
|                   | `create`         | `POST /meals` + presigned upload | returns `{ mealId, uploadSignature }`                                          |

### Writing a service

- A service is a class of `static async` methods. Request and response types live in a `namespace` with the same name, merged with the class (`MealsService.CreatePayload`, `AuthService.SignInResponse`), and the method declares its return type with them.
- Destructure `data` from the axios call and return it, converting date strings into `Date` objects (`createdAt`, `birthDate`) before returning.
- Timestamps (`createdAt`) are instants: convert them with `new Date()`. Calendar days (`birthDate`) are sent as `YYYY-MM-DD` and stored by the API at UTC midnight: send them with `formatLocalDate` and read them back with `utcToLocalDate` (both in `src/app/lib/`). `new Date()` on a calendar day shifts it one day back in Brazil (UTC-3). The meals-by-day query also sends the local day with `formatLocalDate`.
- A service that has hooks is a folder with `index.ts`; hooks import it with `from '..'`. A service without hooks is a single file.

### Query and mutation hooks

- Hooks wrap `useQuery`/`useMutation` and return renamed fields instead of the raw result: `useAccountQuery` → `account`, `loadAccount`; `useMealsQuery` → `meals`, `isInitialLoading`, `isLoading`, `loadMeals`; `useMealQuery` → `meal`, `isLoadingMeal`, `isProcessingMeal`; `useCreateMealMutation` → `createMeal`, `createdMealId`, `isCreatingMeal`; `useUpdateGoalMutation` → `updateGoal`, `isUpdatingGoal`; `useUpdateProfileMutation` → `updateProfile`, `isUpdatingProfile`. Both invalidate `['account']` on success and resolve only after the refetch, so Home shows the new data on return.
- `queryClient` (`src/app/lib/queryClient.ts`) turns retries off for queries and mutations, and the queries use `staleTime: Infinity`, so data only refreshes when something invalidates or refetches it. Invalidate after a mutation that changes server data.
- Query keys: `['account']`, `['meals', 'YYYY-MM-DD']`, `['meal', id]`. `useMealsQuery` uses `keepPreviousData` so switching days keeps the previous list visible while loading.
- `AuthProvider` creates `useAccountQuery({ enabled: false })` and loads it on demand with `loadAccount({ throwOnError: true })`; screens call `useAccountQuery()` and read from the cache.

### Errors

API errors come back as `error.response.data.error.code` and are compared with `ERROR_CODE` (`src/app/types/ErrorCode.ts`) after `isAxiosError(error)`. User-facing failures are shown with `Alert.alert('Oops!', '<message>')`, with a specific message for known codes and a generic one otherwise.

## Meal creation

Meals are created from an audio recording (`AudioModal`) or a photo (`PictureModal`), both opened by `CreateMealOptions`, which the Home `EmptyState` and `Fab` render. The flow:

1. `useCreateMealMutation` reads the file with `getFileInfo`, which picks the MIME type from the extension: `.jpg` is `image/jpeg`, anything else `audio/m4a`. The API accepts only those two.
2. `MealsService.create` posts to `/meals` with the timezone and file metadata, then uploads the file to storage with `Service.uploadPresignedPOST`, decoding the base64 `uploadSignature` into the URL and form fields.
3. The modal controller passes the new `mealId` to `useMealQuery`, which polls every 3s while the status is `UPLOADING`, `QUEUED` or `PROCESSING`. `CreateMealLoader` plays a looping video meanwhile.
4. On `SUCCESS` the controller closes the modal, calls `onCreate`, invalidates `['meals']` and navigates to `mealDetails`. On `FAILED` it shows an alert.

`useAudioModalController` and `usePictureModalController` duplicate this status handling; a change to one usually belongs in both.

## Home screen

`useHomeController` owns the selected date and the meals query. `Home` passes that state into `HomeProvider`, and the `FlatList` header, empty state and cards read it with `useHomeContext()` instead of props. `CurrentGoal` sums the day's foods with `calculateFoodsSummary` (calories derived as 4/4/9 kcal per gram of protein/carbohydrate/fat) and compares them with the account's goals in `GoalStats`. The `Fab` only appears when the day has meals; otherwise `EmptyState` shows the create options inline.

## Onboarding is a nested, independent navigator

Onboarding is the one exception to the rule that navigators live in `src/app/navigation/`. `src/ui/screens/Onboarding/OnboardingStack.tsx` has its own `NavigationContainer` inside a `NavigationIndependentTree`, mounted under the `onboarding` route of `AuthStack`. This has a few consequences:

- `useNavigation()` inside a step does not reach `AuthStack`, because the tree is independent. Steps move through `useOnboarding()` (`nextStep`, `previousStep`), not through navigation hooks.
- `OnboardingProvider` wraps the independent tree, so it holds both handles: the module-level `onboardingNavigation` ref for the inner stack, and `useNavigation<AuthStackNavigationProps>()` for the outer one. `previousStep` falls back to the outer `goBack()` when the inner stack cannot go back.
- `currentStepIndex` comes from a `state` listener on the inner container, so it also follows the iOS back gesture and the Android back button.
- `OnboardingHeader` renders outside the inner stack and derives its progress bar from `currentStepIndex` and `TOTAL_STEPS`.

All steps share one form: `Onboarding/index.tsx` creates it with `useForm` + `zodResolver(onboardingSchema)` and provides it with `FormProvider`. Each step reads it with `useFormContext<OnboardingSchema>()` and validates only its own field with `form.trigger('<field>')` before calling `nextStep()`. `CreateAccountStep` submits the whole form and calls `signUp`.

Adding a step takes four edits: the field in `schema.ts`, the route in `OnboardingStackParamList`, a `Stack.Screen` in `OnboardingStack.tsx` (these are alphabetical), and its position in `orderedSteps` in `steps.ts`. Flow order comes from `orderedSteps`, not from the `Stack.Screen` order.

Step components in `steps/` are built from the compound parts in `components/Step` (`Step`, `StepHeader`, `StepTitle`, `StepSubtitle`, `StepContent`, `StepFooter`).

## Patterns and conventions

### Components

- A component lives in `src/ui/components/<Name>/` as `index.tsx` plus `styles.ts`. Components used by only one screen go in that screen's `components/` folder. Tiny components without styles can be a single file (`AppText.tsx`, `Logo.tsx`).
- Logic-heavy screens and components move state and handlers into a `use<Name>Controller` hook in the same folder (`useHomeController`, `useAudioModalController`), and the component only renders what the hook returns.
- When the parent needs to drive a component, it exposes an imperative API through a `ref` prop and `useImperativeHandle`, and exports the ref type from the component file, as `SignInBottomSheet` does (`SignInBottomSheetRef` with `open()`).
- React 19 style: `ref` is a regular prop, not `forwardRef`, and contexts are read with `use()`.
- Compound components share state through a local context (`RadioGroup` → `RadioGroupItem`, `RadioGroupIcon`, `RadioGroupLabel`).
- Loading placeholders use `Skeleton` (`@ui/components/Skeleton`): it renders an animated shimmer box (`width`, `height`, `radius`, `colorMode`) while `isLoading` is true (the default) and its `children` after. Do not add Moti back: it imports `SafeAreaView` from `react-native`, which is deprecated in RN 0.88.
- Screens pushed on `AppStack` with a plain white header (`EditGoals`, `Profile`) use `AppHeader` (`@ui/components/AppHeader`): back button on the left, centered `title`, optional `rightAction` (the sign out button in `Profile`). It applies the top safe area inset itself. Number fields with a unit next to them use `UnitInput` (`@ui/components/UnitInput`).
- The React Compiler is enabled in `app.json` (`experiments.reactCompiler`).

### Contexts

A context folder has `index.ts` (the `createContext<Value | null>(null)` and its value type), `<Name>Provider.tsx`, and `use<Name>.ts`, a hook that calls `use()` and throws if it is used outside the provider. See `AuthContext` and `Home/context`.

### Styling

- Styles are `StyleSheet.create` objects in `styles.ts`; values computed at render (safe area insets, loading opacity) are merged inline as an array.
- Colors, font sizes and font families come from `theme` (`@ui/styles/theme`). Translucent colors are separate keys like `theme.colors.lime['700/5']`.
- Render text with `AppText` (`size`, `weight`, `color`, `align`), which applies the theme's fonts. Do not use raw `Text` except nested inside `AppText` for inline highlights.
- Components with variants use `createVariants` (`@ui/styles/utils/createVariants`) in `styles.ts` and export their prop types with `VariantProps`. Boolean variants are keyed by the strings `'true'` and `'false'` (see `Button/styles.ts`).
- `Button` takes `variant` (`primary`, `secondary`, `ghost`, `neutral`), `size` (`default`, `icon`), `isLoading`, `leftIcon` (a Lucide icon) and `rippleStyle`. String children are wrapped in `AppText` automatically.
- Press feedback is `android_ripple` on Android and an opacity change on iOS.

### Forms

- Forms use react-hook-form with `zodResolver`. The schema lives in a `schema.ts` next to the form and exports both the schema and its inferred type.
- Use the zod 4 API: `z.email()`, `z.enum(TsEnum)`, and `{ error: '...' }` in `refine`.
- Fields are rendered with `Controller` → `FormGroup` (label and error message) → `Input`. `FormGroup` injects `error` into its child.
- `Input` takes an optional `formatter` for masking text, with formatters in `src/ui/utils/`. It also takes `InputComponent` to swap the underlying text input (inside a bottom sheet, pass `BottomSheetTextInput`).
- Chain fields with `returnKeyType="next"` and `onSubmitEditing` focusing the next input's ref (`TextInputInstance`).

### Code style

- Prettier: tabs, single quotes, trailing commas, 80 columns. Run `pnpm exec prettier --write .` on changed files.
- Imports are grouped with blank lines, roughly: React and hooks, then styles and theme, then components, then `import type` and domain types.
- Named exports only; screens and components are function declarations.
- Imported asset files need a module declaration in `src/index.d.ts` (only `*.jpg` and `*.mp4` are declared now).
