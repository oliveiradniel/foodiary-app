import { useMealsQuery } from '@services/MealsService/hooks/useMealsQuery';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useHomeController() {
	const { top, bottom } = useSafeAreaInsets();

	const [date, setDate] = useState(new Date());
	const [isRefreshing, setIsRefreshing] = useState(false);

	const { meals, isInitialLoading, isLoading, loadMeals } = useMealsQuery(date);

	async function handleRefresh() {
		setIsRefreshing(true);

		await loadMeals();

		setIsRefreshing(false);
	}

	function handleNextDay() {
		setDate((prevState) => {
			const newDate = new Date(prevState);

			newDate.setDate(prevState.getDate() + 1);

			return newDate;
		});
	}

	function handlePreviousDay() {
		setDate((prevState) => {
			const newDate = new Date(prevState);

			newDate.setDate(prevState.getDate() - 1);

			return newDate;
		});
	}

	return {
		top,
		bottom,
		meals,
		date,
		isInitialLoading,
		isLoading: isLoading && !isRefreshing,
		isRefreshing,
		handleRefresh,
		handleNextDay,
		handlePreviousDay,
	};
}
