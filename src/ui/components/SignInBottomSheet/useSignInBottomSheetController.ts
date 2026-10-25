import { type Ref, useImperativeHandle, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Alert, type TextInputInstance } from 'react-native';

import type { SignInBottomSheetRef } from './SignInBottomSheet';

export function useSignInBottomSheetController(ref: Ref<SignInBottomSheetRef>) {
	const { bottom } = useSafeAreaInsets();
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const passwordInputRef = useRef<TextInputInstance>(null);

	useImperativeHandle(
		ref,
		() => ({
			open: () => bottomSheetModalRef.current?.present(),
		}),
		[],
	);

	function handleSubmit() {
		Alert.alert('Enviando o form');
	}

	return { bottom, bottomSheetModalRef, passwordInputRef, handleSubmit };
}
