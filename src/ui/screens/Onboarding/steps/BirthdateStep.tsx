import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useOnboarding } from '../context/useOnboarding';

import { Platform, TouchableOpacity } from 'react-native';

import { theme } from '@ui/styles/theme';

import { ArrowRightIcon } from 'lucide-react-native';

import DateTimePicker, {
	type DateTimePickerChangeEvent,
} from '@react-native-community/datetimepicker';
import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import {
	Step,
	StepContent,
	StepFooter,
	StepHeader,
	StepSubtitle,
	StepTitle,
} from '../components/Step';

import type { OnboardingSchema } from '../schema';

const isAndroid = Platform.OS === 'android';

export function BirthdateStep() {
	const { nextStep } = useOnboarding();

	const form = useFormContext<OnboardingSchema>();

	const [isDatePickerVisible, setIsDatePickerVisible] = useState(true);

	function handleSelectDate(_event: DateTimePickerChangeEvent, newDate: Date) {
		form.setValue('birthDate', newDate);

		if (isAndroid) {
			setIsDatePickerVisible(false);
		}
	}

	async function handleNextStep() {
		const isValid = await form.trigger('birthDate');

		if (isValid) {
			nextStep();
		}
	}

	return (
		<Step>
			<StepHeader>
				<StepTitle>Que dia você nasceu?</StepTitle>
				<StepSubtitle>Cada faixa etária responde de forma única</StepSubtitle>
			</StepHeader>

			<StepContent position="center">
				<Controller
					control={form.control}
					name="birthDate"
					render={({ field }) => (
						<>
							{isDatePickerVisible && (
								<DateTimePicker
									mode="date"
									display={!isAndroid ? 'spinner' : 'calendar'}
									value={field.value}
									maximumDate={new Date()}
									onValueChange={handleSelectDate}
									onDismiss={() => setIsDatePickerVisible(false)}
								/>
							)}

							{isAndroid && (
								<TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
									<AppText
										weight="semiBold"
										size="3xl"
										color={theme.colors.gray[700]}
									>
										{formatDate(field.value)}
									</AppText>
								</TouchableOpacity>
							)}
						</>
					)}
				/>
			</StepContent>

			<StepFooter>
				<Button size="icon" onPress={handleNextStep}>
					<ArrowRightIcon />
				</Button>
			</StepFooter>
		</Step>
	);
}

function formatDate(date: Date) {
	return new Intl.DateTimeFormat('pt-BR', {
		day: 'numeric',
		month: '2-digit',
		year: 'numeric',
	}).format(date);
}
