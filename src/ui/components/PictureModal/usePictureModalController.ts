import { useNavigation } from '@react-navigation/native';
import { useCreateMealMutation } from '@services/MealsService/hooks/useCreateMealMutation';
import { useMealQuery } from '@services/MealsService/hooks/useMealQuery';
import { useQueryClient } from '@tanstack/react-query';
import { useCameraPermissions } from 'expo-camera';
import { useEffect, useEffectEvent, useRef, useState } from 'react';

import { Alert } from 'react-native';

import type { AppStackNavigationProps } from '@app/navigation/AppStack';
import { MealStatus } from '@app/types/Meal';
import type { CameraView } from 'expo-camera';

type UsePictureModalControllerParams = {
	onClose: () => void;
	onCreate?: () => void;
};

export function usePictureModalController({
	onClose,
	onCreate,
}: UsePictureModalControllerParams) {
	const { navigate } = useNavigation<AppStackNavigationProps>();

	const [permission, requestPermission] = useCameraPermissions();
	const [photoUri, setPhotoUri] = useState<string | null>(null);

	const cameraRef = useRef<CameraView>(null);

	const { createMeal, createdMealId, isCreatingMeal } = useCreateMealMutation();
	const { meal, isLoadingMeal, isProcessingMeal } = useMealQuery(createdMealId);

	const queryClient = useQueryClient();

	function handleClose() {
		setPhotoUri(null);
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

	async function handleTakePicture() {
		if (!cameraRef.current) {
			return;
		}

		const picture = await cameraRef.current.takePictureAsync({
			imageType: 'jpg',
			quality: 0.5,
		});

		setPhotoUri(picture.uri);
	}

	function handleTryAgain() {
		setPhotoUri(null);
	}

	async function handleConfirm() {
		if (!photoUri) {
			return;
		}

		try {
			await createMeal(photoUri);
		} catch (error) {
			console.error(error);

			Alert.alert('Oops!', 'Ocorreu um erro ao criar a sua refeição.');
		}
	}

	return {
		cameraRef,
		photoUri,
		permission,
		isLoading: isCreatingMeal || isLoadingMeal || isProcessingMeal,
		requestPermission,
		handleTakePicture,
		handleTryAgain,
		handleClose,
		handleConfirm,
	};
}
