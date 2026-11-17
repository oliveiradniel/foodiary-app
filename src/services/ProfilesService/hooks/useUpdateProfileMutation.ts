import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProfilesService } from '..';

export function useUpdateProfileMutation() {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: (payload: ProfilesService.UpdatePayload) =>
			ProfilesService.update(payload),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['account'] }),
	});

	return {
		updateProfile: mutateAsync,
		isUpdatingProfile: isPending,
	};
}
