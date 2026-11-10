import { useQuery } from '@tanstack/react-query';

import { AccountsService } from '..';

type UseAccountParams = {
	enabled?: boolean;
};

export function useAccountQuery(params?: UseAccountParams) {
	const { data, refetch } = useQuery({
		enabled: params?.enabled ?? true,
		queryKey: ['account'],
		queryFn: () => AccountsService.getMe(),
		staleTime: Infinity,
	});

	return {
		account: data,
		loadAccount: refetch,
	};
}
