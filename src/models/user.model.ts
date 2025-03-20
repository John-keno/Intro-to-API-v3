import { Schema, model } from "mongoose";
import { User } from "../utils/data";

const UserSchema: Schema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default model<User>("Users", UserSchema);
