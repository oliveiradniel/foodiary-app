import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { cloneElement, ReactElement } from 'react';
import { type StyleProp, View, ViewStyle } from 'react-native';
import { AppText } from '../AppText';

type FormGroupProps = {
	label: string;
	children: ReactElement<{ error?: boolean }>;
	error?: string;
	style?: StyleProp<ViewStyle>;
};

export function FormGroup({ label, children, error, style }: FormGroupProps) {
	return (
		<View style={[styles.container, style]}>
			<AppText weight="medium">{label}</AppText>

			{cloneElement(children, { error: !!error })}

			{error && (
				<AppText size="sm" color={theme.colors.support.red}>
					{error}
				</AppText>
			)}
		</View>
	);
}
