import { IUser } from '../User';

declare global {
	namespace Express {
		export interface User extends IUser {}
	}
}
