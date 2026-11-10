import { Controller, useFormContext } from 'react-hook-form';
import { useOnboarding } from '../context/useOnboarding';

import { ArrowRightIcon } from 'lucide-react-native';

import { Button } from '@ui/components/Button';
import {
	RadioGroup,
	RadioGroupIcon,
	RadioGroupItem,
	RadioGroupLabel,
} from '@ui/components/RadioGroup';
import {
	Step,
	StepContent,
	StepFooter,
	StepHeader,
	StepSubtitle,
	StepTitle,
} from '../components/Step';

import { Goal } from '@app/types/Goal';

import type { OnboardingSchema } from '../schema';

const radioGroupItems = [
	{
		value: Goal.LOSE,
		icon: '🥦',
		label: 'Perder peso',
	},
	{
		value: Goal.MAINTAIN,
		icon: '🍍',
		label: 'Manter peso',
	},
	{
		value: Goal.GAIN,
		icon: '🥩',
		label: 'Ganhar peso',
	},
];

export function GoalStep() {
	const { nextStep } = useOnboarding();

	const form = useFormContext<OnboardingSchema>();

	async function handleNextStep() {
		const isValid = await form.trigger('goal');

		if (isValid) {
			nextStep();
		}
	}

	return (
		<Step>
			<StepHeader>
				<StepTitle>Qual é seu objetivo?</StepTitle>
				<StepSubtitle>O que você quer alcançar com a dieta?</StepSubtitle>
			</StepHeader>

			<StepContent>
				<Controller
					control={form.control}
					name="goal"
					render={({ field, fieldState }) => (
						<RadioGroup
							value={field.value}
							onChangeValue={(value) => {
								field.onChange(value);

								form.trigger('goal');
							}}
							error={!!fieldState.error}
						>
							{radioGroupItems.map(({ value, icon, label }) => (
								<RadioGroupItem key={value} value={value}>
									<RadioGroupIcon>{icon}</RadioGroupIcon>

									<RadioGroupLabel>{label}</RadioGroupLabel>
								</RadioGroupItem>
							))}
						</RadioGroup>
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
