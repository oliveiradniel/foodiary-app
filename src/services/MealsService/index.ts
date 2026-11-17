import { Service } from '@services/Service';

import type { Meal, SimplifiedMeal } from '@app/types/Meal';

export class MealsService extends Service {
	static async getMealsByDate(
		date: string,
	): Promise<MealsService.GetMealsByDateResponse> {
		const { data } = await this.client.get<MealsService.GetMealsByDateResponse>(
			'/meals',
			{ params: { date } },
		);

		return {
			meals: data.meals.map((meal) => ({
				...meal,
				createdAt: new Date(meal.createdAt),
			})),
		};
	}

	static async getMealById(
		id: string,
	): Promise<MealsService.GetMealByIdResponse> {
		const { data } = await this.client.get<MealsService.GetMealByIdResponse>(
			`/meals/${id}`,
		);

		return {
			meal: {
				...data.meal,
				createdAt: new Date(data.meal.createdAt),
			},
		};
	}

	static async create(
		payload: MealsService.CreatePayload,
	): Promise<MealsService.CreateResponse> {
		const { data } = await this.client.post<MealsService.CreateResponse>(
			'/meals',
			payload,
		);

		await this.uploadPresignedPOST({
			uploadSignature: data.uploadSignature,
			file: {
				type: payload.file.type,
				uri: payload.file.uri,
				name: payload.file.name,
			},
		});

		return data;
	}
}

export namespace MealsService {
	export type GetMealsByDateResponse = {
		meals: SimplifiedMeal[];
	};

	export type GetMealByIdResponse = {
		meal: Meal;
	};

	export type CreatePayload = {
		timezone: string;
		file: {
			type: 'audio/m4a' | 'image/jpeg';
			size: number;
			uri: string;
			name: string;
		};
	};

	export type CreateResponse = {
		mealId: string;
		uploadSignature: string;
	};
}
