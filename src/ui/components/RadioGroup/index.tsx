import { createContext, use } from 'react';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { TouchableOpacity, View } from 'react-native';
import { AppText } from '../AppText';

import type { ReactNode } from 'react';

type RadioGroupContextValue = {
	value: string | null;
	setValue: (value: string) => void;
	isHorizontal: boolean;
	error: boolean;
};

const RadioGroupContext = createContext({} as RadioGroupContextValue);

type RadioGroupProps = {
	children: ReactNode;
	value: string | null;
	onChangeValue: (value: string) => void;
	orientation?: 'vertical' | 'horizontal';
	error?: boolean;
};

export function RadioGroup({
	children,
	value,
	onChangeValue,
	orientation = 'vertical',
	error = false,
}: RadioGroupProps) {
	const isHorizontal = orientation === 'horizontal';

	return (
		<RadioGroupContext.Provider
			value={{ value, setValue: onChangeValue, isHorizontal, error }}
		>
			<View
				style={[styles.container, isHorizontal && styles.containerHorizontal]}
			>
				{children}
			</View>
		</RadioGroupContext.Provider>
	);
}

type RadioGroupItemProps = {
	children: ReactNode;
	value: string;
};

const RadioGroupItemContext = createContext({ isSelected: false });

export function RadioGroupItem({ children, value }: RadioGroupItemProps) {
	const {
		value: selectedValue,
		setValue,
		isHorizontal,
		error,
	} = use(RadioGroupContext);
	const isSelected = value === selectedValue;

	return (
		<RadioGroupItemContext.Provider value={{ isSelected }}>
			<TouchableOpacity
				style={[
					styles.item,
					isHorizontal && styles.horizontalItem,
					isSelected && styles.selectedItem,
					error && styles.errorItem,
				]}
				onPress={() => setValue(value)}
			>
				{children}
			</TouchableOpacity>
		</RadioGroupItemContext.Provider>
	);
}

export function RadioGroupIcon({ children }: { children: string }) {
	const { error } = use(RadioGroupContext);
	const { isSelected } = use(RadioGroupItemContext);

	return (
		<View style={[styles.icon, (isSelected || error) && styles.whiteIconBg]}>
			<AppText>{children}</AppText>
		</View>
	);
}

export function RadioGroupItemInfo({ children }: { children: ReactNode }) {
	return <View style={styles.itemInfo}>{children}</View>;
}

export function RadioGroupLabel({ children }: { children: string }) {
	const { isHorizontal } = use(RadioGroupContext);

	return (
		<AppText
			weight="semiBold"
			style={[styles.label, isHorizontal && styles.textCenter]}
		>
			{children}
		</AppText>
	);
}

export function RadioGroupDescription({ children }: { children: string }) {
	const { isHorizontal } = use(RadioGroupContext);

	return (
		<AppText
			size="sm"
			color={theme.colors.gray[700]}
			style={isHorizontal && styles.textCenter}
		>
			{children}
		</AppText>
	);
}
