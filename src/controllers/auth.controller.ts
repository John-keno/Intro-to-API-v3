import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { HttpError } from "../utils/httpError";
import { generateToken } from "../utils/helpers";

const { registerUser, loginUser, getUserByEmail } = new UserService();

export default class AuthController {
	async registerUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { name, email, password } = req.body;

			const user = await getUserByEmail(email);
			if (user !== null) {
				return next(new HttpError(400, "Account already exists"));
			}

			const data = await registerUser({ name, email, password });
			if (data) {
				res.status(201).send({
					success: true,
					message: `Account with email ${data.email} created successfully. Now you can login`,
				});
			} else {
				res.status(500).send({
					success: false,
					message: `Account with email ${email} creation failed`,
				});
			}
		} catch (error) {
			next(new HttpError(500, "Internal Server Error"));
		}
	}
	async loginUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			const user = await getUserByEmail(email);
			if (!user) {
				return next(new HttpError(401, "Invalid email or password"));
			}

			const data = await loginUser(password, user);
			if (!data) {
				return next(new HttpError(401, "Invalid email or password"));
			} else {
				const userData = { email: user.email, userId: user._id, name: user.name };

				const token = generateToken(userData);

				res.status(200).send({
					success: true,
					message: "Login successful",
					data: { email: user.email, token },
				});
			}
		} catch (error) {
			next(new HttpError(500, "Error logging in"));
		}
	}
}
