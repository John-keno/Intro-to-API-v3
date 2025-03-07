import { ModelNote } from "../models/ModelNote";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/HttpError";
import mongoose from "mongoose";

// Get all notes
export const getNotes = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = await ModelNote.find();
		res.json(data).status(200);
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
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		next(new HttpError(400, "Invalid ID. Please provide a valid one"));
		return;
	}
	try {
		const data = await ModelNote.findById(req.params.id);
		if (data) {
			res.json(data).status(200);
			console.log(`${res.statusCode} ${req.method} ${req.path}`);
		} else {
			next(new HttpError(404, "Note not found"));
		}
	} catch (error) {
		return next(new HttpError(500, "Internal Server Error"));
	}
};

// Create a new note
export const createNote = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.body.title || !req.body.content) {
		return next(new HttpError(400, "Title and content are required"));
	}

	try {
		const data = await ModelNote.create(req.body);
		res
			.status(201)
			.send({ message: "Note created successfully", success: true, data });
		console.log(`${res.statusCode} ${req.method} ${req.path}`);
	} catch (error) {
		return next(new HttpError(500, "Internal Server Error"));
	}
};

// Delete a note
export const deleteNote = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		next(new HttpError(400, "Invalid ID. Please provide a valid one"));
		return;
	}
	try {
		const data = await ModelNote.findByIdAndDelete(req.params.id);
		if (data) {
			res
				.status(200)
				.send({ message: "Note deleted successfully", success: true, data });
			console.log(`${res.statusCode} ${req.method} ${req.path}`);
		} else {
			return next(new HttpError(404, "Note not found"));
		}
	} catch (error) {
		return next(new HttpError(500, "Internal Server Error"));
	}
};
