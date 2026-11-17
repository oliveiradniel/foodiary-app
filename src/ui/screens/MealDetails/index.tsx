import { useRoute } from '@react-navigation/native';
import { useMealQuery } from '@services/MealsService/hooks/useMealQuery';

import { styles } from './styles';

import { AppText } from '@ui/components/AppText';
import { Skeleton } from '@ui/components/Skeleton';
import { FlatList, View } from 'react-native';
import { Header } from './components/Header';

import type { AppStackRouteProps } from '@app/navigation/AppStack';

export function MealDetails() {
	const { params } = useRoute<AppStackRouteProps<'mealDetails'>>();

	const { meal, isLoadingMeal } = useMealQuery(params.mealId);

	return (
		<View style={styles.container}>
			<FlatList
				data={meal?.foods ?? []}
				ListHeaderComponent={<Header meal={meal} isLoading={isLoadingMeal} />}
				ListEmptyComponent={
					!isLoadingMeal ? undefined : (
						<>
							<View style={styles.food}>
								<Skeleton width="100%" height={24} colorMode="light" />
							</View>
							<View style={styles.food}>
								<Skeleton width="100%" height={24} colorMode="light" />
							</View>
							<View style={styles.food}>
								<Skeleton width="100%" height={24} colorMode="light" />
							</View>
						</>
					)
				}
				renderItem={({ item: food }) => {
					const formatQuantity = (quantity: string) =>
						quantity.replace(/(\d)\s+(?=[a-zA-Z])/g, '$1');

					return (
						<View style={styles.food}>
							<AppText>
								{formatQuantity(food.quantity)} {food.name}
							</AppText>
						</View>
					);
				}}
			/>
		</View>
	);
}
