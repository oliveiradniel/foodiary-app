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

export function WeightStep() {
	const { nextStep } = useOnboarding();

	return (
		<Step>
			<StepHeader>
				<StepTitle>Qual é o seu peso?</StepTitle>
				<StepSubtitle>Você pode inserir uma estimativa</StepSubtitle>
			</StepHeader>

			<StepContent position="center">
				<FormGroup label="Peso" style={{ width: '100%' }}>
					<Input
						placeholder="80"
						keyboardType="numeric"
						formatter={formatDecimal}
						autoFocus
					/>
				</FormGroup>
			</StepContent>

			<StepFooter>
				<Button size="icon" onPress={nextStep}>
					<ArrowRightIcon />
				</Button>
			</StepFooter>
		</Step>
	);
}
