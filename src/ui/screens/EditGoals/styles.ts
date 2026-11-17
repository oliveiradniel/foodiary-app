import { theme } from '@ui/styles/theme';

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.white,
	},
	content: {
		flexGrow: 1,
		gap: 40,
		paddingHorizontal: 20,
		paddingVertical: 24,
	},
	footer: {
		flexDirection: 'row',
		gap: 16,
		paddingHorizontal: 20,
		paddingTop: 20,
		borderTopWidth: 1,
		borderTopColor: theme.colors.gray[400],
	},
	footerButton: {
		flex: 1,
	},
});
