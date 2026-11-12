import { useHomeContext } from '../../context/useHomeContext';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';

import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { View } from 'react-native';

export function DateSwitcher() {
	const { date, isLoading, nextDay, previousDay } = useHomeContext();

	return (
		<View style={[styles.container, { opacity: isLoading ? 0.5 : 1 }]}>
			<Button
				size="icon"
				variant="ghost"
				disabled={isLoading}
				onPress={previousDay}
			>
				<ChevronLeftIcon />
			</Button>

			<AppText
				color={theme.colors.gray[700]}
				weight="medium"
				style={styles.date}
			>
				{formatDate(date)}
			</AppText>

			<Button
				size="icon"
				variant="ghost"
				disabled={isLoading}
				onPress={nextDay}
			>
				<ChevronRightIcon />
			</Button>
		</View>
	);
}

function formatDate(date: Date) {
	const now = new Date();
	const isToday = now.toDateString() === date.toDateString();

	const formattedDate = Intl.DateTimeFormat('pt-BR', {
		weekday: isToday ? undefined : 'long',
		day: '2-digit',
		month: 'long',
	}).format(date);

	return `${isToday ? 'HOJE, ' : ''}${formattedDate}`.toUpperCase();
}
