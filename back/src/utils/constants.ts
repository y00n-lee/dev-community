import { config } from 'dotenv';

config();

export const jwtContents = {
	secret: process.env.JWT_SECRET_KEY || '',
	header: process.env.JWT_HEADER || '',
};

export const secretContents = {
	signin: process.env.SIGNIN_SECRET_KEY || '',
};
