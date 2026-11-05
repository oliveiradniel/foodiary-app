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

export enum Goal {
	LOSE = 'LOSE',
	MAINTAIN = 'MAINTAIN',
	GAIN = 'GAIN',
}

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

	return (
		<Step>
			<StepHeader>
				<StepTitle>Qual é seu objetivo?</StepTitle>
				<StepSubtitle>O que você quer alcançar com a dieta?</StepSubtitle>
			</StepHeader>

			<StepContent>
				<RadioGroup>
					{radioGroupItems.map(({ value, icon, label }) => (
						<RadioGroupItem key={value} value={value}>
							<RadioGroupIcon>{icon}</RadioGroupIcon>

							<RadioGroupLabel>{label}</RadioGroupLabel>
						</RadioGroupItem>
					))}
				</RadioGroup>
			</StepContent>

			<StepFooter>
				<Button size="icon" onPress={nextStep}>
					<ArrowRightIcon />
				</Button>
			</StepFooter>
		</Step>
	);
}
