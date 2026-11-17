import z from 'zod';

import { Gender } from '@app/types/Gender';

export const profileSchema = z.object({
	name: z.string().min(1, 'Informe o seu nome.'),
	birthDate: z.date().refine((date) => date <= new Date(), {
		error: 'A data de nascimento não pode ser no futuro.',
	}),
	height: z.string().refine((value) => Number(value) > 0, {
		error: 'Informe a sua altura.',
	}),
	weight: z.string().refine((value) => Number(value) > 0, {
		error: 'Informe o seu peso.',
	}),
	gender: z.enum(Gender),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
