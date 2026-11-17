import { useVideoPlayer, VideoView } from 'expo-video';

import video from './ai-animation.mp4';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { View } from 'react-native';
import { AppText } from '../AppText';
import { Logo } from '../Logo';

import { MealInputType } from '@app/types/Meal';

type CreateMealLoaderProps = {
	type: MealInputType;
};

export function CreateMealLoader({ type }: CreateMealLoaderProps) {
	const player = useVideoPlayer(video, (player) => {
		player.loop = true;
		player.play();
	});

	return (
		<View style={styles.container}>
			<VideoView player={player} nativeControls={false} style={styles.video} />

			<View style={styles.content}>
				<Logo width={75} height={24} />

				<AppText color={theme.colors.gray[300]} align="center">
					{type === MealInputType.AUDIO && 'Estou ouvindo o seu áudio...'}
					{type === MealInputType.PICTURE && 'Estou analisando a sua foto...'}
				</AppText>
			</View>
		</View>
	);
}
