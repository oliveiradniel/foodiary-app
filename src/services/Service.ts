import axios, { InternalAxiosRequestConfig, isAxiosError } from 'axios';

import { env } from '@app/config/env';

type InternalAxiosAppRequestConfig =
	(InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

export abstract class Service {
	private static refreshTokenInterceptorId: number | undefined;

	protected static client = axios.create({
		baseURL: env.api.url,
	});

	static setAccessToken(accessToken: string) {
		this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
	}

	static removeAccessToken() {
		delete this.client.defaults.headers.common.Authorization;
	}

	static removeRefreshTokenHandler() {
		if (this.refreshTokenInterceptorId !== undefined) {
			this.client.interceptors.response.eject(this.refreshTokenInterceptorId);
			this.refreshTokenInterceptorId = undefined;
		}
	}

	static setRefreshTokenHandler(refreshHandler: () => Promise<void>) {
		this.removeRefreshTokenHandler();

		let refreshPromise: Promise<void> | null = null;

		this.refreshTokenInterceptorId = this.client.interceptors.response.use(
			(response) => response,
			async (error) => {
				const config = isAxiosError(error)
					? (error.config as InternalAxiosAppRequestConfig)
					: undefined;

				if (
					!config ||
					config._retry ||
					error.response?.status !== 401 ||
					config.url === '/auth/refresh-token'
				) {
					return Promise.reject(error);
				}

				config._retry = true;

				refreshPromise ??= refreshHandler().finally(() => {
					refreshPromise = null;
				});

				await refreshPromise;

				config.headers.delete('Authorization');

				return this.client(config);
			},
		);
	}
}
