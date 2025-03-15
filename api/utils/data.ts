import { Document } from "mongoose";

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
