import { useMealCardController } from './useMealCardController';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { AppText } from '@ui/components/AppText';
import { Platform, Pressable, View } from 'react-native';

import type { SimplifiedMeal } from '@app/types/Meal';

type MealCardProps = {
	meal: SimplifiedMeal;
};

export function MealCard({ meal }: MealCardProps) {
	const { formattedFoods, summary, navigate, isLoading } =
		useMealCardController(meal);

	return (
		<View style={[styles.container, { opacity: isLoading ? 0.5 : 1 }]}>
			<AppText color={theme.colors.gray[700]}>
				{formatTime(meal.createdAt)}
			</AppText>

			<View style={styles.wrapper}>
				<Pressable
					style={({ pressed }) => [
						styles.card,
						pressed && Platform.OS === 'ios' && { opacity: 0.5 },
					]}
					android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', foreground: true }}
					disabled={isLoading}
					onPress={() => navigate('mealDetails', { mealId: meal.id })}
				>
					<View style={styles.header}>
						<View style={styles.icon}>
							<AppText>{meal.icon}</AppText>
						</View>

						<View style={styles.mealDetails}>
							<AppText
								color={theme.colors.gray[700]}
								size="sm"
								numberOfLines={1}
							>
								{meal.name}
							</AppText>
							<AppText weight="medium" numberOfLines={1}>
								{formattedFoods}
							</AppText>
						</View>
					</View>

					<View style={styles.body}>
						<View style={styles.mealStatsRow}>
							<View style={styles.mealStat}>
								<AppText color={theme.colors.support.tomato} weight="medium">
									{Math.round(summary.calories)}
								</AppText>
								<AppText color={theme.colors.gray[700]}>Kcal</AppText>
							</View>

							<View style={styles.mealStat}>
								<AppText color={theme.colors.support.teal} weight="medium">
									{Math.round(summary.proteins)}g
								</AppText>
								<AppText color={theme.colors.gray[700]}>Proteínas</AppText>
							</View>
						</View>

						<View style={styles.mealStatsRow}>
							<View style={styles.mealStat}>
								<AppText color={theme.colors.support.yellow} weight="medium">
									{Math.round(summary.carbohydrates)}
								</AppText>
								<AppText color={theme.colors.gray[700]}>Carboidratos</AppText>
							</View>

							<View style={styles.mealStat}>
								<AppText color={theme.colors.support.orange} weight="medium">
									{Math.round(summary.fats)}g
								</AppText>
								<AppText color={theme.colors.gray[700]}>Gorduras</AppText>
							</View>
						</View>
					</View>
				</Pressable>
			</View>
		</View>
	);
}

function formatTime(date: Date) {
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	return `${hours}h${minutes}`;
}
