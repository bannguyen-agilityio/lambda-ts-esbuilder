import { getUsers } from '@services/user';

export const handler = async () => {
	const users = await getUsers();

	console.log('Fetched users:', users);
	return users;
};

handler();
