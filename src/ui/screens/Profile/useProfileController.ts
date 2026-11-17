import { useAuthContext } from '@app/contexts/AuthContext/useAuthContext';
import { useNavigation } from '@react-navigation/native';
import { useAccountQuery } from '@services/AccountsService/hooks/useAccountQuery';
import { useUpdateProfileMutation } from '@services/ProfilesService/hooks/useUpdateProfileMutation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { formatLocalDate } from '@app/lib/formatLocalDate';

import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from './schema';

import { Alert } from 'react-native';

import type { AppStackNavigationProps } from '@app/navigation/AppStack';
import type { TextInputInstance } from 'react-native';

export function useProfileController() {
	const { bottom } = useSafeAreaInsets();
	const { goBack } = useNavigation<AppStackNavigationProps>();

	const weightInputRef = useRef<TextInputInstance>(null);

	const { signOut } = useAuthContext();
	const { account } = useAccountQuery();
	const { updateProfile } = useUpdateProfileMutation();

	const form = useForm({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: account!.profile.name,
			birthDate: account!.profile.birthDate,
			height: String(account!.profile.height),
			weight: String(account!.profile.weight),
			gender: account!.profile.gender,
		},
	});

	const handleSubmit = () =>
		form.handleSubmit(async (data) => {
			try {
				await updateProfile({
					name: data.name,
					birthDate: formatLocalDate(data.birthDate),
					gender: data.gender,
					height: Number(data.height),
					weight: Number(data.weight),
				});

				goBack();
			} catch {
				Alert.alert('Oops!', 'Ocorreu um erro ao salvar o seu perfil.');
			}
		})();

	return {
		bottom,
		weightInputRef,
		form,
		handleSubmit,
		signOut,
	};
}
