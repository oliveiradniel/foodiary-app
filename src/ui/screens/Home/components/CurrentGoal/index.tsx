import { useAccountQuery } from '@services/AccountsService/hooks/useAccountQuery';
import { useMemo } from 'react';
import { useHomeContext } from '../../context/useHomeContext';

import { calculateFoodsSummary } from '@ui/utils/calculateFoodsSummary';

import { styles } from './styles';

import { GoalStats } from '@ui/components/GoalStats';
import { View } from 'react-native';

export function CurrentGoal() {
	const { account } = useAccountQuery();
	const { meals, isLoading } = useHomeContext();

	const summary = useMemo(
		() => calculateFoodsSummary(meals.flatMap((meal) => meal.foods)),
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
