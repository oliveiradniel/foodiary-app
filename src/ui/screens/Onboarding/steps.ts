import { OnboardingStackParamList } from './OnboardingStack';

export const orderedSteps: (keyof OnboardingStackParamList)[] = [
	'goal',
	'gender',
	'birthdate',
	'height',
	'weight',
	'activityLevel',
	'createAccount',
];

export const TOTAL_STEPS = orderedSteps.length;
