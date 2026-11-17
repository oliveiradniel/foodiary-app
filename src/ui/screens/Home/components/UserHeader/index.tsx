import { useNavigation } from '@react-navigation/native';
import { useAccountQuery } from '@services/AccountsService/hooks/useAccountQuery';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './styles';

import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';
import { TargetIcon } from 'lucide-react-native';
import { Image, TouchableOpacity, View } from 'react-native';

import type { AppStackNavigationProps } from '@app/navigation/AppStack';

export function UserHeader() {
	const { top } = useSafeAreaInsets();
	const { navigate } = useNavigation<AppStackNavigationProps>();

	const { account } = useAccountQuery();

	return (
		<View style={[styles.container, { paddingTop: top }]}>
			<TouchableOpacity
				style={styles.userInfo}
				onPress={() => navigate('profile')}
			>
				<Image
					source={{
						uri: 'https://github.com/oliveiradniel.png',
					}}
					style={styles.avatar}
				/>

				<View style={styles.greetings}>
					<AppText size="sm" color={theme.colors.gray[700]}>
						Olá, 👋
					</AppText>
					<AppText weight="semiBold">{account!.profile.name}</AppText>
				</View>
			</TouchableOpacity>

			<Button
				variant="ghost"
				leftIcon={TargetIcon}
				onPress={() => navigate('editGoals')}
			>
				Metas
			</Button>
		</View>
	);
}
