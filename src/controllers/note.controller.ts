import NoteService from "../services/note.service";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/httpError";
import mongoose from "mongoose";
import { AuthRequest } from "../utils/data";

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
	async getNotes(req: AuthRequest, res: Response, next: NextFunction) {
		try {
			const page = Number(req.query.page) || 1;
			const limit = Number(req.query.limit) || 10;

			const userId = req.user?.userId as string;
			const data = await getAllNotes(page, limit, userId);

			res.status(200).send({ success: true, ...data });
		} catch (error) {
			next(new HttpError(500, "Internal Server Error"));
		}
	}

	// Get note by id
	async getNotesById(req: AuthRequest, res: Response, next: NextFunction) {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			next(new HttpError(400, "Invalid ID. Please provide a valid one"));
			return;
		}
		try {
			const userId = req.user?.userId as string;
			const data = await getNotesById(req.params.id, userId);
			if (data) {
				res.status(200).send({
					success: true, 
					message: "Note fetched succesfully",
					data 
				});
			} else {
				next(new HttpError(404, "Note not found"));
			}
		} catch (error) {
			return next(new HttpError(500, "Internal Server Error"));
		}
	}

	// Create a new note
	async createNote(req: AuthRequest, res: Response, next: NextFunction) {
		try {
			const { title, content, category } = req.body;
			const userId = req.user?.userId as string;

			let foundCategory = (await getCategoryByName(category.name)).toJSON();

			const data = await createNote({
				title,
				content,
				category: foundCategory,
				userId,
			});
			res.status(201).send({ 
				success: true,
				message: "Note created successfully",
				data 
			});
		} catch (error) {
			return next(new HttpError(500, "Internal Server Error"));
		}
	}

	// Delete a note
	async deleteNote(req: AuthRequest, res: Response, next: NextFunction) {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			next(new HttpError(400, "Invalid ID. Please provide a valid one"));
			return;
		}
		try {
			const userId = req.user?.userId as string;
			const data = await deleteNoteById(req.params.id, userId);
			if (data) {
				res.status(200).send({
					success: true,
					message: "Note deleted successfully",
					data 
				});
			} else {
				return next(new HttpError(404, "Note not found"));
			}
		} catch (error) {
			return next(new HttpError(500, "Internal Server Error"));
		}
	}

	// Update a note
	async updateNoteById(req: AuthRequest, res: Response, next: NextFunction) {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			next(new HttpError(400, "Invalid ID. Please provide a valid one"));
			return;
		}
		try {
			const { title, content, category } = req.body;
			const userId = req.user?.userId as string;

			let foundCategory = (await getCategoryByName(category.name)).toJSON();

			const data = await updateNoteById(req.params.id, userId, {
				title,
				content,
				category: foundCategory,
				userId,
			});

			if (data) {
				res.status(200).send({ 
					success: true,
					message: "Note updated successfully",
					data 
				});
			} else {
				return next(new HttpError(404, "Note not found"));
			}
		} catch (error) {
			return next(new HttpError(500, "Internal Server Error "));
		}
	}

	// get Notes by categories
	async getAllNotesByCategory(
		req: AuthRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const page = Number(req.query.page) || 1;
			const limit = Number(req.query.limit) || 10;

			const userId = req.user?.userId as string;
			const data = await getNotesByCategory(
				req.params.categoryId,
				page,
				limit,
				userId
			);
			if (!data || data.total === 0) {
				return next(new HttpError(404, "No Note in this category found"));
			} else {
				res.status(200).send({
					success: true,
					message: "Notes fetched Successfully",
					...data,
				});
			}
		} catch (error) {
			return next(new HttpError(500, "Internal Server Error"));
		}
	}

	// Welcome message
	async welcomeMessage(req: Request, res: Response) {
		res.status(200).send(
			"Welcome to the Joekode Notes API version 3. This is a simple API to manage notes"
		);
	}
}
