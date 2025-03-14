import { Request, Response, NextFunction } from "express";

export const reqLogger = (req: Request, res: Response, next: NextFunction) => {
	console.log(`[${new Date().toUTCString()}] [${req.method}] ${req.path}`);
	next();
};
