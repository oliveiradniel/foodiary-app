import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		right: 16,
	},
	bottomSheet: {
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 18,
		},
		shadowOpacity: 0.25,
		shadowRadius: 20.0,
		elevation: 24,
	},
	content: {
		paddingHorizontal: 24,
		gap: 24,
	},
	title: {
		letterSpacing: -0.4,
	},
});
