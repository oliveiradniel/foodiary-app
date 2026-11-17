import { StyleSheet } from 'react-native';

const baseColors = {
	light: { primary: 'rgb(250, 250, 250)', secondary: 'rgb(205, 205, 205)' },
	dark: { primary: 'rgb(17, 17, 17)', secondary: 'rgb(51, 51, 51)' },
} as const;

function makeGradient(mode: keyof typeof baseColors) {
	const { primary, secondary } = baseColors[mode];

	return [primary, secondary, secondary, primary, secondary, primary] as const;
}

export const skeletonColors = {
	light: {
		background: baseColors.light.primary,
		gradient: makeGradient('light'),
	},
	dark: {
		background: baseColors.dark.primary,
		gradient: makeGradient('dark'),
	},
};

export const styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
		pointerEvents: 'none',
	},
	gradientTrack: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
	},
});
