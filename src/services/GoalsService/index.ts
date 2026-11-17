import { Service } from '@services/Service';

export class GoalsService extends Service {
	static async update(payload: GoalsService.UpdatePayload): Promise<void> {
		await this.client.put('/goals', payload);
	}
}

export namespace GoalsService {
	export type UpdatePayload = {
		calories: number;
		proteins: number;
		carbohydrates: number;
		fats: number;
	};
}
