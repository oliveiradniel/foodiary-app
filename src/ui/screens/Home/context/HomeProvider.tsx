import { HomeContext } from '.';

import type { ReactNode } from 'react';
import type { HomeContextValue } from '.';

type HomeProviderProps = HomeContextValue & { children: ReactNode };

export function HomeProvider({ children, ...ctxValue }: HomeProviderProps) {
	return (
		<HomeContext.Provider value={ctxValue}>{children}</HomeContext.Provider>
	);
}
