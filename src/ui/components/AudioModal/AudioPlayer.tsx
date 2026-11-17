import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { formatSeconds } from '@ui/utils/formatSeconds';

import {
	CheckIcon,
	PauseIcon,
	PlayIcon,
	Trash2Icon,
} from 'lucide-react-native';

import { View } from 'react-native';
import { AppText } from '../AppText';
import { Button } from '../Button';

type AudioPlayerProps = {
	audioUri: string;
	onTryAgain: () => void;
	onConfirm: () => void;
};

export function AudioPlayer({
	audioUri,
	onTryAgain,
	onConfirm,
}: AudioPlayerProps) {
	const player = useAudioPlayer(audioUri);
	const { duration, playing, currentTime } = useAudioPlayerStatus(player);

	async function handlePlayPause() {
		if (player.playing) {
			player.pause();
			return;
		}

		if (player.currentTime >= player.duration) {
			await player.seekTo(0);
		}

		player.play();
	}

	return (
		<>
			<View style={styles.actionsGroup}>
				<Button
					size="icon"
					variant="neutral"
					rippleStyle="light"
					onPress={onTryAgain}
				>
					<Trash2Icon size={20} color={theme.colors.gray[500]} />
				</Button>

				<Button size="icon" variant="neutral" onPress={handlePlayPause}>
					{playing && (
						<PauseIcon
							size={20}
							color={theme.colors.lime[600]}
							fill={theme.colors.lime[600]}
						/>
					)}

					{!playing && (
						<PlayIcon
							size={20}
							color={theme.colors.lime[600]}
							fill={theme.colors.lime[600]}
						/>
					)}
				</Button>

				<Button size="icon" onPress={onConfirm}>
					<CheckIcon size={20} color={theme.colors.black[700]} />
				</Button>
			</View>

			<AppText
				color={theme.colors.gray[500]}
				align="center"
				style={styles.actionLabel}
			>
				{formatSeconds(currentTime)} / {formatSeconds(duration)}
			</AppText>
		</>
	);
}
