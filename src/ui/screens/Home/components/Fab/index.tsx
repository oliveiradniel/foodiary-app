import { useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { PlusIcon } from 'lucide-react-native';

import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { CreateMealOptions } from '@ui/components/CreateMealOptions';
import { View } from 'react-native';

export function Fab() {
	const { bottom } = useSafeAreaInsets();

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	function handleOpenBottomSheet() {
		bottomSheetModalRef.current?.present();
	}

	return (
		<>
			<View style={[styles.container, { bottom }]}>
				<Button size="icon" onPress={handleOpenBottomSheet}>
					<PlusIcon size={20} color={theme.colors.black[700]} />
				</Button>
			</View>

			<BottomSheetModalProvider>
				<BottomSheetModal ref={bottomSheetModalRef} style={styles.bottomSheet}>
					<BottomSheetView style={[styles.content, { paddingBottom: bottom }]}>
						<AppText size="lg" weight="semiBold" style={styles.title}>
							Cadastre sua refeição
						</AppText>

						<CreateMealOptions
							onCreate={() => bottomSheetModalRef.current?.dismiss()}
						/>
					</BottomSheetView>
				</BottomSheetModal>
			</BottomSheetModalProvider>
		</>
	);
}
