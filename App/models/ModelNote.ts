import { Schema, model } from "mongoose";
import { NoteDocument } from "utils/note";

const NoteSchema: Schema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	}
);

export const ModelNote = model<NoteDocument>("Note", NoteSchema);