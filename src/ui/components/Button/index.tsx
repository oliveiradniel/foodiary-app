import { Platform, Pressable, View } from 'react-native';
import { AppText } from '../AppText';

import type { ComponentProps } from 'react';
import { buttonStyles, ButtonVariants, styles } from './styles';

type ButtonProps = ComponentProps<typeof Pressable> &
	Omit<ButtonVariants, 'disabled'>;

export function Button({
	children,
	variant,
	size,
	disabled,
	style,
	...props
}: ButtonProps) {
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
				{childEl}
			</Pressable>
		</View>
	);
}
