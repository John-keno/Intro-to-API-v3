import UserModel from "../models/user.model";
import { AuthCredentials } from "../utils/data";
import { decryptPassword, encryptPassword } from "../utils/helpers";

export class UserService {
	async registerUser(data: AuthCredentials) {
		const { email, password } = data;
		const encryptedPassword = await encryptPassword(password);
		return await UserModel.create({ email, password: encryptedPassword });
	}
	async loginUser(password: string, user: AuthCredentials) {
		const isPasswordMatch = await decryptPassword(password, user.password);
		return isPasswordMatch;
	}

	async getUserByEmail(email: string) {
		return await UserModel.findOne({ email });
	}
}
