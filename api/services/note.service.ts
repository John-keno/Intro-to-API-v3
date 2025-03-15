import { Category, Note } from "utils/data";
import { ModelCategory, ModelNote } from "../models/note.model";
import { generateId, paginate } from "../utils/helpers";

export default class NoteService {
	async getAllNotes(pageNumber: number, limitNumber: number) {
		return await paginate(ModelNote, pageNumber, limitNumber);
	}

	async getNotesById(id: string) {
		return await ModelNote.findById(id);
	}

	async createNote(data: Partial<Note>) {
		return await ModelNote.create(data);
	}

	async deleteNoteById(id: string) {
		return await ModelNote.findByIdAndDelete(id);
	}

	async updateNoteById(id: string, data: Partial<Note>) {
		return await ModelNote.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		});
	}

	async getNotesByCategory(
		categoryId: string,
		pageNumber: number,
		limitNumber: number
	) {
		return await paginate(ModelNote, pageNumber, limitNumber, {
			"category.id": categoryId,
		});
	}

	async getCategoryByName(categoryName: string) {
		const catNameToLowerCase = categoryName.toLowerCase();
		let category = await ModelCategory.findOne({
			name: catNameToLowerCase,
		});
		if (!category) {
			const newCategoryId = generateId();
			const newCategory: Category = {
				id: newCategoryId,
				name: catNameToLowerCase,
			};
			return (category = await ModelCategory.create(newCategory));
		} else {
			return category;
		}
	}
}
