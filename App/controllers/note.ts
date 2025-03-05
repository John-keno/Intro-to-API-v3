import { ModelNote } from "../models/ModelNote";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";

export const getNotes = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const notes = await ModelNote.find();
		res.json(notes).status(200);
	} catch (error) {
		return next(new HttpError(500, "Unable to fetch notes"));
	}
};
