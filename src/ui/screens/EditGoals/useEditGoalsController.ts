import { useNavigation } from '@react-navigation/native';
import { useAccountQuery } from '@services/AccountsService/hooks/useAccountQuery';
import { useUpdateGoalMutation } from '@services/GoalsService/hooks/useUpdateGoalMutation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { zodResolver } from '@hookform/resolvers/zod';
import { editGoalsSchema } from './schema';

import { Alert } from 'react-native';

import type { AppStackNavigationProps } from '@app/navigation/AppStack';
import type { TextInputInstance } from 'react-native';

export function useEditGoalsController() {
	const { bottom } = useSafeAreaInsets();
	const { goBack } = useNavigation<AppStackNavigationProps>();

	const carbohydratesInputRef = useRef<TextInputInstance>(null);
	const proteinsInputRef = useRef<TextInputInstance>(null);
	const fatsInputRef = useRef<TextInputInstance>(null);

	const { account } = useAccountQuery();
	const { updateGoal } = useUpdateGoalMutation();

	const form = useForm({
		resolver: zodResolver(editGoalsSchema),
		defaultValues: {
			calories: String(account!.goal.calories),
			carbohydrates: String(account!.goal.carbohydrates),
			proteins: String(account!.goal.proteins),
			fats: String(account!.goal.fats),
		},
	});

	const handleSubmit = () =>
		form.handleSubmit(async (data) => {
			try {
				await updateGoal({
					calories: Number(data.calories),
					proteins: Number(data.proteins),
					carbohydrates: Number(data.carbohydrates),
					fats: Number(data.fats),
				});

				goBack();
			} catch {
				Alert.alert('Oops!', 'Ocorreu um erro ao salvar as suas metas.');
			}
		})();

	return {
		bottom,
		carbohydratesInputRef,
		proteinsInputRef,
		fatsInputRef,
		form,
		handleSubmit,
		goBack,
	};
}
