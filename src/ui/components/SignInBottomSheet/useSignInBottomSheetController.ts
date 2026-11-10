import { useAuth } from '@app/contexts/AuthContext/useAuth';
import { ERROR_CODE } from '@app/types/ErrorCode';
import { isAxiosError } from 'axios';
import { useImperativeHandle, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from './schema';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Alert } from 'react-native';

import type { Ref } from 'react';
import type { TextInputInstance } from 'react-native';
import type { SignInBottomSheetRef } from './SignInBottomSheet';

export function useSignInBottomSheetController(ref: Ref<SignInBottomSheetRef>) {
	const { bottom } = useSafeAreaInsets();

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const passwordInputRef = useRef<TextInputInstance>(null);

	const [isLoading, setIsLoading] = useState(false);

	const { signIn } = useAuth();

	const form = useForm({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	useImperativeHandle(
		ref,
		() => ({
			open: () => bottomSheetModalRef.current?.present(),
		}),
		[],
	);

	const handleSubmit = () =>
		form.handleSubmit(async (data) => {
			try {
				setIsLoading(true);
				await signIn(data);
			} catch (error) {
				setIsLoading(false);

				if (
					isAxiosError(error) &&
					error.response?.data?.error?.code === ERROR_CODE.INVALID_CREDENTIALS
				) {
					Alert.alert('Oops!', 'As credenciais informadas são inválidas.');

					return;
				}

				Alert.alert('Oops!', 'Ocorreu um erro ao entrar na sua conta.');
			}
		})();

	return {
		bottom,
		bottomSheetModalRef,
		passwordInputRef,
		handleSubmit,
		form,
		isLoading,
	};
}
