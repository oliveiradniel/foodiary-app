type Food = {
	name: string;
	quantity: string;
	calories: number;
	proteins: number;
	carbohydrates: number;
	fats: number;
};

export type Meal = {
	id: string;
	createdAt: Date;
	name: string;
	icon: string;
	foods: Food[];
};
