import { Router } from "express";
import NoteController from "../controllers/note.controller";
import {
	requestQueryValidator,
	RequestValidator,
} from "../middlewares/validators.middleware";
import { NoteSchema, NoteQuerySchema } from "../validation/note.schema";
import { verifyToken } from "../middlewares/authenticator.middleware";

const {
	getNotes,
	getNotesById,
	createNote,
	deleteNote,
	updateNoteById,
	getAllNotesByCategory,
	welcomeMessage,
} = new NoteController();

export default function (router: Router) {
	router.get("/", welcomeMessage);
	router.get(
		"/v3/api/notes",
		verifyToken,
		requestQueryValidator(NoteQuerySchema),
		getNotes
	);
	router.post(
		"/v3/api/notes",
		verifyToken,
		RequestValidator(NoteSchema),
		createNote
	);
	router.get("/v3/api/notes/:id", verifyToken, getNotesById);
	router.delete("/v3/api/notes/:id", verifyToken, deleteNote);
	router.put(
		"/v3/api/notes/:id",
		verifyToken,
		RequestValidator(NoteSchema),
		updateNoteById
	);
	router.get(
		"/v3/api/notes/categories/:categoryId",
		verifyToken,
		requestQueryValidator(NoteQuerySchema),
		getAllNotesByCategory
	);
}
