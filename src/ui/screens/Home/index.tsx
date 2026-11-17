import { useHomeController } from './useHomeController';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { HomeProvider } from './context/HomeProvider';

import { FlatList, RefreshControl, View } from 'react-native';
import { EmptyState } from './components/EmptyState';
import { Fab } from './components/Fab';
import { FullScreenLoader } from './components/FullScreenLoader';
import { Header } from './components/Header';
import { ItemSeparatorComponent } from './components/ItemSeparatorComponent';
import { MealCard } from './components/MealCard';
import { WelcomeModal } from './components/WelcomeModal';

export function Home() {
	const {
		top,
		bottom,
		meals,
		date,
		isInitialLoading,
		isLoading,
		isRefreshing,
		handleRefresh,
		handleNextDay,
		handlePreviousDay,
	} = useHomeController();

	if (isInitialLoading) {
		return <FullScreenLoader />;
	}

	return (
		<View style={styles.container}>
			<WelcomeModal />

			<HomeProvider
				meals={meals}
				date={date}
				isLoading={isLoading}
				nextDay={handleNextDay}
				previousDay={handlePreviousDay}
			>
				<FlatList
					data={meals}
					keyExtractor={({ id }) => id}
					ListHeaderComponent={Header}
					ListEmptyComponent={EmptyState}
					ItemSeparatorComponent={ItemSeparatorComponent}
					contentContainerStyle={[
						styles.content,
						{ paddingBottom: bottom + 24 },
					]}
					refreshControl={
						<RefreshControl
							refreshing={isRefreshing}
							onRefresh={handleRefresh}
							progressViewOffset={top}
							tintColor={theme.colors.lime[900]}
							colors={[theme.colors.lime[700]]}
						/>
					}
					renderItem={({ item: meal }) => <MealCard meal={meal} />}
				/>
			</HomeProvider>

			{meals.length > 0 && <Fab />}
		</View>
	);
}
