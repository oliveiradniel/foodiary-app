import { useMutation } from '@tanstack/react-query';

import { getFileInfo } from '@app/lib/getFileInfo';

import { MealsService } from '..';

export function useCreateMealMutation() {
	const { mutateAsync, isPending, data } = useMutation({
		mutationFn: async (fileUri: string) => {
			const { size, type, filename } = getFileInfo(fileUri);

			const { mealId } = await MealsService.create({
				timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
				file: {
					size,
					type,
					name: filename,
					uri: fileUri,
				},
			});

			return { mealId };
		},
	});

	return {
		createMeal: mutateAsync,
		createdMealId: data?.mealId,
		isCreatingMeal: isPending,
	};
}
