import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { Logo } from '@ui/components/Logo';
import { ActivityIndicator, View } from 'react-native';

export function FullScreenLoader() {
	return (
		<View style={styles.container}>
			<Logo width={187} height={60} />

			<ActivityIndicator size="large" color={theme.colors.white} />
		</View>
	);
}
