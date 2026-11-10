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

export function HeightStep() {
	const { nextStep } = useOnboarding();

	const form = useFormContext<OnboardingSchema>();

	async function handleNextStep() {
		const isValid = await form.trigger('height');

		if (isValid) {
			nextStep();
		}
	}

	return (
		<Step>
			<StepHeader>
				<StepTitle>Qual é a sua altura?</StepTitle>
				<StepSubtitle>Você pode inserir uma estimativa</StepSubtitle>
			</StepHeader>

			<StepContent position="center">
				<Controller
					control={form.control}
					name="height"
					render={({ field, fieldState }) => (
						<FormGroup
							label="Altura"
							style={{ width: '100%' }}
							error={fieldState.error?.message}
						>
							<Input
								placeholder="175"
								value={field.value}
								onChangeText={(value) => {
									field.onChange(value);

									form.trigger('height');
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
