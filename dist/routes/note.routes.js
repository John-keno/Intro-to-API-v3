"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const note_controller_1 = __importDefault(require("../controllers/note.controller"));
const validators_middleware_1 = require("../middlewares/validators.middleware");
const note_schema_1 = require("../validation/note.schema");
const authenticator_middleware_1 = require("../middlewares/authenticator.middleware");
const { getNotes, getNotesById, createNote, deleteNote, updateNoteById, getAllNotesByCategory, welcomeMessage, } = new note_controller_1.default();
function default_1(router) {
    router.get("/", welcomeMessage);
    router.get("/v2/api/notes", authenticator_middleware_1.verifyToken, (0, validators_middleware_1.requestQueryValidator)(note_schema_1.NoteQuerySchema), getNotes);
    router.post("/v2/api/notes", authenticator_middleware_1.verifyToken, (0, validators_middleware_1.RequestValidator)(note_schema_1.NoteSchema), createNote);
    router.get("/v2/api/notes/:id", authenticator_middleware_1.verifyToken, getNotesById);
    router.delete("/v2/api/notes/:id", authenticator_middleware_1.verifyToken, deleteNote);
    router.put("/v2/api/notes/:id", authenticator_middleware_1.verifyToken, (0, validators_middleware_1.RequestValidator)(note_schema_1.NoteSchema), updateNoteById);
    router.get("/v2/api/notes/categories/:categoryId", authenticator_middleware_1.verifyToken, (0, validators_middleware_1.requestQueryValidator)(note_schema_1.NoteQuerySchema), getAllNotesByCategory);
}
