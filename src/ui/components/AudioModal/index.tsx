import { useAudioModalController } from './useAudioModalController';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { XIcon } from 'lucide-react-native';

import { Modal, StatusBar, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../AppText';
import { Button } from '../Button';
import { CreateMealLoader } from '../CreateMealLoader';
import { Actions } from './Actions';

import { AudioState } from '@app/types/AudioState';
import { MealInputType } from '@app/types/Meal';

type AudioModalProps = {
	visible: boolean;
	onClose: () => void;
	onCreate?: () => void;
};

export function AudioModal({ visible, onClose, onCreate }: AudioModalProps) {
	const {
		state,
		audioUri,
		isLoading,
		handleStartRecording,
		handleStopRecording,
		handleTryAgain,
		handleClose,
		handleConfirm,
	} = useAudioModalController({ onClose, onCreate });

	const isRecording = state === AudioState.RECORDING;

	return (
		<Modal
			visible={visible}
			onRequestClose={handleClose}
			transparent
			statusBarTranslucent
			animationType="slide"
		>
			<StatusBar animated barStyle="light-content" />
			{isLoading && <CreateMealLoader type={MealInputType.AUDIO} />}

			{!isLoading && (
				<View style={styles.container}>
					<SafeAreaProvider>
						<SafeAreaView style={styles.content}>
							<View style={styles.header}>
								<Button
									variant="neutral"
									size="icon"
									rippleStyle="light"
									onPress={handleClose}
								>
									<XIcon size={20} color={theme.colors.gray[500]} />
								</Button>
							</View>

							<View style={styles.body}>
								<View
									style={[
										styles.circle1,
										isRecording && styles.circle1Recording,
									]}
								>
									<View
										style={[
											styles.circle2,
											isRecording && styles.circle2Recording,
										]}
									>
										<View
											style={[
												styles.circle3,
												isRecording && styles.circle3Recording,
											]}
										/>
									</View>
								</View>

								<AppText
									color={theme.colors.gray[500]}
									align="center"
									style={styles.instructionsLabel}
								>
									Tente dizer algo como: 100g de Arroz, 2 Ovos e 100g de Salada
								</AppText>
							</View>

							<View style={styles.footer}>
								<View style={styles.actionsContainer}>
									<Actions
										state={state}
										audioUri={audioUri}
										onStartRecording={handleStartRecording}
										onStopRecording={handleStopRecording}
										onTryAgain={handleTryAgain}
										onConfirm={handleConfirm}
									/>
								</View>
							</View>
						</SafeAreaView>
					</SafeAreaProvider>
				</View>
			)}
		</Modal>
	);
}
