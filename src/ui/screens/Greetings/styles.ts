import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 16,
	},
	background: {
		...StyleSheet.absoluteFill,
		width: '100%',
		height: '100%',
	},
	ctaContainer: { width: '100%', alignItems: 'center' },
	heading: {
		letterSpacing: -0.32,
		textAlign: 'center',
		maxWidth: 311,
	},
	ctaContent: {
		padding: 20,
		marginTop: 24,
		width: '100%',
	},
	signInContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 16,
		gap: 4,
		paddingVertical: 14,
	},
});
