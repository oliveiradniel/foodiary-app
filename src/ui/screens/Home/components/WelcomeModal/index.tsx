import { useAuthContext } from '@app/contexts/AuthContext/useAuthContext';
import { useAccountQuery } from '@services/AccountsService/hooks/useAccountQuery';
import { useState } from 'react';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { GoalStats } from '@ui/components/GoalStats';
import { Modal, StatusBar, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Goal } from '@app/types/Goal';

const goalsMap: Record<Goal, { icon: string; label: string }> = {
	GAIN: {
		icon: '🥩',
		label: 'Ganhar peso',
	},
	LOSE: {
		icon: '🥦',
		label: 'Perder peso',
	},
	MAINTAIN: {
		icon: '🍍',
		label: 'Manter peso',
	},
};

export function WelcomeModal() {
	const { signedUp } = useAuthContext();
	const { account } = useAccountQuery();

	const [visible, setVisible] = useState(signedUp);

	const goal = goalsMap[account!.profile.goal];

	function handleClose() {
		setVisible(false);
	}

	return (
		<Modal
			visible={visible}
			transparent
			statusBarTranslucent
			animationType="fade"
		>
			<StatusBar animated barStyle="light-content" />

			<View style={styles.container}>
				<SafeAreaProvider>
					<SafeAreaView style={styles.wrapper}>
						<View style={styles.content}>
							<View style={styles.header}>
								<View style={styles.icon}>
									<AppText>{goal.icon}</AppText>
								</View>

								<View style={styles.headerContent}>
									<AppText
										color={theme.colors.gray[100]}
										align="center"
										size="3xl"
										weight="semiBold"
										style={styles.title}
									>
										Seu plano de dieta para{' '}
										<Text style={styles.titleHighlight}>{goal.label}</Text> está
										pronto!
									</AppText>

									<AppText color={theme.colors.gray[600]} align="center">
										Essa é a recomendação diária recomendada para seu plano.
										Fique tranquilo, você poderá editar depois caso deseje.
									</AppText>
								</View>
							</View>

							<View style={styles.body}>
								<GoalStats
									calories={{ goal: account!.goal.calories }}
									proteins={{ goal: account!.goal.proteins }}
									carbohydrates={{ goal: account!.goal.carbohydrates }}
									fats={{ goal: account!.goal.fats }}
								/>
							</View>
						</View>

						<View style={styles.footer}>
							<Button onPress={handleClose}>Começar meu plano</Button>
						</View>
					</SafeAreaView>
				</SafeAreaProvider>
			</View>
		</Modal>
	);
}
