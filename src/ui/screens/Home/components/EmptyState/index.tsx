import { useHomeContext } from '../../context/useHomeContext';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { AppText } from '@ui/components/AppText';
import { CreateMealOptions } from '@ui/components/CreateMealOptions';
import { View } from 'react-native';

export function EmptyState() {
	const { isLoading } = useHomeContext();

	return (
		<View style={[styles.container, { opacity: isLoading ? 0.5 : 1 }]}>
			<AppText color={theme.colors.gray[700]}>
				Cadastre sua primeira refeição através das opções abaixo:
			</AppText>

			<CreateMealOptions disabled={isLoading} />
		</View>
	);
}
