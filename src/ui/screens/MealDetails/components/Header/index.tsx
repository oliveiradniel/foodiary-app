import { useNavigation } from '@react-navigation/native';
import { useMemo, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { calculateFoodsSummary } from '@ui/utils/calculateFoodsSummary';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeftIcon } from 'lucide-react-native';

import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { BlurTargetView, BlurView } from 'expo-blur';
import { Image, StatusBar, View } from 'react-native';
import { MealDetailSkeleton } from '../MealDetailSkeleton';

import { MealInputType, type Meal } from '@app/types/Meal';
import type { ComponentRef } from 'react';

type HeaderProps = {
	meal?: Meal;
	isLoading: boolean;
};

export function Header({ meal, isLoading }: HeaderProps) {
	const targetRef = useRef<ComponentRef<typeof View> | null>(null);

	const { top } = useSafeAreaInsets();
	const { goBack } = useNavigation();

	const isPictureInput = meal?.inputType === MealInputType.PICTURE;

	const summary = useMemo(
		() => calculateFoodsSummary(meal?.foods ?? []),
		[meal?.foods],
	);

	const percentages = useMemo(() => {
		const proteinsCalories = summary.proteins * 4;
		const carbohydratesCalories = summary.carbohydrates * 4;
		const fatsCalories = summary.fats * 9;

		if (summary.calories === 0) {
			return { proteins: 0, carbohydrates: 0, fats: 0 };
		}

		return {
			proteins: Math.round((proteinsCalories / summary.calories) * 100),
			carbohydrates: Math.round(
				(carbohydratesCalories / summary.calories) * 100,
			),
			fats: Math.round((fatsCalories / summary.calories) * 100),
		};
	}, [summary]);

	return (
		<>
			<StatusBar animated barStyle="light-content" />

			<View style={styles.container}>
				{isPictureInput && (
					<View style={styles.imageContainer}>
						<BlurTargetView ref={targetRef} style={styles.blurTarget}>
							<Image
								resizeMode="cover"
								source={{
									uri: meal.inputFileURL,
								}}
								style={styles.image}
							/>
						</BlurTargetView>

						<LinearGradient
							colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0)']}
							style={[styles.overlay, { paddingTop: top + 12 }]}
							start={{ y: 0.5, x: 0 }}
							end={{ y: 1, x: 0 }}
						>
							<BlurView
								blurTarget={targetRef}
								blurMethod="dimezisBlurView"
								style={styles.blurView}
							>
								<Button size="icon" variant="ghost" onPress={goBack}>
									<ChevronLeftIcon size={20} color={theme.colors.white} />
								</Button>
							</BlurView>
						</LinearGradient>
					</View>
				)}

				<View
					style={[styles.content, { marginTop: !isPictureInput ? top : 0 }]}
				>
					<View
						style={[
							styles.pageTitleContainer,
							{ paddingLeft: isPictureInput ? 16 : 0 },
						]}
					>
						{!isPictureInput && (
							<Button size="icon" variant="ghost" onPress={goBack}>
								<ChevronLeftIcon size={20} color={theme.colors.white} />
							</Button>
						)}

						<AppText weight="medium" color={theme.colors.gray[300]}>
							Refeição
						</AppText>
					</View>

					<View style={styles.caloriesContainer}>
						<AppText color={theme.colors.gray[300]}>Calorias</AppText>
						<MealDetailSkeleton
							width={61}
							height={24}
							colorMode="dark"
							isLoading={isLoading}
						>
							<AppText color={theme.colors.white} weight="medium">
								{Math.round(summary.calories)}kcal
							</AppText>
						</MealDetailSkeleton>
					</View>
				</View>
			</View>

			<View style={styles.macrosContainer}>
				<View style={styles.macro}>
					<AppText color={theme.colors.gray[700]}>Proteínas</AppText>

					<MealDetailSkeleton width={96} height={24} isLoading={isLoading}>
						<AppText
							weight="medium"
							align="center"
							color={theme.colors.support.teal}
						>
							{Math.round(summary.proteins)}g ({percentages.proteins}%)
						</AppText>
					</MealDetailSkeleton>
				</View>

				<View style={styles.macro}>
					<AppText color={theme.colors.gray[700]}>Carboidratos</AppText>

					<MealDetailSkeleton width={96} height={24} isLoading={isLoading}>
						<AppText
							weight="medium"
							align="center"
							color={theme.colors.support.yellow}
						>
							{Math.round(summary.carbohydrates)}g ({percentages.carbohydrates}
							%)
						</AppText>
					</MealDetailSkeleton>
				</View>

				<View style={styles.macro}>
					<AppText color={theme.colors.gray[700]}>Gorduras</AppText>

					<MealDetailSkeleton width={96} height={24} isLoading={isLoading}>
						<AppText
							weight="medium"
							align="center"
							color={theme.colors.support.orange}
						>
							{Math.round(summary.fats)}g ({percentages.fats}%)
						</AppText>
					</MealDetailSkeleton>
				</View>
			</View>

			<View style={styles.macrosProgressContainer}>
				<MealDetailSkeleton width="100%" height={4} isLoading={isLoading}>
					<View style={styles.macrosProgress}>
						<View
							style={[
								styles.proteinsProgress,
								{ width: `${percentages.proteins}%` },
							]}
						/>
						<View
							style={[
								styles.carbohydratesProgress,
								{ width: `${percentages.carbohydrates}%` },
							]}
						/>
						<View
							style={[styles.fatsProgress, { width: `${percentages.fats}%` }]}
						/>
					</View>
				</MealDetailSkeleton>
			</View>

			<View style={styles.divider} />

			<View style={styles.mealNameContainer}>
				<MealDetailSkeleton width="50%" height={24} isLoading={isLoading}>
					<AppText size="xl" weight="semiBold" style={styles.mealName}>
						{meal?.name}
					</AppText>
				</MealDetailSkeleton>
			</View>

			<AppText
				color={theme.colors.gray[700]}
				weight="medium"
				style={styles.mealsItemsHeader}
			>
				Itens
			</AppText>
		</>
	);
}
