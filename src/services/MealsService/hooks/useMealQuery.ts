import { useQuery } from '@tanstack/react-query';

import { MealsService } from '..';

import { MealStatus } from '@app/types/Meal';

const processingStatuses = [
	MealStatus.UPLOADING,
	MealStatus.QUEUED,
	MealStatus.PROCESSING,
];

export function useMealQuery(mealId?: string) {
	const { data: meal, isFetching } = useQuery({
		enabled: !!mealId,
		queryKey: ['meal', mealId],
		queryFn: async () => {
			if (!mealId) return;

			const { meal } = await MealsService.getMealById(mealId);

			return meal;
		},
		staleTime: Infinity,
		refetchInterval: (query) => {
			const mealStatus = query.state.data?.status;
			if (mealStatus && processingStatuses.includes(mealStatus)) {
				return 3_000;
			}

			return false;
		},
	});

	const isProcessingMeal = !!(meal && processingStatuses.includes(meal.status));

	return {
		meal,
		isLoadingMeal: isFetching,
		isProcessingMeal,
	};
}
