import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { MealsService } from '..';

import { formatLocalDate } from '@app/lib/formatLocalDate';

export function useMealsQuery(date: Date) {
	const formattedDate = formatLocalDate(date);

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryKey: ['meals', formattedDate],
		queryFn: () => MealsService.getMealsByDate(formattedDate),
		placeholderData: keepPreviousData,
		staleTime: Infinity,
	});

	return {
		meals: data?.meals ?? [],
		isInitialLoading: isLoading,
		isLoading: isFetching,
		loadMeals: refetch,
	};
}
