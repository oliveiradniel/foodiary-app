import { ActivityIndicator, Platform, Pressable, View } from 'react-native';
import { AppText } from '../AppText';

import { theme } from '@ui/styles/theme';
import { buttonStyles, ButtonVariants, styles } from './styles';

import type { LucideIcon } from 'lucide-react-native';
import type { ComponentProps, ReactNode } from 'react';

type ButtonProps = Omit<ComponentProps<typeof Pressable>, 'children'> &
	Omit<ButtonVariants, 'disabled'> & {
		children?: ReactNode;
		isLoading?: boolean;
		leftIcon?: LucideIcon;
		rippleStyle?: 'light' | 'dark';
	};

export function Button({
	children,
	variant,
	size,
	disabled: disabledProp,
	style,
	isLoading,
	leftIcon: LeftIcon,
	rippleStyle = 'dark',
	...props
}: ButtonProps) {
	const disabled = disabledProp || isLoading;

	const childEl =
		typeof children === 'string' ? (
			<AppText weight="medium">{children}</AppText>
		) : (
			children
		);

	const rippleColor =
		rippleStyle === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';

	return (
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
			android_ripple={{ color: rippleColor, foreground: true }}
			disabled={disabled}
			{...props}
		>
			{!isLoading ? (
				<View style={styles.content}>
					{LeftIcon && <LeftIcon color={theme.colors.black[700]} size={20} />}
					{childEl}
				</View>
			) : (
				<ActivityIndicator color={theme.colors.black[700]} />
			)}
		</Pressable>
	);
}
