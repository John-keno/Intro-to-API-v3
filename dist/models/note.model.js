"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelCategory = exports.ModelNote = void 0;
const mongoose_1 = require("mongoose");
const NoteSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "field is required"],
    },
    content: {
        type: String,
        required: [true, "field is required"],
    },
    category: {
        id: {
            type: String,
            min: 10,
            max: 10,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, res) => {
            return {
                id: res._id,
                title: res.title,
                content: res.content,
                category: res.category,
                createdAt: res.createdAt,
                updatedAt: res.updatedAt,
            };
        },
    },
});
const CategorySchema = new mongoose_1.Schema({
    id: { type: String, required: [true, "field is requiured"] },
    name: { type: String, required: [true, "field is required"] },
}, {
    toJSON: {
        transform: (doc, res) => {
            return {
                id: res.id,
                name: res.name,
            };
        },
    },
});
exports.ModelNote = (0, mongoose_1.model)("Note", NoteSchema);
exports.ModelCategory = (0, mongoose_1.model)("Category", CategorySchema);
