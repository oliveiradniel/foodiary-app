This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

This project uses **pnpm** (`pnpm-lock.yaml`). Never use npm, yarn or bun.

```bash
pnpm expo install <package>  # ALWAYS use instead of pnpm add — resolves SDK-compatible versions
pnpm start                   # start the dev server
pnpm lint                    # lint (oxlint)
pnpm lint:fix                # lint and auto-fix (oxlint --fix)
pnpm typecheck               # typecheck (tsc --noEmit)
pnpm exec prettier --write . # format
pnpm dlx expo-doctor         # diagnose dependency and config issues
pnpm expo install --fix      # fix incompatible package versions
```

Run `pnpm lint` and `pnpm typecheck` before declaring any task done.

## Linting

The linter is **oxlint** (config in `.oxlintrc.json`), and formatting is **Prettier** (`.prettierrc`: tabs, single quotes).

- **Never run `expo lint`.** In a project without ESLint, it installs `eslint` and `eslint-config-expo` and creates `eslint.config.js` without asking.
- Do not add ESLint or any ESLint config or plugin.

## Navigation

Navigation uses **React Navigation** (`@react-navigation/native` + `@react-navigation/native-stack`). The project does **not** use Expo Router: do not install `expo-router` or create file-based routes.

- Navigators live in `src/app/navigation/` (alias `@app/*`). `index.tsx` exports `Navigation`, which renders the `NavigationContainer`. Each stack lives in its own file (e.g. `AuthStack.tsx`).
- Screens live in `src/ui/screens/<Name>/` (alias `@ui/*`) and are registered in a stack with `Stack.Screen`. Screen components do not live in `src/app/`.
- Each stack declares its own `ParamList` and exports typed helpers (`AuthStackNavigationProps`, `AuthStackScreenProps<Route>`, `AuthStackRouteProps<Route>`). Use them with `useNavigation<...>()` and `useRoute<...>()`. Do not use untyped navigation.
- Route names are camelCase strings (`greetings`, `onboarding`).
- Docs: https://reactnavigation.org/docs/getting-started

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `pnpm dlx eas-cli@latest <command>`; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `pnpm expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
