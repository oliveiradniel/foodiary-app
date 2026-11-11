import { theme } from '@ui/styles/theme';

import { Text } from 'react-native';

import type { ComponentProps } from 'react';
import type { TextStyle } from 'react-native';

type AppTextProps = ComponentProps<typeof Text> & {
	size?: keyof typeof theme.fontSize;
	family?: keyof typeof theme.fontFamily;
	weight?: keyof typeof theme.fontFamily.sans;
	align?: TextStyle['textAlign'];
	color?: string;
};

export function AppText({
	size = 'base',
	family = 'sans',
	weight = 'regular',
	align = 'left',
	color = theme.colors.black[700],
	style,
	...props
}: AppTextProps) {
	return (
		<Text
			style={[
				{
					fontFamily: theme.fontFamily[family][weight],
					fontSize: theme.fontSize[size],
					color,
					textAlign: align,
				},
				style,
			]}
			{...props}
		/>
	);
}
