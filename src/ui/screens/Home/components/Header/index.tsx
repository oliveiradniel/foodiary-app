import { styles } from './styles';

import { AppText } from '@ui/components/AppText';
import { View } from 'react-native';
import { CurrentGoal } from '../CurrentGoal';
import { DateSwitcher } from '../DateSwitcher';
import { UserHeader } from '../UserHeader';

export function Header() {
	return (
		<View>
			<UserHeader />

			<View style={styles.container}>
				<DateSwitcher />
				<CurrentGoal />

				<View style={styles.divider} />

				<AppText weight="medium" style={styles.mealsLabel}>
					REFEIÇÕES
				</AppText>
			</View>
		</View>
	);
}
