import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { ChevronLeftIcon } from 'lucide-react-native';

import { View } from 'react-native';
import { AppText } from '../AppText';
import { Button } from '../Button';

import type { AppStackNavigationProps } from '@app/navigation/AppStack';
import type { ReactNode } from 'react';

type AppHeaderProps = {
	title: string;
	rightAction?: ReactNode;
};

export function AppHeader({ title, rightAction }: AppHeaderProps) {
	const { top } = useSafeAreaInsets();
	const { goBack } = useNavigation<AppStackNavigationProps>();

	return (
		<View style={[styles.container, { marginTop: top }]}>
			<Button size="icon" variant="ghost" onPress={goBack}>
				<ChevronLeftIcon size={20} color={theme.colors.black[700]} />
			</Button>

			<AppText size="sm" align="center" style={styles.title}>
				{title}
			</AppText>

			<View style={styles.rightAction}>{rightAction}</View>
		</View>
	);
}
