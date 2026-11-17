import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { EditGoals } from '@ui/screens/EditGoals';
import { Home } from '@ui/screens/Home';
import { MealDetails } from '@ui/screens/MealDetails';
import { Profile } from '@ui/screens/Profile';

import type { RouteProp } from '@react-navigation/native';

export type AppStackParamList = {
	home: undefined;
	mealDetails: {
		mealId: string;
	};
	editGoals: undefined;
	profile: undefined;
};

export type AppStackNavigationProps =
	NativeStackNavigationProp<AppStackParamList>;

export type AppStackScreenProps<TRouteName extends keyof AppStackParamList> =
	NativeStackScreenProps<AppStackParamList, TRouteName>;

export type AppStackRouteProps<TRouteName extends keyof AppStackParamList> =
	RouteProp<AppStackParamList, TRouteName>;

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="home" component={Home} />
			<Stack.Screen name="mealDetails" component={MealDetails} />
			<Stack.Screen name="editGoals" component={EditGoals} />
			<Stack.Screen name="profile" component={Profile} />
		</Stack.Navigator>
	);
}
