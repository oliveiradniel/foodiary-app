import z from 'zod';

const positiveNumber = (message: string) =>
	z.string().refine((value) => Number(value) > 0, { error: message });

export const editGoalsSchema = z.object({
	calories: positiveNumber('Informe a meta de calorias.'),
	proteins: positiveNumber('Informe a meta de proteínas.'),
	carbohydrates: positiveNumber('Informe a meta de carboidratos.'),
	fats: positiveNumber('Informe a meta de gorduras.'),
});

export type EditGoalsSchema = z.infer<typeof editGoalsSchema>;
