import { useSignInBottomSheetController } from './useSignInBottomSheetController';

import { styles } from './styles';

import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetTextInput,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import { AppText } from '../AppText';
import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { Input, type InputComponentType } from '../Input';

import type { Ref } from 'react';
import type { SignInBottomSheetRef } from './SignInBottomSheet';

// @gorhom/bottom-sheet 5.2.14 ainda tipa o ref como `TextInput`, que não é
// mais um tipo de instância na Strict API do RN 0.88 (o certo é `TextInputInstance`)
const SheetTextInput = BottomSheetTextInput as InputComponentType;

type SignInBottomSheetProps = {
	ref: Ref<SignInBottomSheetRef>;
};

export function SignInBottomSheet({ ref }: SignInBottomSheetProps) {
	const { bottom, bottomSheetModalRef, passwordInputRef, handleSubmit } =
		useSignInBottomSheetController(ref);

	return (
		<BottomSheetModalProvider>
			<BottomSheetModal ref={bottomSheetModalRef}>
				<BottomSheetView style={[styles.container, { paddingBottom: bottom }]}>
					<AppText size="3xl" weight="semiBold" style={styles.heading}>
						Acesse a sua conta
					</AppText>

					<View style={styles.form}>
						<FormGroup label="E-mail">
							<Input
								InputComponent={SheetTextInput}
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
								autoComplete="email"
								returnKeyType="next"
								onSubmitEditing={() => passwordInputRef.current?.focus()}
								placeholder="E-mail"
							/>
						</FormGroup>

						<FormGroup label="Senha">
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
							/>
						</FormGroup>

						<Button onPress={handleSubmit}>Entrar</Button>
					</View>
				</BottomSheetView>
			</BottomSheetModal>
		</BottomSheetModalProvider>
	);
}
