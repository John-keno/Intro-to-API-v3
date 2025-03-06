import { Schema, model } from "mongoose";
import { Note, NoteDocument } from "utils/note";

const NoteSchema: Schema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

export const ModelNote = model<NoteDocument>("Note", NoteSchema);
