import { useAuthContext } from '@app/contexts/AuthContext/useAuthContext';
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { isAxiosError } from 'axios';
import { Alert } from 'react-native';

import type { TextInputInstance } from 'react-native';
import type { OnboardingSchema } from '../../schema';

import { ERROR_CODE } from '@app/types/ErrorCode';

export function useCreateAccountStepController() {
	const emailInputRef = useRef<TextInputInstance>(null);
	const passwordInputRef = useRef<TextInputInstance>(null);
	const confirmPasswordInputRef = useRef<TextInputInstance>(null);

	const { signUp } = useAuthContext();

	const form = useFormContext<OnboardingSchema>();

	const handleSubmit = () =>
		form.handleSubmit(async (data) => {
			try {
				const birthDate = formatLocalDate(data.birthDate);

				await signUp({
					account: {
						email: data.account.email,
						password: data.account.password,
					},
					profile: {
						name: data.account.name,
						activityLevel: data.activityLevel,
						birthDate,
						gender: data.gender,
						goal: data.goal,
						height: Number(data.height),
						weight: Number(data.weight),
					},
				});
			} catch (error) {
				if (
					isAxiosError(error) &&
					error.response?.data?.error?.code === ERROR_CODE.EMAIL_ALREADY_IN_USE
				) {
					Alert.alert(
						'Oops!',
						'Este e-mail já está sendo usado por outro usuário.',
					);

					return;
				}

				Alert.alert('Oops!', 'Ocorreu um erro ao criar a sua conta.');
			}
		})();

	return {
		emailInputRef,
		passwordInputRef,
		confirmPasswordInputRef,
		form,
		handleSubmit,
	};
}

function formatLocalDate(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}
