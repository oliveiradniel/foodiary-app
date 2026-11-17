import { theme } from '@ui/styles/theme';

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.black[700],
	},
	imageContainer: {
		position: 'relative',
		height: 211,
	},
	image: {
		width: '100%',
		height: '100%',
		...StyleSheet.absoluteFill,
	},
	blurTarget: {
		...StyleSheet.absoluteFill,
	},
	blurView: {
		width: 48,
		height: 48,
		borderRadius: 12,
		overflow: 'hidden',
	},
	overlay: {
		width: '100%',
		height: '100%',
		...StyleSheet.absoluteFill,
		paddingHorizontal: 12,
	},
	content: {
		height: 64,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingRight: 16,
	},
	pageTitleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	caloriesContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	macrosContainer: {
		flexDirection: 'row',
		gap: 2,
		padding: 20,
	},
	macro: {
		flex: 1,
		alignItems: 'center',
		gap: 8,
	},
	macrosProgressContainer: {
		marginHorizontal: 20,
		marginTop: 4,
	},
	macrosProgress: {
		height: 4,
		flexDirection: 'row',
	},
	proteinsProgress: {
		height: '100%',
		backgroundColor: theme.colors.support.teal,
	},
	carbohydratesProgress: {
		height: '100%',
		backgroundColor: theme.colors.support.yellow,
	},
	fatsProgress: {
		height: '100%',
		backgroundColor: theme.colors.support.orange,
	},
	divider: {
		height: 1,
		backgroundColor: theme.colors.gray[400],
		marginTop: 20,
	},
	mealNameContainer: {
		margin: 20,
		marginBottom: 24,
	},
	mealName: {
		letterSpacing: -0.24,
	},
	mealsItemsHeader: {
		marginHorizontal: 20,
		marginBottom: 8,
	},
});
