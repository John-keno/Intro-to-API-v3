import { Router } from "express";
import NoteController from "../controllers/note.controller";
import { RequestValidator } from "../middlewares/validators.middleware";
import NoteSchema from "../validation/note.schema";

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
	router.get("/api/notes", getNotes);
	router.get("/api/notes/:id", getNotesById);
	router.post("/api/notes", RequestValidator(NoteSchema), createNote);
	router.delete("/api/notes/:id", deleteNote);
	router.put("/api/notes/:id", RequestValidator(NoteSchema), updateNoteById);
	router.get("/api/notes/categories/:categoryId", getAllNotesByCategory);
}
