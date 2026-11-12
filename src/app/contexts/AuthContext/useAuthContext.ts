import { use } from 'react';

import { AuthContext } from '.';

export function useAuthContext() {
	const value = use(AuthContext);

	if (!value) {
		throw new Error(
			'`useAuthContext` must be used only inside `<AuthProvider />`',
		);
	}

	return value;
}
