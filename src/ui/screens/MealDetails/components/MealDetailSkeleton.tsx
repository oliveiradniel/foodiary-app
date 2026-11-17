import { Skeleton } from 'moti/skeleton';

import type { ReactElement } from 'react';
import type { DimensionValue } from 'react-native';

type MealDetailSkeletonProps = {
	width?: number | DimensionValue;
	height?: number | DimensionValue;
	colorMode?: 'dark' | 'light';
	isLoading?: boolean;
	children: ReactElement | null;
};

export function MealDetailSkeleton({
	width,
	height,
	colorMode = 'light',
	isLoading = false,
	children,
}: MealDetailSkeletonProps) {
	return (
		<Skeleton width={width} height={height} colorMode={colorMode}>
			{isLoading ? null : children}
		</Skeleton>
	);
}
