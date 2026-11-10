import { Controller, useFormContext } from 'react-hook-form';
import { useOnboarding } from '../context/useOnboarding';

import { formatDecimal } from '@ui/utils/formatDecimal';

import { ArrowRightIcon } from 'lucide-react-native';

import { Button } from '@ui/components/Button';
import { FormGroup } from '@ui/components/FormGroup';
import { Input } from '@ui/components/Input';
import {
	Step,
	StepContent,
	StepFooter,
	StepHeader,
	StepSubtitle,
	StepTitle,
} from '../components/Step';

import type { OnboardingSchema } from '../schema';

export function WeightStep() {
	const { nextStep } = useOnboarding();

	const form = useFormContext<OnboardingSchema>();

	async function handleNextStep() {
		const isValid = await form.trigger('weight');

		if (isValid) {
			nextStep();
		}
	}

	return (
		<Step>
			<StepHeader>
				<StepTitle>Qual é o seu peso?</StepTitle>
				<StepSubtitle>Você pode inserir uma estimativa</StepSubtitle>
			</StepHeader>

			<StepContent position="center">
				<Controller
					control={form.control}
					name="weight"
					render={({ field, fieldState }) => (
						<FormGroup
							label="Peso"
							style={{ width: '100%' }}
							error={fieldState.error?.message}
						>
							<Input
								placeholder="80"
								value={field.value}
								onChangeText={(value) => {
									field.onChange(value);

									form.trigger('weight');
								}}
								keyboardType="numeric"
								formatter={formatDecimal}
								autoFocus
							/>
						</FormGroup>
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
