import { use } from 'react';

import { AuthContext } from '.';

export function useAuth() {
	const value = use(AuthContext);

	if (!value) {
		throw new Error('`useAuth` must be used only inside `<AuthProvider />`');
	}

	return value;
}
