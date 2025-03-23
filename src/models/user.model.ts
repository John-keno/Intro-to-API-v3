import { Schema, model } from "mongoose";
import { User } from "../utils/data";

const UserSchema: Schema = new Schema(
	{
		name:{
			type: String,
			required: true,
		},
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
