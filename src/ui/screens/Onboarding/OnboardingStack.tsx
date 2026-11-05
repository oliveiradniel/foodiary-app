import {
	createNavigationContainerRef,
	NavigationContainer,
	NavigationIndependentTree,
	type RouteProp,
} from '@react-navigation/native';
import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { ActivityLevelStep } from '@ui/screens/Onboarding/steps/ActivityLevelStep';
import { BirthdateStep } from '@ui/screens/Onboarding/steps/BirthdateStep';
import { CreateAccountStep } from '@ui/screens/Onboarding/steps/CreateAccountStep';
import { GenderStep } from '@ui/screens/Onboarding/steps/GenderStep';
import { GoalStep } from '@ui/screens/Onboarding/steps/GoalStep';
import { HeightStep } from '@ui/screens/Onboarding/steps/HeightStep';
import { WeightStep } from '@ui/screens/Onboarding/steps/WeightStep';

export type OnboardingStackParamList = {
	goal: undefined;
	gender: undefined;
	birthdate: undefined;
	height: undefined;
	weight: undefined;
	activityLevel: undefined;
	createAccount: undefined;
};

export type OnboardingStackNavigationProps =
	NativeStackNavigationProp<OnboardingStackParamList>;

export type OnboardingStackScreenProps<
	TRouteName extends keyof OnboardingStackParamList,
> = NativeStackScreenProps<OnboardingStackParamList, TRouteName>;

export type OnboardingStackRouteProps<
	TRouteName extends keyof OnboardingStackParamList,
> = RouteProp<OnboardingStackParamList, TRouteName>;

const Stack = createNativeStackNavigator<OnboardingStackParamList>();
export const onboardingNavigation =
	createNavigationContainerRef<OnboardingStackParamList>();

export function OnboardingStack() {
	return (
		<NavigationIndependentTree>
			<NavigationContainer ref={onboardingNavigation}>
				<Stack.Navigator
					screenOptions={{ headerShown: false }}
					initialRouteName="goal"
				>
					<Stack.Screen name="activityLevel" component={ActivityLevelStep} />
					<Stack.Screen name="birthdate" component={BirthdateStep} />
					<Stack.Screen name="createAccount" component={CreateAccountStep} />
					<Stack.Screen name="gender" component={GenderStep} />
					<Stack.Screen name="goal" component={GoalStep} />
					<Stack.Screen name="height" component={HeightStep} />
					<Stack.Screen name="weight" component={WeightStep} />
				</Stack.Navigator>
			</NavigationContainer>
		</NavigationIndependentTree>
	);
}
