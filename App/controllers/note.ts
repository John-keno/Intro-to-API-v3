import { ModelNote } from "../models/ModelNote";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";

// Get all notes
export const getNotes = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const notes = await ModelNote.find();
		res.json(notes).status(200);
		console.log(`${res.statusCode} ${req.method} ${req.path}`);
	} catch (error) {
		next(new HttpError(500, "Internal Server Error"));
	}
};

// Get note by id
export const getNotesById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const note = await ModelNote.findById(req.params.id);
		if (note) {
			const resNote = {
				id: note._id,
				title: note.title,
				content: note.content,
				createdAt: note.createdAt,
				updatedAt: note.updatedAt,
			}
			res.json(resNote).status(200);
			console.log(`${res.statusCode} ${req.method} ${req.path}`);
		} else {
			next(new HttpError(404, "Note not found"));
		}
	} catch (error) {
		next(new HttpError(500, "Internal Server Error"));
	}
}

// Create a new note
export const createNote = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const note = await ModelNote.create(req.body);
		res.json(note).status(201);
		console.log(`${res.statusCode} ${req.method} ${req.path}`);
	} catch (error) {
		next(new HttpError(500, "Internal Server Error"));
	}
}

// Delete a note
export const deleteNote = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const note = await ModelNote.findByIdAndDelete(req.params.id);
		if (note) {
			res.json(note).status(200);
			console.log(`${res.statusCode} ${req.method} ${req.path}`);
		} else {
			next(new HttpError(404, "Note not found"));
		}
	} catch (error) {
		next(new HttpError(500, "Internal Server Error"));
	}
}