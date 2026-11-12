import { createContext } from 'react';

import type { Meal } from '@app/types/Meal';

export type HomeContextValue = {
	date: Date;
	meals: Meal[];
	isLoading: boolean;
	previousDay: () => void;
	nextDay: () => void;
};

export const HomeContext = createContext<HomeContextValue | null>(null);
