import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { View } from 'react-native';
import { AppText } from '../AppText';
import { Input } from '../Input';

import type { InputProps } from '../Input';

type UnitInputProps = InputProps & {
	unit: string;
};

export function UnitInput({ unit, style, ...props }: UnitInputProps) {
	return (
		<View style={styles.container}>
			<Input style={[styles.input, style]} {...props} />

			<View style={styles.unit}>
				<AppText color={theme.colors.gray[700]}>{unit}</AppText>
			</View>
		</View>
	);
}
