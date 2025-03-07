import { Document } from "mongoose";
export interface Note extends Document {
	id: number | string;
	title: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
}
