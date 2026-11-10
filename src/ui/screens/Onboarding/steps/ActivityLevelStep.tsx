import { Controller, useFormContext } from 'react-hook-form';
import { useOnboarding } from '../context/useOnboarding';

import { ArrowRightIcon } from 'lucide-react-native';

import { ActivityLevel } from '@app/types/ActivityLevel';
import { Button } from '@ui/components/Button';
import {
	RadioGroup,
	RadioGroupDescription,
	RadioGroupIcon,
	RadioGroupItem,
	RadioGroupItemInfo,
	RadioGroupLabel,
} from '@ui/components/RadioGroup';
import {
	Step,
	StepContent,
	StepFooter,
	StepHeader,
	StepTitle,
} from '../components/Step';

import type { OnboardingSchema } from '../schema';

const radioGroupItems = [
	{
		value: ActivityLevel.SEDENTARY,
		icon: '🛋️',
		label: 'Sedentário',
		description: 'Pouco ou nenhum exercício',
	},
	{
		value: ActivityLevel.LIGHT,
		icon: '🍃',
		label: 'Leve',
		description: 'Exercício leve 1-2x por semana',
	},
	{
		value: ActivityLevel.MODERATE,
		icon: '⚡',
		label: 'Moderado',
		description: 'Exercício moderado 3-5x por semana',
	},
	{
		value: ActivityLevel.HEAVY,
		icon: '🔥',
		label: 'Intenso',
		description: 'Exercício intenso 6-7x por semana',
	},
	{
		value: ActivityLevel.ATHLETE,
		icon: '🏋️‍♂️',
		label: 'Atleta',
		description: 'Treino profissional diário',
	},
];

export function ActivityLevelStep() {
	const { nextStep } = useOnboarding();

	const form = useFormContext<OnboardingSchema>();

	async function handleNextStep() {
		const isValid = await form.trigger('activityLevel');

		if (isValid) {
			nextStep();
		}
	}

	return (
		<Step>
			<StepHeader>
				<StepTitle>Qual seu nível de atividade?</StepTitle>
			</StepHeader>

			<StepContent>
				<Controller
					control={form.control}
					name="activityLevel"
					render={({ field, fieldState }) => (
						<RadioGroup
							value={field.value}
							onChangeValue={(value) => {
								field.onChange(value);

								form.trigger('activityLevel');
							}}
							error={!!fieldState.error}
						>
							{radioGroupItems.map(({ value, icon, label, description }) => (
								<RadioGroupItem key={value} value={value}>
									<RadioGroupIcon>{icon}</RadioGroupIcon>

									<RadioGroupItemInfo>
										<RadioGroupLabel>{label}</RadioGroupLabel>
										<RadioGroupDescription>{description}</RadioGroupDescription>
									</RadioGroupItemInfo>
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
