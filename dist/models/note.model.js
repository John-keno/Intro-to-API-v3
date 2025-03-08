"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelNote = void 0;
const mongoose_1 = require("mongoose");
const NoteSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, res) => {
            return {
                id: res._id,
                title: res.title,
                content: res.content,
                createdAt: res.createdAt,
                updatedAt: res.updatedAt,
            };
        },
    },
});
exports.ModelNote = (0, mongoose_1.model)("Note", NoteSchema);
//# sourceMappingURL=note.model.js.map