import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { CameraIcon, LucideIcon, MicIcon } from 'lucide-react-native';

import { Platform, Pressable, View } from 'react-native';
import { AppText } from '../AppText';

const options = [
	{
		id: 'audio',
		icon: MicIcon,
		label: 'Áudio',
	},
	{
		id: 'photo',
		icon: CameraIcon,
		label: 'Foto',
	},
];

export function CreateMealOptions() {
	return (
		<View style={styles.container}>
			{options.map(({ id, icon, label }) => (
				<OptionButton key={id} icon={icon} label={label} />
			))}
		</View>
	);
}

type OptionButtonProps = {
	icon: LucideIcon;
	label: string;
};

export function OptionButton({ icon: Icon, label }: OptionButtonProps) {
	return (
		<View style={styles.buttonWrapper}>
			<Pressable
				style={({ pressed }) => [
					styles.button,
					pressed && Platform.OS === 'ios' && { opacity: 0.5 },
				]}
				android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
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
