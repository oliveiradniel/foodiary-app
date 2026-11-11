import { useMemo } from 'react';

import { theme } from '@ui/styles/theme';
import { styles } from './styles';

import { calcMacroPercentage, formatMacro } from './utils';

import { View } from 'react-native';
import { AppText } from '../AppText';
import { Arc } from './Arc';

import type { MacroProgress } from './types';

type GoalStatsProps = {
	calories: MacroProgress;
	proteins: MacroProgress;
	carbohydrates: MacroProgress;
	fats: MacroProgress;
};

export function GoalStats({
	calories,
	carbohydrates,
	fats,
	proteins,
}: GoalStatsProps) {
	const percentages = useMemo(
		() => ({
			calories: calcMacroPercentage(calories),
			carbohydrates: calcMacroPercentage(carbohydrates),
			fats: calcMacroPercentage(fats),
			proteins: calcMacroPercentage(proteins),
		}),
		[calories, carbohydrates, fats, proteins],
	);

	return (
		<View style={styles.container}>
			<View style={styles.arcsContainer}>
				<Arc
					percentage={percentages.calories}
					color={theme.colors.support.tomato}
					radius={160}
					strokeWidth={12}
				/>
				<Arc
					percentage={percentages.proteins}
					color={theme.colors.support.teal}
					radius={140}
					strokeWidth={12}
					style={styles.proteinArc}
				/>
				<Arc
					percentage={percentages.carbohydrates}
					color={theme.colors.support.yellow}
					radius={120}
					strokeWidth={12}
					style={styles.carbohydrateArc}
				/>
				<Arc
					percentage={percentages.fats}
					color={theme.colors.support.orange}
					radius={100}
					strokeWidth={12}
					style={styles.fatArc}
				/>

				<View style={styles.caloriesTextContainer}>
					<AppText
						size="xl"
						weight="semiBold"
						color={theme.colors.support.tomato}
					>
						{formatMacro(calories)}
						{calories.current !== undefined && (
							<AppText color={theme.colors.gray[700]}>
								{' '}
								/ {calories.goal}
							</AppText>
						)}
					</AppText>

					<AppText
						size="sm"
						align="center"
						color={theme.colors.gray[700]}
						style={styles.caloriesLabel}
					>
						Calorias
					</AppText>
				</View>
			</View>

			<View style={styles.macrosContainer}>
				<MacroItem
					label="Proteínas"
					color={theme.colors.support.teal}
					progress={proteins}
				/>
				<MacroItem
					label="Carboidratos"
					color={theme.colors.support.yellow}
					progress={carbohydrates}
				/>
				<MacroItem
					label="Gorduras"
					color={theme.colors.support.orange}
					progress={fats}
				/>
			</View>
		</View>
	);
}

type MacroItemProps = {
	label: string;
	color: string;
	progress: MacroProgress;
};

function MacroItem({ label, color, progress }: MacroItemProps) {
	return (
		<View style={styles.macroItem}>
			<AppText weight="semiBold" color={color}>
				{formatMacro(progress)}g
				{progress.current !== undefined && (
					<AppText size="sm" color={theme.colors.gray[700]}>
						{' '}
						/ {progress.goal}g
					</AppText>
				)}
			</AppText>

			<AppText size="sm" color={theme.colors.gray[700]}>
				{label}
			</AppText>
		</View>
	);
}
