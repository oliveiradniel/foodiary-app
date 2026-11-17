import { useEditGoalsController } from './useEditGoalsController';

import { styles } from './styles';

import { AppHeader } from '@ui/components/AppHeader';
import { Button } from '@ui/components/Button';
import { FormGroup } from '@ui/components/FormGroup';
import { UnitInput } from '@ui/components/UnitInput';
import { Controller } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

export function EditGoals() {
	const {
		bottom,
		carbohydratesInputRef,
		proteinsInputRef,
		fatsInputRef,
		form,
		handleSubmit,
		goBack,
	} = useEditGoalsController();

	const isSubmitting = form.formState.isSubmitting;

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			style={styles.container}
		>
			<AppHeader title="Suas Metas" />

			<ScrollView
				contentContainerStyle={styles.content}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				<Controller
					control={form.control}
					name="calories"
					render={({ field, fieldState }) => (
						<FormGroup label="Calorias" error={fieldState.error?.message}>
							<UnitInput
								unit="kcal"
								keyboardType="numeric"
								returnKeyType="next"
								onSubmitEditing={() => carbohydratesInputRef.current?.focus()}
								value={field.value}
								onChangeText={field.onChange}
								disabled={isSubmitting}
							/>
						</FormGroup>
					)}
				/>

				<Controller
					control={form.control}
					name="carbohydrates"
					render={({ field, fieldState }) => (
						<FormGroup label="Carboidratos" error={fieldState.error?.message}>
							<UnitInput
								ref={carbohydratesInputRef}
								unit="g"
								keyboardType="numeric"
								returnKeyType="next"
								onSubmitEditing={() => proteinsInputRef.current?.focus()}
								value={field.value}
								onChangeText={field.onChange}
								disabled={isSubmitting}
							/>
						</FormGroup>
					)}
				/>

				<Controller
					control={form.control}
					name="proteins"
					render={({ field, fieldState }) => (
						<FormGroup label="Proteínas" error={fieldState.error?.message}>
							<UnitInput
								ref={proteinsInputRef}
								unit="g"
								keyboardType="numeric"
								returnKeyType="next"
								onSubmitEditing={() => fatsInputRef.current?.focus()}
								value={field.value}
								onChangeText={field.onChange}
								disabled={isSubmitting}
							/>
						</FormGroup>
					)}
				/>

				<Controller
					control={form.control}
					name="fats"
					render={({ field, fieldState }) => (
						<FormGroup label="Gorduras" error={fieldState.error?.message}>
							<UnitInput
								ref={fatsInputRef}
								unit="g"
								keyboardType="numeric"
								returnKeyType="done"
								onSubmitEditing={handleSubmit}
								value={field.value}
								onChangeText={field.onChange}
								disabled={isSubmitting}
							/>
						</FormGroup>
					)}
				/>
			</ScrollView>

			<View style={[styles.footer, { paddingBottom: Math.max(bottom, 20) }]}>
				<Button
					variant="secondary"
					style={styles.footerButton}
					onPress={goBack}
					disabled={isSubmitting}
				>
					Cancelar
				</Button>

				<Button
					style={styles.footerButton}
					onPress={handleSubmit}
					isLoading={isSubmitting}
				>
					Salvar
				</Button>
			</View>
		</KeyboardAvoidingView>
	);
}
