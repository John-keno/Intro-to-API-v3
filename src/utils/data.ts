import { Document } from "mongoose";
import { Request } from "express";

/**
 * Interface representing a Note document in the database.
 * @extends Document from mongoose
 */

/**
 * Interface representing a Category.
 * @interface Category
 */

/**
 * Interface representing a Category document in the database.
 * @extends Document from mongoose
 */

export interface Note extends Document {
	id: string;
	title: string;
	category: Category;
	content: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Category {
	id: string;
	name: string;
}

export interface CategoryDocument extends Document {
	id: string;
	name: string;
}

export interface User extends Document {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface AuthData {
	userId: string | unknown;
	email: string;
	name: string;
}

export interface AuthRequest extends Request {
	user?: AuthData;
}

export interface AuthCredentials {
	email: string;
	password: string;
}

export interface RegisterData extends AuthCredentials {
	name: string;
}
