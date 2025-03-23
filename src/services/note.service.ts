import { Category, Note } from "../utils/data";
import { ModelCategory, ModelNote } from "../models/note.model";
import { generateId, paginate } from "../utils/helpers";

export default class NoteService {
	async getAllNotes(pageNumber: number, limitNumber: number, userId: string) {
		return await paginate(ModelNote, pageNumber, limitNumber, { userId });
	}

	async getNotesById(id: string, userId: string) {
		console.log(id, userId);
		return await ModelNote.findOne({_id: id, userId});
	}

	async createNote(data: Partial<Note>) {
		return await ModelNote.create(data);
	}

	async deleteNoteById(id: string, userId: string) {
		return await ModelNote.findOneAndDelete({_id: id, userId});
	}

	async updateNoteById(id: string, userId: string, data: Partial<Note>) {
		return await ModelNote.findOneAndUpdate({_id: id, userId}, data, {
			new: true,
			runValidators: true,
		});
	}

	async getNotesByCategory(
		categoryId: string,
		pageNumber: number,
		limitNumber: number,
		userId: string
	) {
		return await paginate(ModelNote, pageNumber, limitNumber, {
			"category.id": categoryId,
			userId,
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
