import { useState } from 'react';

import { Platform, TouchableOpacity } from 'react-native';

import { inputStyles } from '@ui/components/Input/styles';
import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { CalendarIcon } from 'lucide-react-native';

import DateTimePicker, {
	type DateTimePickerChangeEvent,
} from '@react-native-community/datetimepicker';
import { AppText } from '@ui/components/AppText';

type DateInputProps = {
	value: Date;
	onChange: (date: Date) => void;
	error?: boolean;
	disabled?: boolean;
};

const isAndroid = Platform.OS === 'android';

export function DateInput({
	value,
	onChange,
	error,
	disabled,
}: DateInputProps) {
	const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

	function handleSelectDate(_event: DateTimePickerChangeEvent, newDate: Date) {
		onChange(newDate);

		if (isAndroid) {
			setIsDatePickerVisible(false);
		}
	}

	return (
		<>
			<TouchableOpacity
				style={[
					inputStyles({
						status: error ? 'error' : 'default',
						disabled: disabled ? 'true' : 'false',
					}),
					styles.input,
				]}
				onPress={() => setIsDatePickerVisible((prevState) => !prevState)}
				disabled={disabled}
			>
				<AppText>{formatDate(value)}</AppText>

				<CalendarIcon size={20} color={theme.colors.black[700]} />
			</TouchableOpacity>

			{isDatePickerVisible && (
				<DateTimePicker
					mode="date"
					display={!isAndroid ? 'spinner' : 'calendar'}
					value={value}
					maximumDate={new Date()}
					onValueChange={handleSelectDate}
					onDismiss={() => setIsDatePickerVisible(false)}
				/>
			)}
		</>
	);
}

function formatDate(date: Date) {
	return new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	}).format(date);
}
