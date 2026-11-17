import { Service } from '@services/Service';

import { Gender } from '@app/types/Gender';

export class ProfilesService extends Service {
	static async update(payload: ProfilesService.UpdatePayload): Promise<void> {
		await this.client.put('/profiles', payload);
	}
}

export namespace ProfilesService {
	export type UpdatePayload = {
		name: string;
		birthDate: string;
		gender: Gender;
		height: number;
		weight: number;
	};
}
