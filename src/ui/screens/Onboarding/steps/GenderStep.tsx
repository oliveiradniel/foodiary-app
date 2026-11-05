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

export enum Gender {
	MALE = 'MALE',
	FEMALE = 'FEMALE',
}

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

	return (
		<Step>
			<StepHeader>
				<StepTitle>Qual é seu gênero?</StepTitle>
				<StepSubtitle>Seu gênero influencia no tipo da dieta</StepSubtitle>
			</StepHeader>

			<StepContent>
				<RadioGroup orientation="horizontal">
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
