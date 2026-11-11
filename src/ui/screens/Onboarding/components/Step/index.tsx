import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { AppText } from '@ui/components/AppText';
import { View } from 'react-native';

import type { ReactNode } from 'react';

export function Step({ children }: { children: ReactNode }) {
	const { bottom } = useSafeAreaInsets();

	return (
		<View
			style={[
				styles.container,
				{
					paddingBottom: bottom,
				},
			]}
		>
			{children}
		</View>
	);
}

export function StepHeader({ children }: { children: ReactNode }) {
	return <View style={styles.header}>{children}</View>;
}

export function StepTitle({ children }: { children: ReactNode }) {
	return (
		<AppText size="3xl" weight="semiBold" align="center" style={styles.title}>
			{children}
		</AppText>
	);
}

export function StepSubtitle({ children }: { children: ReactNode }) {
	return (
		<AppText color={theme.colors.gray[700]} align="center">
			{children}
		</AppText>
	);
}

type StepContentProps = {
	children: ReactNode;
	position?: 'end' | 'center';
};

export function StepContent({ children, position = 'end' }: StepContentProps) {
	const isPositionCenter = position === 'center';

	return (
		<View style={[styles.content, isPositionCenter && styles.contentCenter]}>
			{children}
		</View>
	);
}

type StepFooterProps = {
	children: ReactNode;
	align?: 'stretch' | 'end';
};

export function StepFooter({ children, align = 'end' }: StepFooterProps) {
	return (
		<View
			style={[styles.footer, align === 'end' && { alignItems: 'flex-end' }]}
		>
			{children}
		</View>
	);
}
