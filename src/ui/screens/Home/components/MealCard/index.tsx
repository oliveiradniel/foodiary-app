import { useMemo } from 'react';
import { useHomeContext } from '../../context/useHomeContext';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { AppText } from '@ui/components/AppText';
import { Platform, Pressable, View } from 'react-native';

import type { Meal } from '@app/types/Meal';

type MealCardProps = {
	meal: Meal;
};

export function MealCard({ meal }: MealCardProps) {
	const { isLoading } = useHomeContext();

	const formattedFoods = useMemo(
		() =>
			meal.foods
				.map((food, index) => {
					const name = food.name;

					if (index === 0) {
						return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
					}

					return name;
				})
				.join(', '),
		[meal.foods],
	);

	const summary = useMemo(
		() =>
			meal.foods.reduce(
				(acc, food) => ({
					calories: acc.calories + food.calories,
					proteins: acc.proteins + food.proteins,
					carbohydrates: acc.carbohydrates + food.carbohydrates,
					fats: acc.fats + food.fats,
				}),
				{ calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
			),
		[meal.foods],
	);

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
					android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
					disabled={isLoading}
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
									{summary.calories.toFixed(0)}
								</AppText>
								<AppText color={theme.colors.gray[700]}>Kcal</AppText>
							</View>

							<View style={styles.mealStat}>
								<AppText color={theme.colors.support.teal} weight="medium">
									{summary.proteins.toFixed(0)}g
								</AppText>
								<AppText color={theme.colors.gray[700]}>Proteínas</AppText>
							</View>
						</View>

						<View style={styles.mealStatsRow}>
							<View style={styles.mealStat}>
								<AppText color={theme.colors.support.yellow} weight="medium">
									{summary.carbohydrates.toFixed(0)}
								</AppText>
								<AppText color={theme.colors.gray[700]}>Carboidratos</AppText>
							</View>

							<View style={styles.mealStat}>
								<AppText color={theme.colors.support.orange} weight="medium">
									{summary.fats.toFixed(0)}g
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
