import { useForceRender } from '@app/hooks/app/useForceRender';
import { useAccountQuery } from '@services/AccountsService/hooks/useAccountQuery';
import { useQueryClient } from '@tanstack/react-query';
import { useLayoutEffect, useState } from 'react';

import { AuthService } from '@services/AuthService';
import { Service } from '@services/Service';
import { AuthContext } from '.';

import { AuthTokensManager } from '@app/lib/AuthTokensManager';

import * as SplashScreen from 'expo-splash-screen';

import type { ReactNode } from 'react';

type SetupAuthParams = {
	accessToken: string;
	refreshToken: string;
};

SplashScreen.preventAutoHideAsync();

export function AuthProvider({ children }: { children: ReactNode }) {
	const queryClient = useQueryClient();

	const forceRender = useForceRender();

	const { account, loadAccount } = useAccountQuery({
		enabled: false,
	});

	const [isReady, setIsReady] = useState(false);

	async function setupAuth(tokens: SetupAuthParams) {
		Service.setAccessToken(tokens.accessToken);
		Service.setRefreshTokenHandler(async () => {
			try {
				const storagedTokens = await AuthTokensManager.load();
				if (!storagedTokens) {
					throw new Error('Tokens not found.');
				}

				const newTokens = await AuthService.refresh({
					refreshToken: storagedTokens.refreshToken,
				});

				Service.setAccessToken(newTokens.accessToken);
				await AuthTokensManager.save(newTokens);
			} catch (error) {
				signOut();
				throw error;
			}
		});

		await loadAccount({ throwOnError: true });
	}

	useLayoutEffect(() => {
		async function load() {
			try {
				const tokens = await AuthTokensManager.load();

				if (tokens) {
					await setupAuth(tokens);
				}
			} catch {
				Service.removeAccessToken();
			} finally {
				setIsReady(true);
				SplashScreen.hideAsync();
			}
		}

		load();
	}, []);

	async function signIn(payload: AuthService.SignInPayload) {
		const tokens = await AuthService.signIn(payload);

		await AuthTokensManager.save(tokens);
		await setupAuth(tokens);
	}

	async function signUp(payload: AuthService.SignUpPayload) {
		const tokens = await AuthService.signUp(payload);

		await AuthTokensManager.save(tokens);
		await setupAuth(tokens);
	}

	async function signOut() {
		Service.removeAccessToken();
		Service.removeRefreshTokenHandler();

		queryClient.clear();
		forceRender();

		await AuthTokensManager.clear();
	}

	if (!isReady) {
		return null;
	}

	return (
		<AuthContext value={{ signedIn: !!account, signIn, signUp, signOut }}>
			{children}
		</AuthContext>
	);
}
