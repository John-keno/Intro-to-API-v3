import NoteService from "../services/note.service";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/httpError";
import mongoose from "mongoose";

const {
	getAllNotes,
	getNotesById,
	createNote,
	deleteNoteById,
	getCategoryByName,
	updateNoteById,
	getNotesByCategory,
} = new NoteService();

export default class NoteController {
	// Get all notes
	async getNotes(req: Request, res: Response, next: NextFunction) {
		try {
			const { limit, page } = req.query;
			const data = await getAllNotes(
				parseInt(page as string) || 1,
				parseInt(limit as string) || 10
			);

			res.status(200).send({ success: true, ...data });
		} catch (error) {
			next(new HttpError(500, "Internal Server Error"));
		}
	}

	// Get note by id
	async getNotesById(req: Request, res: Response, next: NextFunction) {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			next(new HttpError(400, "Invalid ID. Please provide a valid one"));
			return;
		}
		try {
			const data = await getNotesById(req.params.id);
			if (data) {
				res.status(200).send(data);
			} else {
				next(new HttpError(404, "Note not found"));
			}
		} catch (error) {
			return next(new HttpError(500, "Internal Server Error"));
		}
	}

	// Create a new note
	async createNote(req: Request, res: Response, next: NextFunction) {
		try {
			const { title, content, category } = req.body;
			let foundCategory = (await getCategoryByName(category.name)).toJSON();

			const data = await createNote({
				title,
				content,
				category: foundCategory,
			});
			res
				.status(201)
				.send({ message: "Note created successfully", success: true, data });
		} catch (error) {
			return next(new HttpError(500, "Internal Server Error"));
		}
	}

	// Delete a note
	async deleteNote(req: Request, res: Response, next: NextFunction) {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			next(new HttpError(400, "Invalid ID. Please provide a valid one"));
			return;
		}
		try {
			const data = await deleteNoteById(req.params.id);
			if (data) {
				res
					.status(200)
					.send({ message: "Note deleted successfully", success: true, data });
			} else {
				return next(new HttpError(404, "Note not found"));
			}
		} catch (error) {
			return next(new HttpError(500, "Internal Server Error"));
		}
	}

	// Update a note
	async updateNoteById(req: Request, res: Response, next: NextFunction) {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			next(new HttpError(400, "Invalid ID. Please provide a valid one"));
			return;
		}
		try {
			const { title, content, category } = req.body;

			let foundCategory = (await getCategoryByName(category.name)).toJSON();

			const data = await updateNoteById(req.params.id, {
				title,
				content,
				category: foundCategory,
			});

			if (data) {
				res
					.status(200)
					.send({ success: true, message: "Note updated successfully", data });
			} else {
				return next(new HttpError(404, "Note not found"));
			}
		} catch (error) {
			return next(new HttpError(500, "Internal Server Error "));
		}
	}

	// get Notes by categories
	async getAllNotesByCategory(req: Request, res: Response, next: NextFunction) {
		try {
			const { page, limit } = req.query;
			const data = await getNotesByCategory(
				req.params.categoryId,
				parseInt(page as string) || 1,
				parseInt(limit as string) || 10
			);
			if (data) {
				res.status(200).send({ success: true, ...data });
			} else {
				next(new HttpError(404, "No Note in this category found"));
			}
		} catch (error) {
			return next(new HttpError(500, "Internal Server Error"));
		}
	}

	// Welcome message
	async welcomeMessage(req: Request, res: Response) {
		res
			.status(200)
			.send(
				"Welcome to the Joekode Notes API version 2. This is a simple API to manage notes"
			);
	}
}
