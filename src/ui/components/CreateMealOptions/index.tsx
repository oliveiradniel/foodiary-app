import { useState } from 'react';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { CameraIcon, LucideIcon, MicIcon } from 'lucide-react-native';

import { Platform, Pressable, View } from 'react-native';
import { AppText } from '../AppText';
import { AudioModal } from '../AudioModal';
import { PictureModal } from '../PictureModal';

import { MealInputType } from '@app/types/Meal';

type CreateMealOptionsProps = {
	disabled?: boolean;
	onCreate?: () => void;
};

const options = [
	{
		id: MealInputType.AUDIO,
		icon: MicIcon,
		label: 'Áudio',
	},
	{
		id: MealInputType.PICTURE,
		icon: CameraIcon,
		label: 'Foto',
	},
];

export function CreateMealOptions({
	disabled = false,
	onCreate,
}: CreateMealOptionsProps) {
	const [currentVisibleModal, setCurrentVisibleModal] =
		useState<MealInputType | null>(null);

	function handleOpenModal(modal: MealInputType) {
		setCurrentVisibleModal(modal);
	}

	function handleCloseModal() {
		setCurrentVisibleModal(null);
	}

	return (
		<View style={styles.container}>
			<AudioModal
				visible={currentVisibleModal === MealInputType.AUDIO}
				onClose={handleCloseModal}
				onCreate={onCreate}
			/>

			<PictureModal
				visible={currentVisibleModal === MealInputType.PICTURE}
				onClose={handleCloseModal}
				onCreate={onCreate}
			/>

			{options.map(({ id, icon, label }) => (
				<OptionButton
					key={id}
					icon={icon}
					label={label}
					disabled={disabled}
					onPress={() => handleOpenModal(id)}
				/>
			))}
		</View>
	);
}

type OptionButtonProps = {
	icon: LucideIcon;
	label: string;
	disabled?: boolean;
	onPress: () => void;
};

export function OptionButton({
	icon: Icon,
	label,
	disabled,
	onPress,
}: OptionButtonProps) {
	return (
		<View style={styles.buttonWrapper}>
			<Pressable
				style={({ pressed }) => [
					styles.button,
					(disabled || (pressed && Platform.OS === 'ios')) && { opacity: 0.5 },
				]}
				android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', foreground: true }}
				disabled={disabled}
				onPress={onPress}
			>
				<View style={styles.icon}>
					<Icon color={theme.colors.black[700]} size={24} />
				</View>

				<AppText weight="semiBold" style={styles.buttonLabel}>
					{label}
				</AppText>
			</Pressable>
		</View>
	);
}
