import { useOnboarding } from '../context/useOnboarding';

import { ArrowRightIcon } from 'lucide-react-native';

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

export enum ActivityLevel {
	SEDENTARY = 'SEDENTARY',
	LIGHT = 'LIGHT',
	MODERATE = 'MODERATE',
	HEAVY = 'HEAVY',
	ATHLETE = 'ATHLETE',
}

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

	return (
		<Step>
			<StepHeader>
				<StepTitle>Qual seu nível de atividade?</StepTitle>
			</StepHeader>

			<StepContent>
				<RadioGroup>
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
			</StepContent>

			<StepFooter>
				<Button size="icon" onPress={nextStep}>
					<ArrowRightIcon />
				</Button>
			</StepFooter>
		</Step>
	);
}
