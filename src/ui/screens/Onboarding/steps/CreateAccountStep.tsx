import { useRef } from 'react';

import { Button } from '@ui/components/Button';
import { FormGroup } from '@ui/components/FormGroup';
import { Input } from '@ui/components/Input';
import {
	Alert,
	ScrollView,
	StyleSheet,
	type TextInputInstance,
	View,
} from 'react-native';
import {
	Step,
	StepContent,
	StepFooter,
	StepHeader,
	StepSubtitle,
	StepTitle,
} from '../components/Step';

export function CreateAccountStep() {
	const emailInputRef = useRef<TextInputInstance>(null);
	const passwordInputRef = useRef<TextInputInstance>(null);
	const confirmPasswordInputRef = useRef<TextInputInstance>(null);

	function handleSubmit() {
		Alert.alert('Enviando o form');
	}

	return (
		<Step>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				<StepHeader>
					<StepTitle>Crie sua conta</StepTitle>
					<StepSubtitle>Para poder visualizar seu progresso</StepSubtitle>
				</StepHeader>

				<StepContent>
					<View style={styles.form}>
						<FormGroup label="Nome">
							<Input
								autoCapitalize="words"
								autoComplete="name"
								returnKeyType="next"
								onSubmitEditing={() => emailInputRef.current?.focus()}
								placeholder="João Silva"
								autoFocus
							/>
						</FormGroup>

						<FormGroup label="E-mail">
							<Input
								ref={emailInputRef}
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
								autoComplete="email"
								returnKeyType="next"
								onSubmitEditing={() => passwordInputRef.current?.focus()}
								placeholder="joaosilva@gmail.com"
							/>
						</FormGroup>

						<FormGroup label="Senha">
							<Input
								ref={passwordInputRef}
								secureTextEntry
								autoCapitalize="none"
								autoCorrect={false}
								autoComplete="new-password"
								returnKeyType="next"
								onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
								placeholder="••••••••"
							/>
						</FormGroup>

						<FormGroup label="Confirmar Senha">
							<Input
								ref={confirmPasswordInputRef}
								secureTextEntry
								autoCapitalize="none"
								autoCorrect={false}
								autoComplete="new-password"
								returnKeyType="done"
								onSubmitEditing={handleSubmit}
								placeholder="••••••••"
							/>
						</FormGroup>
					</View>
				</StepContent>
			</ScrollView>

			<StepFooter align="stretch">
				<Button onPress={handleSubmit}>Criar conta</Button>
			</StepFooter>
		</Step>
	);
}

const styles = StyleSheet.create({
	scrollContent: {
		flexGrow: 1,
	},
	form: {
		gap: 24,
		marginTop: 24,
	},
});
