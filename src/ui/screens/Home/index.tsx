import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { FlatList, RefreshControl, View } from 'react-native';
import { EmptyState } from './components/EmptyState';
import { Header } from './components/Header';
import { ItemSeparatorComponent } from './components/ItemSeparatorComponent';
import { MealCard } from './components/MealCard';
import { WelcomeModal } from './components/WelcomeModal';

export function Home() {
	const { bottom } = useSafeAreaInsets();

	const [isRefreshing, setIsRefreshing] = useState(false);

	async function handleRefresh() {
		setIsRefreshing(true);

		await new Promise((resolve) => setTimeout(resolve, 2000));

		setIsRefreshing(false);
	}

	return (
		<View style={styles.container}>
			<WelcomeModal />

			<FlatList
				data={[1, 2, 3]}
				keyExtractor={(item) => String(item)}
				ListHeaderComponent={Header}
				ListEmptyComponent={EmptyState}
				ItemSeparatorComponent={ItemSeparatorComponent}
				contentContainerStyle={[styles.content, { paddingBottom: bottom + 24 }]}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={handleRefresh}
						tintColor={theme.colors.lime[900]}
						colors={[theme.colors.lime[700]]}
					/>
				}
				renderItem={() => <MealCard />}
			/>
		</View>
	);
}
