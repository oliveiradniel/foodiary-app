import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';

import greetingsBg from '@ui/assets/greetings-bg/image.jpg';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { Logo } from '@ui/components/Logo';
import { SignInBottomSheet } from '@ui/components/SignInBottomSheet';
import { Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { AuthStackNavigationProps } from '@app/navigation/AuthStack';
import type { SignInBottomSheetRef } from '@ui/components/SignInBottomSheet/SignInBottomSheet';

export function Greetings() {
	const signInBottomSheetRef = useRef<SignInBottomSheetRef>(null);
	const navigation = useNavigation<AuthStackNavigationProps>();

	return (
		<>
			<View style={styles.container}>
				<Image
					source={greetingsBg}
					resizeMode="cover"
					style={styles.background}
				/>
				<SafeAreaView style={styles.content}>
					<Logo />

					<View style={styles.ctaContainer}>
						<AppText
							color={theme.colors.white}
							weight="semiBold"
							size="3xl"
							align="center"
							style={styles.heading}
						>
							Controle sua dieta de forma simples
						</AppText>

						<View style={styles.ctaContent}>
							<Button onPress={() => navigation.navigate('onboarding')}>
								Criar conta
							</Button>

							<View style={styles.signInContainer}>
								<AppText color={theme.colors.white}>Já tem uma conta?</AppText>

								<TouchableOpacity
									onPress={() => signInBottomSheetRef.current?.open()}
								>
									<AppText color={theme.colors.lime[500]} weight="medium">
										Acesse a sua conta
									</AppText>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</SafeAreaView>
			</View>

			<SignInBottomSheet ref={signInBottomSheetRef} />
		</>
	);
}
