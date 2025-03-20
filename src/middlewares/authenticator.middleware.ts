import { Response, NextFunction } from "express";
import { AuthData, AuthRequest } from "../utils/data";
import jwt from "jsonwebtoken";
import { HttpError } from "../utils/httpError";

export const verifyToken = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	const bearerHeader = req.headers["authorization"]?.split(" ");
	const bearerToken = bearerHeader && bearerHeader[1];

	if (!bearerToken) {
		return res.status(401).send({
			success: false,
			message: "unauthorized",
		});
	}
	try {
		const data = jwt.verify(
			bearerToken,
			process.env.JWT_SECRET || ""
		) as AuthData;
		req.user = data;
		next();
	} catch (error) {
		next(new HttpError(403, "Forbidden"));
	}
};
