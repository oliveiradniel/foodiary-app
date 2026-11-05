import {
	type ComponentType,
	type Ref,
	type RefAttributes,
	useMemo,
	useState,
} from 'react';

import { theme } from '@ui/styles/theme';
import { inputStyles } from './styles';

import {
	BlurEvent,
	FocusEvent,
	TextInput,
	TextInputInstance,
	TextInputProps,
} from 'react-native';
import Animated from 'react-native-reanimated';

type BaseTextInputProps = Omit<TextInputProps, 'readOnly'>;

export type InputComponentType = ComponentType<
	TextInputProps & RefAttributes<TextInputInstance>
>;

export type InputProps = BaseTextInputProps & {
	error?: boolean;
	disabled?: boolean;
	InputComponent?: InputComponentType;
	ref?: Ref<TextInputInstance>;
	formatter?: (value: string) => string;
};

export function Input({
	style,
	error,
	disabled,
	onFocus,
	onBlur,
	InputComponent = TextInput,
	value,
	defaultValue,
	onChangeText,
	formatter,
	ref,
	...props
}: InputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const [internalValue, setInternalValue] = useState(defaultValue ?? '');

	function handleFocus(event: FocusEvent) {
		setIsFocused(true);
		onFocus?.(event);
	}

	function handleBlur(event: BlurEvent) {
		setIsFocused(false);
		onBlur?.(event);
	}

	function handleChangeText(text: string) {
		const formattedText = formatter?.(text) ?? text;

		setInternalValue(formattedText);
		onChangeText?.(formattedText);
	}

	const AnimatedInput = useMemo(
		() => Animated.createAnimatedComponent(InputComponent),
		[InputComponent],
	);

	const textInputStatus = error ? 'error' : isFocused ? 'focus' : 'default';

	return (
		<AnimatedInput
			ref={ref}
			style={[
				inputStyles({
					status: textInputStatus,
					disabled: disabled ? 'true' : 'false',
				}),
				{
					transitionProperty: 'borderColor',
					transitionDuration: 160,
					transitionTimingFunction: 'ease-in-out',
				},
				style,
			]}
			placeholderTextColor={theme.colors.gray[700]}
			onFocus={handleFocus}
			onBlur={handleBlur}
			readOnly={disabled}
			value={formatter ? (value ?? internalValue) : value}
			defaultValue={defaultValue}
			onChangeText={handleChangeText}
			{...props}
		/>
	);
}
