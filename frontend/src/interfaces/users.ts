/* login */
export interface IUser {
	email: string;
	password: string;
}

/* register */
export interface IRegister {
	email: string;
	password: string;
	username: string;
	confirmPassword: string;
}
