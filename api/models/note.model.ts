import { Schema, model } from "mongoose";
import { Note } from "utils/data";

const NoteSchema: Schema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
	},
	{
		timestamps: true,
		toJSON: {
			transform: (doc, res) => {
				return{
					id: res._id,
					title: res.title,
					content: res.content,
					createdAt: res.createdAt,
					updatedAt: res.updatedAt,
				};
			},
		},
	}
);

export const ModelNote = model<Note>("Note", NoteSchema);
