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
const note_service_1 = __importDefault(require("../services/note.service"));
const httpError_1 = require("../utils/httpError");
const mongoose_1 = __importDefault(require("mongoose"));
const { getAllNotes, getNotesById, createNote, deleteNoteById, getCategoryByName, updateNoteById, getNotesByCategory, } = new note_service_1.default();
class NoteController {
    // Get all notes
    getNotes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { limit, page } = req.query;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                const data = yield getAllNotes(parseInt(page) || 1, parseInt(limit) || 10, userId);
                res.status(200).send(Object.assign({ success: true }, data));
            }
            catch (error) {
                next(new httpError_1.HttpError(500, "Internal Server Error"));
            }
        });
    }
    // Get note by id
    getNotesById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
                next(new httpError_1.HttpError(400, "Invalid ID. Please provide a valid one"));
                return;
            }
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                const data = yield getNotesById(req.params.id, userId);
                if (data) {
                    res.status(200)
                        .send({ success: true, message: "Note fetched succesfully", data });
                }
                else {
                    next(new httpError_1.HttpError(404, "Note not found"));
                }
            }
            catch (error) {
                return next(new httpError_1.HttpError(500, "Internal Server Error"));
            }
        });
    }
    // Create a new note
    createNote(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { title, content, category } = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                let foundCategory = (yield getCategoryByName(category.name)).toJSON();
                const data = yield createNote({
                    title,
                    content,
                    category: foundCategory,
                    userId,
                });
                res
                    .status(201)
                    .send({ message: "Note created successfully", success: true, data });
            }
            catch (error) {
                return next(new httpError_1.HttpError(500, "Internal Server Error"));
            }
        });
    }
    // Delete a note
    deleteNote(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
                next(new httpError_1.HttpError(400, "Invalid ID. Please provide a valid one"));
                return;
            }
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                const data = yield deleteNoteById(req.params.id, userId);
                if (data) {
                    res.status(200)
                        .send({ success: true, message: "Note deleted successfully", data });
                }
                else {
                    return next(new httpError_1.HttpError(404, "Note not found"));
                }
            }
            catch (error) {
                return next(new httpError_1.HttpError(500, "Internal Server Error"));
            }
        });
    }
    // Update a note
    updateNoteById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
                next(new httpError_1.HttpError(400, "Invalid ID. Please provide a valid one"));
                return;
            }
            try {
                const { title, content, category } = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                let foundCategory = (yield getCategoryByName(category.name)).toJSON();
                const data = yield updateNoteById(req.params.id, userId, {
                    title,
                    content,
                    category: foundCategory,
                    userId,
                });
                if (data) {
                    res.status(200)
                        .send({ success: true, message: "Note updated successfully", data });
                }
                else {
                    return next(new httpError_1.HttpError(404, "Note not found"));
                }
            }
            catch (error) {
                return next(new httpError_1.HttpError(500, "Internal Server Error "));
            }
        });
    }
    // get Notes by categories
    getAllNotesByCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { page, limit } = req.query;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                const data = yield getNotesByCategory(req.params.categoryId, parseInt(page) || 1, parseInt(limit) || 10, userId);
                if (!data || data.total === 0) {
                    return next(new httpError_1.HttpError(404, "No Note in this category found"));
                }
                else {
                    res.status(200).send(Object.assign({ success: true, message: "Notes fetched Successfully" }, data));
                }
            }
            catch (error) {
                return next(new httpError_1.HttpError(500, "Internal Server Error"));
            }
        });
    }
    // Welcome message
    welcomeMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200)
                .send("Welcome to the Joekode Notes API version 2. This is a simple API to manage notes");
        });
    }
}
exports.default = NoteController;
