import { useNavigation } from '@react-navigation/native';
import { useEffect, useState, type ReactNode } from 'react';

import { orderedSteps } from '../steps';

import { OnboardingContext } from '.';
import { onboardingNavigation } from '../OnboardingStack';

import type { AuthStackNavigationProps } from '@app/navigation/AuthStack';

export function OnboardingProvider({ children }: { children: ReactNode }) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const { goBack } = useNavigation<AuthStackNavigationProps>();

	// O índice vem do estado do stack para acompanhar também o gesto de voltar
	// do iOS e o botão físico do Android, que não passam por `previousStep`
	useEffect(
		() =>
			onboardingNavigation.addListener('state', (event) => {
				setCurrentStepIndex(event.data.state?.index ?? 0);
			}),
		[],
	);

	function nextStep() {
		const nextStep = orderedSteps[currentStepIndex + 1];

		if (!nextStep) {
			return;
		}

		onboardingNavigation.current?.navigate(nextStep);
	}

	function previousStep() {
		if (!onboardingNavigation.canGoBack()) {
			goBack();
			return;
		}

		onboardingNavigation.goBack();
	}

	return (
		<OnboardingContext.Provider
			value={{ currentStepIndex, nextStep, previousStep }}
		>
			{children}
		</OnboardingContext.Provider>
	);
}
