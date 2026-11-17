import { useProfileController } from './useProfileController';

import { formatDecimal } from '@ui/utils/formatDecimal';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { LogOutIcon } from 'lucide-react-native';

import { AppHeader } from '@ui/components/AppHeader';
import { Button } from '@ui/components/Button';
import { FormGroup } from '@ui/components/FormGroup';
import { Input } from '@ui/components/Input';
import {
	RadioGroup,
	RadioGroupIcon,
	RadioGroupItem,
	RadioGroupLabel,
} from '@ui/components/RadioGroup';
import { UnitInput } from '@ui/components/UnitInput';
import { Controller } from 'react-hook-form';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	View,
} from 'react-native';
import { DateInput } from './components/DateInput';

import { Gender } from '@app/types/Gender';

const radioGroupItems = [
	{
		value: Gender.MALE,
		icon: '👨',
		label: 'Masculino',
	},
	{
		value: Gender.FEMALE,
		icon: '👩',
		label: 'Feminino',
	},
];

export function Profile() {
	const { bottom, weightInputRef, form, handleSubmit, signOut } =
		useProfileController();

	const isSubmitting = form.formState.isSubmitting;

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			style={styles.container}
		>
			<AppHeader
				title="Perfil"
				rightAction={
					<Button size="icon" variant="ghost" onPress={signOut}>
						<LogOutIcon size={20} color={theme.colors.black[700]} />
					</Button>
				}
			/>

			<ScrollView
				contentContainerStyle={styles.content}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				<Image
					source={{
						uri: 'https://github.com/oliveiradniel.png',
					}}
					style={styles.avatar}
				/>

				<Controller
					control={form.control}
					name="name"
					render={({ field, fieldState }) => (
						<FormGroup label="Nome" error={fieldState.error?.message}>
							<Input
								autoCapitalize="words"
								autoComplete="name"
								value={field.value}
								onChangeText={field.onChange}
								disabled={isSubmitting}
							/>
						</FormGroup>
					)}
				/>

				<Controller
					control={form.control}
					name="birthDate"
					render={({ field, fieldState }) => (
						<FormGroup
							label="Data de Nascimento"
							error={fieldState.error?.message}
						>
							<DateInput
								value={field.value}
								onChange={field.onChange}
								disabled={isSubmitting}
							/>
						</FormGroup>
					)}
				/>

				<Controller
					control={form.control}
					name="height"
					render={({ field, fieldState }) => (
						<FormGroup label="Altura" error={fieldState.error?.message}>
							<UnitInput
								unit="cm"
								keyboardType="numeric"
								formatter={formatDecimal}
								returnKeyType="next"
								onSubmitEditing={() => weightInputRef.current?.focus()}
								value={field.value}
								onChangeText={field.onChange}
								disabled={isSubmitting}
							/>
						</FormGroup>
					)}
				/>

				<Controller
					control={form.control}
					name="weight"
					render={({ field, fieldState }) => (
						<FormGroup label="Peso" error={fieldState.error?.message}>
							<UnitInput
								ref={weightInputRef}
								unit="kg"
								keyboardType="numeric"
								formatter={formatDecimal}
								returnKeyType="done"
								onSubmitEditing={handleSubmit}
								value={field.value}
								onChangeText={field.onChange}
								disabled={isSubmitting}
							/>
						</FormGroup>
					)}
				/>

				<Controller
					control={form.control}
					name="gender"
					render={({ field, fieldState }) => (
						<FormGroup label="Sexo" error={fieldState.error?.message}>
							<RadioGroup
								orientation="horizontal"
								value={field.value}
								onChangeValue={field.onChange}
							>
								{radioGroupItems.map(({ value, icon, label }) => (
									<RadioGroupItem key={value} value={value}>
										<RadioGroupIcon>{icon}</RadioGroupIcon>

										<RadioGroupLabel>{label}</RadioGroupLabel>
									</RadioGroupItem>
								))}
							</RadioGroup>
						</FormGroup>
					)}
				/>
			</ScrollView>

			<View style={[styles.footer, { paddingBottom: Math.max(bottom, 20) }]}>
				<Button onPress={handleSubmit} isLoading={isSubmitting}>
					Salvar
				</Button>
			</View>
		</KeyboardAvoidingView>
	);
}
