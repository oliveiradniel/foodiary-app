import { ActivityIndicator, Platform, Pressable, View } from 'react-native';
import { AppText } from '../AppText';

import { theme } from '@ui/styles/theme';
import { buttonStyles, ButtonVariants, styles } from './styles';

import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<typeof Pressable> &
	Omit<ButtonVariants, 'disabled'> & {
		isLoading?: boolean;
	};

export function Button({
	children,
	variant,
	size,
	disabled: disabledProp,
	style,
	isLoading,
	...props
}: ButtonProps) {
	const disabled = disabledProp || isLoading;

	const childEl =
		typeof children === 'string' ? (
			<AppText weight="medium">{children}</AppText>
		) : (
			children
		);

	return (
		<View style={styles.wrapper}>
			<Pressable
				style={({ pressed }) => [
					buttonStyles({
						variant,
						size,
						disabled: disabled ? 'true' : 'false',
					}),
					pressed && Platform.OS === 'ios' && { opacity: 0.8 },
					typeof style === 'function' ? style({ pressed }) : style,
				]}
				android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
				disabled={disabled}
				{...props}
			>
				{!isLoading ? (
					childEl
				) : (
					<ActivityIndicator color={theme.colors.black[700]} />
				)}
			</Pressable>
		</View>
	);
}
