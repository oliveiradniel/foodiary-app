import { KeyboardAvoidingView, Platform } from 'react-native';

import { theme } from '@ui/styles/theme';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { onboardingSchema } from './schema';

import { OnboardingStack } from './OnboardingStack';
import { OnboardingHeader } from './components/OnboardingHeader';
import { OnboardingProvider } from './context/OnboardingProvider';

export function Onboarding() {
	const form = useForm({
		resolver: zodResolver(onboardingSchema),
		defaultValues: {
			birthDate: new Date(),
			height: '',
			weight: '',
			account: {
				name: '',
				email: '',
				password: '',
				confirmPassword: '',
			},
		},
	});

	return (
		<FormProvider {...form}>
			<OnboardingProvider>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : undefined}
					style={{ flex: 1, backgroundColor: theme.colors.white }}
				>
					<OnboardingHeader />
					<OnboardingStack />
				</KeyboardAvoidingView>
			</OnboardingProvider>
		</FormProvider>
	);
}
