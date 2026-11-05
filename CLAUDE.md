# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Commands, linting rules, navigation conventions, EAS usage and the Expo docs policy live in `AGENTS.md`, imported here so there is one source of truth:

@AGENTS.md

No test runner is configured, so `pnpm lint` and `pnpm typecheck` are the only automated checks.

## Architecture

`index.ts` registers `src/ui/App.tsx`, which loads the Host Grotesk fonts (rendering nothing until they are ready), sets up the gesture handler and safe area providers, and renders `Navigation` from `@app/navigation`. There is no auth or session logic yet: `AuthStack` is the only root stack.

UI text is in Brazilian Portuguese.

### Onboarding is a nested, independent navigator

Onboarding is the one exception to the rule that navigators live in `src/app/navigation/`. `src/ui/screens/Onboarding/OnboardingStack.tsx` has its own `NavigationContainer` inside a `NavigationIndependentTree`, mounted under the `onboarding` route of `AuthStack`. This has a few consequences:

- `useNavigation()` inside a step does not reach `AuthStack`, because the tree is independent. Steps move through `useOnboarding()` (`nextStep`, `previousStep`), not through navigation hooks.
- `OnboardingProvider` wraps the independent tree, so it holds both handles: the module-level `onboardingNavigation` ref for the inner stack, and `useNavigation<AuthStackNavigationProps>()` for the outer one. `previousStep` falls back to the outer `goBack()` when the inner stack cannot go back.
- `OnboardingHeader` renders outside the inner stack and derives its progress bar from `currentStepIndex` and `TOTAL_STEPS`.

Adding a step takes three edits: the route in `OnboardingStackParamList`, a `Stack.Screen` in `OnboardingStack.tsx` (these are alphabetical), and its position in `orderedSteps` in `steps.ts`. Flow order comes from `orderedSteps`, not from the `Stack.Screen` order.

Step components in `steps/` are built from the compound parts in `components/Step` (`Step`, `StepHeader`, `StepTitle`, `StepSubtitle`, `StepContent`, `StepFooter`).

### Component conventions

- A component lives in `src/ui/components/<Name>/` as `index.tsx` plus `styles.ts`. Components used by only one screen go in that screen's `components/` folder.
- Components with variants use `createVariants` (`@ui/styles/utils/createVariants`) in `styles.ts` and export their prop types with `VariantProps`. Boolean variants are keyed by the strings `'true'` and `'false'` (see `Button/styles.ts`).
- Colors, font sizes and font families come from `theme` (`@ui/styles/theme`). Render text with `AppText`, which applies the theme's fonts.
- Logic-heavy components move state into a `use<Name>Controller` hook and expose an imperative API through a `ref` prop and `useImperativeHandle`, as `SignInBottomSheet` does.
- React 19 style: `ref` is a regular prop, not `forwardRef`.
- `Input` takes an optional `formatter` for masking text, with formatters in `src/ui/utils/`. It also takes `InputComponent` to swap the underlying text input.
- The React Compiler is enabled in `app.json` (`experiments.reactCompiler`).
