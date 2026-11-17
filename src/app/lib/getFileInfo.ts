import { File } from 'expo-file-system';

export function getFileInfo(fileUri: string) {
	const fileInfo = new File(fileUri).info();
	const filename = fileUri.split('/').at(-1);

	if (!fileInfo.exists || !fileInfo.size || !filename) {
		throw new Error(`File ${fileUri} does not exist.`);
	}

	const type = filename.endsWith('.jpg') ? 'image/jpeg' : 'audio/m4a';

	return { size: fileInfo.size, filename, type } as const;
}
