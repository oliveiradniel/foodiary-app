import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { Home } from '@ui/screens/Home';
import { MealDetails } from '@ui/screens/MealDetails';

import type { RouteProp } from '@react-navigation/native';

export type AppStackParamList = {
	home: undefined;
	mealDetails: {
		mealId: string;
	};
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
		</Stack.Navigator>
	);
}
