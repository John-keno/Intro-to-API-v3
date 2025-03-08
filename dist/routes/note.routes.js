"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const note_controller_1 = require("../controllers/note.controller");
function default_1(router) {
    router.get("/api/notes", note_controller_1.getNotes);
    router.get("/api/notes/:id", note_controller_1.getNotesById);
    router.post("/api/notes", note_controller_1.createNote);
    router.delete("/api/notes/:id", note_controller_1.deleteNote);
}
//# sourceMappingURL=note.routes.js.map