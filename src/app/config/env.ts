import z from 'zod';

const schema = z.object({
	EXPO_PUBLIC_API_URL: z.url(),
});

const parsedEnv = schema.parse({
	EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
});

export const env = {
	api: { url: parsedEnv.EXPO_PUBLIC_API_URL },
};
