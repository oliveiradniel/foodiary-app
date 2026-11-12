import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { MealsService } from '..';

export function useMealsQuery(date: Date) {
	const formattedDate = formatDate(date);

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

function formatDate(date: Date) {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();

	return `${year}-${month}-${day}`;
}
