import { Document } from "mongoose";
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
