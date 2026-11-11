import { createContext } from 'react';

import type { AuthService } from '@services/AuthService';

type AuthContextValue = {
	signedIn: boolean;
	signedUp: boolean;
	signIn: (payload: AuthService.SignInPayload) => Promise<void>;
	signUp: (payload: AuthService.SignUpPayload) => Promise<void>;
	signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
