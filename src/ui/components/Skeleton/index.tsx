import { useEffect, useState } from 'react';

import { skeletonColors, styles } from './styles';

import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';

import type { ReactNode } from 'react';
import type { DimensionValue, LayoutChangeEvent } from 'react-native';

const GRADIENT_SCALE = 6;

type SkeletonBoxProps = {
	width?: DimensionValue;
	height?: DimensionValue;
	radius?: number;
	colorMode?: 'light' | 'dark';
};

type SkeletonProps = SkeletonBoxProps & {
	isLoading?: boolean;
	children?: ReactNode;
};

export function Skeleton({
	isLoading = true,
	children,
	...props
}: SkeletonProps) {
	if (!isLoading) {
		return children ?? null;
	}

	return <SkeletonBox {...props} />;
}

function SkeletonBox({
	width = '100%',
	height = 32,
	radius = 8,
	colorMode = 'light',
}: SkeletonBoxProps) {
	const [measuredWidth, setMeasuredWidth] = useState(0);

	const progress = useSharedValue(0);

	const colors = skeletonColors[colorMode];

	useEffect(() => {
		progress.set(
			withDelay(200, withRepeat(withTiming(1, { duration: 3000 }), -1, true)),
		);
	}, [progress]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: -progress.get() * measuredWidth * (GRADIENT_SCALE - 1),
			},
		],
	}));

	function handleLayout({ nativeEvent }: LayoutChangeEvent) {
		setMeasuredWidth(nativeEvent.layout.width);
	}

	return (
		<View
			onLayout={handleLayout}
			style={[
				styles.container,
				{
					width,
					height,
					borderRadius: radius,
					backgroundColor: colors.background,
				},
			]}
		>
			{measuredWidth > 0 && (
				<Animated.View
					style={[
						styles.gradientTrack,
						{ width: measuredWidth * GRADIENT_SCALE },
						animatedStyle,
					]}
				>
					<LinearGradient
						colors={colors.gradient}
						start={{ x: 0.1, y: 1 }}
						end={{ x: 1, y: 1 }}
						style={StyleSheet.absoluteFill}
					/>
				</Animated.View>
			)}
		</View>
	);
}
