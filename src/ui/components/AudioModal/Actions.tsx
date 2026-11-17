import { useEffect, useEffectEvent, useState } from 'react';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { formatSeconds } from '@ui/utils/formatSeconds';

import { MicIcon, SquareIcon } from 'lucide-react-native';

import { AppText } from '../AppText';
import { Button } from '../Button';
import { AudioPlayer } from './AudioPlayer';

import { AudioState } from '@app/types/AudioState';

type ActionsProps = {
	state: AudioState;
	audioUri: string | null;
	onStartRecording: () => void;
	onStopRecording: () => void;
	onTryAgain: () => void;
	onConfirm: () => void;
};

export function Actions({
	state,
	audioUri,
	onStartRecording,
	onStopRecording,
	onTryAgain,
	onConfirm,
}: ActionsProps) {
	const [recordingTimeInSeconds, setRecordingTimeInSeconds] = useState(0);

	useEffect(() => {
		let intervalId: number | undefined;

		if (state !== AudioState.RECORDING) {
			return;
		}

		intervalId = setInterval(() => {
			setRecordingTimeInSeconds((prevState) => prevState + 1);
		}, 1000);

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [state]);

	const stopRecording = useEffectEvent(onStopRecording);

	useEffect(() => {
		const MAX_AUDIO_DURATION = 30;

		if (recordingTimeInSeconds >= MAX_AUDIO_DURATION) {
			stopRecording();
		}
	}, [recordingTimeInSeconds]);

	function handleTryAgain() {
		setRecordingTimeInSeconds(0);

		onTryAgain();
	}

	if (state === AudioState.IDLE) {
		return (
			<>
				<Button
					size="icon"
					variant="neutral"
					rippleStyle="light"
					onPress={onStartRecording}
				>
					<MicIcon size={20} color={theme.colors.lime[600]} />
				</Button>

				<AppText
					color={theme.colors.gray[500]}
					align="center"
					style={styles.actionLabel}
				>
					Clique no microfone para começar a gravar
				</AppText>
			</>
		);
	}
	if (state === AudioState.RECORDING) {
		return (
			<>
				<Button
					size="icon"
					variant="neutral"
					rippleStyle="light"
					onPress={onStopRecording}
				>
					<SquareIcon
						size={20}
						color={theme.colors.lime[600]}
						fill={theme.colors.lime[600]}
					/>
				</Button>

				<AppText
					color={theme.colors.gray[500]}
					align="center"
					style={styles.actionLabel}
				>
					{formatSeconds(recordingTimeInSeconds)}
				</AppText>
			</>
		);
	}

	if (state === AudioState.RECORDED && audioUri) {
		return (
			<AudioPlayer
				audioUri={audioUri}
				onTryAgain={handleTryAgain}
				onConfirm={onConfirm}
			/>
		);
	}
}
