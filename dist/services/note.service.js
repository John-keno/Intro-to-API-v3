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
Object.defineProperty(exports, "__esModule", { value: true });
const note_model_1 = require("../models/note.model");
const helpers_1 = require("../utils/helpers");
class NoteService {
    getAllNotes(pageNumber, limitNumber, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, helpers_1.paginate)(note_model_1.ModelNote, pageNumber, limitNumber, { userId });
        });
    }
    getNotesById(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id, userId);
            return yield note_model_1.ModelNote.findOne({ _id: id, userId });
        });
    }
    createNote(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield note_model_1.ModelNote.create(data);
        });
    }
    deleteNoteById(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield note_model_1.ModelNote.findOneAndDelete({ _id: id, userId });
        });
    }
    updateNoteById(id, userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield note_model_1.ModelNote.findOneAndUpdate({ _id: id, userId }, data, {
                new: true,
                runValidators: true,
            });
        });
    }
    getNotesByCategory(categoryId, pageNumber, limitNumber, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, helpers_1.paginate)(note_model_1.ModelNote, pageNumber, limitNumber, {
                "category.id": categoryId,
                userId,
            });
        });
    }
    getCategoryByName(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            const catNameToLowerCase = categoryName.toLowerCase();
            let category = yield note_model_1.ModelCategory.findOne({
                name: catNameToLowerCase,
            });
            if (!category) {
                const newCategoryId = (0, helpers_1.generateId)();
                const newCategory = {
                    id: newCategoryId,
                    name: catNameToLowerCase,
                };
                return (category = yield note_model_1.ModelCategory.create(newCategory));
            }
            else {
                return category;
            }
        });
    }
}
exports.default = NoteService;
