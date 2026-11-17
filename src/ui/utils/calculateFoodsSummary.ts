import type { SimplifiedMeal } from '@app/types/Meal';

type Food = SimplifiedMeal['foods'][number];

export function calculateFoodsSummary(foods: Food[]) {
	return foods.reduce(
		(acc, food) => {
			const proteinsCalories = food.proteins * 4;
			const carbohydratesCalories = food.carbohydrates * 4;
			const fatsCalories = food.fats * 9;

			const totalCalories =
				proteinsCalories + carbohydratesCalories + fatsCalories;

			return {
				calories: acc.calories + totalCalories,
				proteins: acc.proteins + food.proteins,
				carbohydrates: acc.carbohydrates + food.carbohydrates,
				fats: acc.fats + food.fats,
			};
		},
		{ calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
	);
}
