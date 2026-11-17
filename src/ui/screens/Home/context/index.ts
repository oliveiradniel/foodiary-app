import { createContext } from 'react';

import type { SimplifiedMeal } from '@app/types/Meal';

export type HomeContextValue = {
	date: Date;
	meals: SimplifiedMeal[];
	isLoading: boolean;
	previousDay: () => void;
	nextDay: () => void;
};

export const HomeContext = createContext<HomeContextValue | null>(null);
