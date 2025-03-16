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
	router.get("/v2/api/notes", getNotes);
	router.get("/v2/api/notes/:id", getNotesById);
	router.post("/v2/api/notes", RequestValidator(NoteSchema), createNote);
	router.delete("/v2/api/notes/:id", deleteNote);
	router.put("/v2/api/notes/:id", RequestValidator(NoteSchema), updateNoteById);
	router.get("/v2/api/notes/categories/:categoryId", getAllNotesByCategory);
}
