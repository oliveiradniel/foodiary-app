import { useOnboarding } from '../context/useOnboarding';

import { ArrowRightIcon } from 'lucide-react-native';

import { Gender } from '@app/types/Gender';
import { Button } from '@ui/components/Button';
import {
	RadioGroup,
	RadioGroupIcon,
	RadioGroupItem,
	RadioGroupLabel,
} from '@ui/components/RadioGroup';
import { Controller, useFormContext } from 'react-hook-form';
import {
	Step,
	StepContent,
	StepFooter,
	StepHeader,
	StepSubtitle,
	StepTitle,
} from '../components/Step';

import type { OnboardingSchema } from '../schema';

const radioGroupItems = [
	{
		value: Gender.MALE,
		icon: '👨',
		label: 'Homem',
	},
	{
		value: Gender.FEMALE,
		icon: '👩',
		label: 'Mulher',
	},
];

export function GenderStep() {
	const { nextStep } = useOnboarding();

	const form = useFormContext<OnboardingSchema>();

	async function handleNextStep() {
		const isValid = await form.trigger('gender');

		if (isValid) {
			nextStep();
		}
	}

	return (
		<Step>
			<StepHeader>
				<StepTitle>Qual é seu gênero?</StepTitle>
				<StepSubtitle>Seu gênero influencia no tipo da dieta</StepSubtitle>
			</StepHeader>

			<StepContent>
				<Controller
					control={form.control}
					name="gender"
					render={({ field, fieldState }) => (
						<RadioGroup
							orientation="horizontal"
							value={field.value}
							onChangeValue={(value) => {
								field.onChange(value);

								form.trigger('gender');
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
