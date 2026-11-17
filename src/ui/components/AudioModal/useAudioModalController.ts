import { useNavigation } from '@react-navigation/native';
import { useCreateMealMutation } from '@services/MealsService/hooks/useCreateMealMutation';
import { useMealQuery } from '@services/MealsService/hooks/useMealQuery';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useEffectEvent, useState } from 'react';

import { Alert } from 'react-native';

import {
	AudioModule,
	RecordingPresets,
	setAudioModeAsync,
	useAudioRecorder,
} from 'expo-audio';

import type { AppStackNavigationProps } from '@app/navigation/AppStack';
import { AudioState } from '@app/types/AudioState';
import { MealStatus } from '@app/types/Meal';

type UseAudioModalControllerParams = {
	onClose: () => void;
	onCreate?: () => void;
};

export function useAudioModalController({
	onClose,
	onCreate,
}: UseAudioModalControllerParams) {
	const { navigate } = useNavigation<AppStackNavigationProps>();

	const [state, setState] = useState<AudioState>(AudioState.IDLE);
	const [audioUri, setAudioUri] = useState<string | null>(null);

	const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

	const { createMeal, createdMealId, isCreatingMeal } = useCreateMealMutation();
	const { meal, isLoadingMeal, isProcessingMeal } = useMealQuery(createdMealId);

	const queryClient = useQueryClient();

	async function handleClose() {
		if (state === AudioState.RECORDING) {
			await audioRecorder.stop();
		}

		setAudioUri(null);
		setState(AudioState.IDLE);
		onClose();
	}

	const onMealStatusChange = useEffectEvent(() => {
		if (!meal) {
			return;
		}

		if (meal.status === MealStatus.FAILED) {
			Alert.alert(
				'Oops!',
				'Ocorreu um erro ao criar a sua refeição! Tente novamente!',
			);
		}

		if (meal.status === MealStatus.SUCCESS) {
			handleClose();
			onCreate?.();
			queryClient.invalidateQueries({ queryKey: ['meals'], exact: false });
			navigate('mealDetails', { mealId: meal.id });
		}
	});

	useEffect(() => {
		onMealStatusChange();
	}, [meal?.status]);

	async function handleStartRecording() {
		const { granted } = await AudioModule.requestRecordingPermissionsAsync();

		if (!granted) {
			Alert.alert('Permissão para acessar o microfone negada.');
			return;
		}

		await setAudioModeAsync({
			playsInSilentMode: true,
			allowsRecording: true,
		});

		await audioRecorder.prepareToRecordAsync();
		audioRecorder.record();

		setState(AudioState.RECORDING);
	}

	async function handleStopRecording() {
		await audioRecorder.stop();

		setAudioUri(audioRecorder.uri);
		setState(AudioState.RECORDED);
	}

	function handleTryAgain() {
		setAudioUri(null);
		setState(AudioState.IDLE);
	}

	async function handleConfirm() {
		if (!audioUri) {
			return;
		}

		try {
			await createMeal(audioUri);
		} catch (error) {
			console.error(error);

			Alert.alert('Oops!', 'Ocorreu um erro ao criar a sua refeição.');
		}
	}

	return {
		state,
		audioUri,
		isLoading: isCreatingMeal || isLoadingMeal || isProcessingMeal,
		handleStartRecording,
		handleStopRecording,
		handleTryAgain,
		handleClose,
		handleConfirm,
	};
}
