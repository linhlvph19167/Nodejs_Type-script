import { IRegister, IUser } from '../interfaces/users';

import { instance } from './instance';

/* login */
export const login = (data: IUser) => {
	return instance.post('/sign-in', data);
};

/* register */
export const register = (data: IRegister) => {
	return instance.post('/sign-up', data);
};
