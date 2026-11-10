import { useCreateAccountStepController } from './useCreateAccountStepController';

import { Button } from '@ui/components/Button';
import { FormGroup } from '@ui/components/FormGroup';
import { Input } from '@ui/components/Input';
import { Controller } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
	Step,
	StepContent,
	StepFooter,
	StepHeader,
	StepSubtitle,
	StepTitle,
} from '../../components/Step';

export function CreateAccountStep() {
	const {
		emailInputRef,
		passwordInputRef,
		confirmPasswordInputRef,
		form,
		handleSubmit,
	} = useCreateAccountStepController();

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
						<Controller
							control={form.control}
							name="account.name"
							render={({ field, fieldState }) => (
								<FormGroup label="Nome" error={fieldState.error?.message}>
									<Input
										autoCapitalize="words"
										autoComplete="name"
										returnKeyType="next"
										onSubmitEditing={() => emailInputRef.current?.focus()}
										placeholder="João Silva"
										value={field.value}
										onChangeText={field.onChange}
										autoFocus
										disabled={form.formState.isSubmitting}
									/>
								</FormGroup>
							)}
						/>

						<Controller
							control={form.control}
							name="account.email"
							render={({ field, fieldState }) => (
								<FormGroup label="E-mail" error={fieldState.error?.message}>
									<Input
										ref={emailInputRef}
										keyboardType="email-address"
										autoCapitalize="none"
										autoCorrect={false}
										autoComplete="email"
										returnKeyType="next"
										onSubmitEditing={() => passwordInputRef.current?.focus()}
										placeholder="joaosilva@gmail.com"
										value={field.value}
										onChangeText={field.onChange}
										disabled={form.formState.isSubmitting}
									/>
								</FormGroup>
							)}
						/>

						<Controller
							control={form.control}
							name="account.password"
							render={({ field, fieldState }) => (
								<FormGroup label="Senha" error={fieldState.error?.message}>
									<Input
										ref={passwordInputRef}
										secureTextEntry
										autoCapitalize="none"
										autoCorrect={false}
										autoComplete="new-password"
										returnKeyType="next"
										onSubmitEditing={() =>
											confirmPasswordInputRef.current?.focus()
										}
										placeholder="••••••••"
										value={field.value}
										onChangeText={field.onChange}
										disabled={form.formState.isSubmitting}
									/>
								</FormGroup>
							)}
						/>

						<Controller
							control={form.control}
							name="account.confirmPassword"
							render={({ field, fieldState }) => (
								<FormGroup
									label="Confirmar Senha"
									error={fieldState.error?.message}
								>
									<Input
										ref={confirmPasswordInputRef}
										secureTextEntry
										autoCapitalize="none"
										autoCorrect={false}
										autoComplete="new-password"
										returnKeyType="done"
										onSubmitEditing={handleSubmit}
										placeholder="••••••••"
										value={field.value}
										onChangeText={field.onChange}
										disabled={form.formState.isSubmitting}
									/>
								</FormGroup>
							)}
						/>
					</View>
				</StepContent>
			</ScrollView>

			<StepFooter align="stretch">
				<Button onPress={handleSubmit} isLoading={form.formState.isSubmitting}>
					Criar conta
				</Button>
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
