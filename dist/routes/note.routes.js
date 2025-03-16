"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const note_controller_1 = __importDefault(require("../controllers/note.controller"));
const validators_middleware_1 = require("../middlewares/validators.middleware");
const note_schema_1 = __importDefault(require("../validation/note.schema"));
const { getNotes, getNotesById, createNote, deleteNote, updateNoteById, getAllNotesByCategory, welcomeMessage, } = new note_controller_1.default();
function default_1(router) {
    router.get("/", welcomeMessage);
    router.get("/v2/api/notes", getNotes);
    router.get("/v2/api/notes/:id", getNotesById);
    router.post("/v2/api/notes", (0, validators_middleware_1.RequestValidator)(note_schema_1.default), createNote);
    router.delete("/v2/api/notes/:id", deleteNote);
    router.put("/v2/api/notes/:id", (0, validators_middleware_1.RequestValidator)(note_schema_1.default), updateNoteById);
    router.get("/v2/api/notes/categories/:categoryId", getAllNotesByCategory);
}
