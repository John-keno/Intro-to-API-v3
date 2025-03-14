import { HttpError } from "../utils/httpError";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodError, ZodType } from "zod";

export const RequestValidator = <T>(schema: ZodType<T>): RequestHandler => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			req.body = schema.parse(req.body);
			next();
		} catch (err) {
			if (err instanceof ZodError) {
				const errors = err.errors.map((err) => ({
					field: err.path.join("."),
					message: err.message,
				}));
				res.status(400).send({
					success: false,
					errors,
				});
			}
			next(err);
		}
	};
};
