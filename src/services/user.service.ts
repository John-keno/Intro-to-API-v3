import UserModel from "../models/user.model";
import { AuthCredentials, RegisterData } from "../utils/data";
import { decryptPassword, encryptPassword } from "../utils/helpers";

export class UserService {
	async registerUser(data: RegisterData) {
		const { name, email, password } = data;
		const encryptedPassword = await encryptPassword(password);
		return await UserModel.create({ name, email, password: encryptedPassword });
	}
	async loginUser(password: string, user: AuthCredentials) {
		const isPasswordMatch = await decryptPassword(password, user.password);
		return isPasswordMatch;
	}

	async getUserByEmail(email: string) {
		return await UserModel.findOne({ email });
	}
}
