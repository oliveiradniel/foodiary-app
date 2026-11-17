export function utcToLocalDate(value: Date | string) {
	const date = new Date(value);

	return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}
