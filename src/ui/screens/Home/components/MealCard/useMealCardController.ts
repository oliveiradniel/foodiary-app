import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { useHomeContext } from '../../context/useHomeContext';

import { calculateFoodsSummary } from '@ui/utils/calculateFoodsSummary';

import type { AppStackNavigationProps } from '@app/navigation/AppStack';
import type { SimplifiedMeal } from '@app/types/Meal';

export function useMealCardController(meal: SimplifiedMeal) {
	const { isLoading } = useHomeContext();

	const { navigate } = useNavigation<AppStackNavigationProps>();

	const formattedFoods = useMemo(
		() =>
			meal.foods
				.map((food, index) => {
					const name = food.name;

					if (index === 0) {
						return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
					}

					return name;
				})
				.join(', '),
		[meal.foods],
	);

	const summary = useMemo(
		() => calculateFoodsSummary(meal.foods),
		[meal.foods],
	);

	return { formattedFoods, summary, navigate, isLoading };
}
