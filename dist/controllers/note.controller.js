"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.createNote = exports.getNotesById = exports.getNotes = void 0;
const note_model_1 = require("../models/note.model");
const httpError_1 = require("../utils/httpError");
const mongoose_1 = __importDefault(require("mongoose"));
// Get all notes
const getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield note_model_1.ModelNote.find();
        res.json(data).status(200);
        console.log(`${res.statusCode} ${req.method} ${req.path}`);
    }
    catch (error) {
        next(new httpError_1.HttpError(500, "Internal Server Error"));
    }
});
exports.getNotes = getNotes;
// Get note by id
const getNotesById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
        next(new httpError_1.HttpError(400, "Invalid ID. Please provide a valid one"));
        return;
    }
    try {
        const data = yield note_model_1.ModelNote.findById(req.params.id);
        if (data) {
            res.json(data).status(200);
            console.log(`${res.statusCode} ${req.method} ${req.path}`);
        }
        else {
            next(new httpError_1.HttpError(404, "Note not found"));
        }
    }
    catch (error) {
        return next(new httpError_1.HttpError(500, "Internal Server Error"));
    }
});
exports.getNotesById = getNotesById;
// Create a new note
const createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.title || !req.body.content) {
        return next(new httpError_1.HttpError(400, "Title and content are required"));
    }
    try {
        const data = yield note_model_1.ModelNote.create(req.body);
        res
            .status(201)
            .send({ message: "Note created successfully", success: true, data });
        console.log(`${res.statusCode} ${req.method} ${req.path}`);
    }
    catch (error) {
        return next(new httpError_1.HttpError(500, "Internal Server Error"));
    }
});
exports.createNote = createNote;
// Delete a note
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
        next(new httpError_1.HttpError(400, "Invalid ID. Please provide a valid one"));
        return;
    }
    try {
        const data = yield note_model_1.ModelNote.findByIdAndDelete(req.params.id);
        if (data) {
            res
                .status(200)
                .send({ message: "Note deleted successfully", success: true, data });
            console.log(`${res.statusCode} ${req.method} ${req.path}`);
        }
        else {
            return next(new httpError_1.HttpError(404, "Note not found"));
        }
    }
    catch (error) {
        return next(new httpError_1.HttpError(500, "Internal Server Error"));
    }
});
exports.deleteNote = deleteNote;
//# sourceMappingURL=note.controller.js.map