import { useAccountQuery } from '@services/AccountsService/hooks/useAccountQuery';

import { styles } from './styles';

import { GoalStats } from '@ui/components/GoalStats';
import { View } from 'react-native';

export function CurrentGoal() {
	const { account } = useAccountQuery();

	return (
		<View style={styles.container}>
			<GoalStats
				calories={{ goal: account!.goal.calories }}
				proteins={{ goal: account!.goal.proteins }}
				carbohydrates={{ goal: account!.goal.carbohydrates }}
				fats={{ goal: account!.goal.fats }}
			/>
		</View>
	);
}
