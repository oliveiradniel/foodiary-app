import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { AppText } from '@ui/components/AppText';
import { CreateMealOptions } from '@ui/components/CreateMealOptions';
import { View } from 'react-native';

export function EmptyState() {
	return (
		<View style={styles.container}>
			<AppText color={theme.colors.gray[700]}>
				Cadastre sua primeira refeição através das opções abaixo:
			</AppText>

			<CreateMealOptions />
		</View>
	);
}
