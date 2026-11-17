import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GoalsService } from '..';

export function useUpdateGoalMutation() {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: (payload: GoalsService.UpdatePayload) =>
			GoalsService.update(payload),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['account'] }),
	});

	return {
		updateGoal: mutateAsync,
		isUpdatingGoal: isPending,
	};
}
