import { useSignInBottomSheetController } from './useSignInBottomSheetController';

import { styles } from './styles';

import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetTextInput,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { AppText } from '../AppText';
import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { Input } from '../Input';

import type { Ref } from 'react';
import type { InputComponentType } from '../Input';

export type SignInBottomSheetRef = {
	open: () => void;
};

// @gorhom/bottom-sheet 5.2.14 ainda tipa o ref como `TextInput`, que não é
// mais um tipo de instância na Strict API do RN 0.88 (o certo é `TextInputInstance`)
const SheetTextInput = BottomSheetTextInput as InputComponentType;

type SignInBottomSheetProps = {
	ref: Ref<SignInBottomSheetRef>;
};

export function SignInBottomSheet({ ref }: SignInBottomSheetProps) {
	const {
		bottom,
		bottomSheetModalRef,
		passwordInputRef,
		handleSubmit,
		form,
		isLoading,
	} = useSignInBottomSheetController(ref);

	return (
		<BottomSheetModalProvider>
			<BottomSheetModal ref={bottomSheetModalRef}>
				<BottomSheetView style={[styles.container, { paddingBottom: bottom }]}>
					<AppText size="3xl" weight="semiBold" style={styles.heading}>
						Acesse a sua conta
					</AppText>

					<View style={styles.form}>
						<Controller
							control={form.control}
							name="email"
							render={({ field, fieldState }) => (
								<FormGroup label="E-mail" error={fieldState.error?.message}>
									<Input
										InputComponent={SheetTextInput}
										keyboardType="email-address"
										autoCapitalize="none"
										autoCorrect={false}
										autoComplete="email"
										returnKeyType="next"
										onSubmitEditing={() => passwordInputRef.current?.focus()}
										placeholder="E-mail"
										value={field.value}
										onChangeText={field.onChange}
										disabled={form.formState.isSubmitting}
									/>
								</FormGroup>
							)}
						/>

						<Controller
							control={form.control}
							name="password"
							render={({ field, fieldState }) => (
								<FormGroup label="Senha" error={fieldState.error?.message}>
									<Input
										ref={passwordInputRef}
										InputComponent={SheetTextInput}
										secureTextEntry
										autoCapitalize="none"
										autoCorrect={false}
										autoComplete="current-password"
										returnKeyType="done"
										onSubmitEditing={handleSubmit}
										placeholder="Senha"
										value={field.value}
										onChangeText={field.onChange}
										disabled={form.formState.isSubmitting}
									/>
								</FormGroup>
							)}
						/>

						<Button
							onPress={handleSubmit}
							isLoading={form.formState.isSubmitting}
							disabled={isLoading}
						>
							Entrar
						</Button>
					</View>
				</BottomSheetView>
			</BottomSheetModal>
		</BottomSheetModalProvider>
	);
}
