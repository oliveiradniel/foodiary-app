import { useAccountQuery } from '@services/AccountsService/hooks/useAccountQuery';
import { useMemo } from 'react';
import { useHomeContext } from '../../context/useHomeContext';

import { styles } from './styles';

import { GoalStats } from '@ui/components/GoalStats';
import { View } from 'react-native';

export function CurrentGoal() {
	const { account } = useAccountQuery();
	const { meals, isLoading } = useHomeContext();

	const summary = useMemo(
		() =>
			meals
				.flatMap((meal) => meal.foods)
				.reduce(
					(acc, food) => ({
						calories: acc.calories + food.calories,
						proteins: acc.proteins + food.proteins,
						carbohydrates: acc.carbohydrates + food.carbohydrates,
						fats: acc.fats + food.fats,
					}),
					{ calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
				),
		[meals],
	);

	return (
		<View style={[styles.container, { opacity: isLoading ? 0.5 : 1 }]}>
			<GoalStats
				calories={{ goal: account!.goal.calories, current: summary.calories }}
				proteins={{ goal: account!.goal.proteins, current: summary.proteins }}
				carbohydrates={{
					goal: account!.goal.carbohydrates,
					current: summary.carbohydrates,
				}}
				fats={{ goal: account!.goal.fats, current: summary.fats }}
			/>
		</View>
	);
}
