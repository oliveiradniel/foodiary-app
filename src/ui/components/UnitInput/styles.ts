import { theme } from '@ui/styles/theme';

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 8,
	},
	input: {
		flex: 1,
	},
	unit: {
		width: 60,
		height: 52,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		backgroundColor: theme.colors.gray[300],
	},
});
