import { Schema, model } from "mongoose";
import { Category, Note } from "utils/data";

const NoteSchema: Schema = new Schema(
	{
		title: {
			type: String,
			required: [true, "field is required"],
		},
		content: {
			type: String,
			required: [true, "field is required"],
		},
		category: {
			id: {
				type: String,
				min: 10,
				max: 10,
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: (doc, res) => {
				return {
					id: res._id,
					title: res.title,
					content: res.content,
					category: res.category,
					createdAt: res.createdAt,
					updatedAt: res.updatedAt,
				};
			},
		},
	}
);

const CategorySchema: Schema = new Schema(
	{
		id: { type: String, required: [true, "field is requiured"] },
		name: { type: String, required: [true, "field is required"] },
	},
	{
		toJSON: {
			transform: (doc, res) => {
				return {
					id: res.id,
					name: res.name,
				};
			},
		},
	}
);

export const ModelNote = model<Note>("Note", NoteSchema);
export const ModelCategory = model<Category>("Category", CategorySchema);
