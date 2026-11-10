import { useAuth } from '@app/contexts/AuthContext/useAuth';
import { useAccountQuery } from '@services/AccountsService/hooks/useAccountQuery';

import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { View } from 'react-native';

export function Home() {
	const { signOut } = useAuth();
	const { account } = useAccountQuery();

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<AppText>Bem-vindo {account?.profile.name}</AppText>

			<Button onPress={signOut}>Sair</Button>
		</View>
	);
}
