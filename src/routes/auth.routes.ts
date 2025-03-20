import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { RequestValidator } from "../middlewares/validators.middleware";
import { LoginSchema, RegisterSchema } from "../validation/user.schema";

const { registerUser, loginUser } = new AuthController();

export default function (router: Router) {
    router.get("/v2/api/auth/register",RequestValidator(RegisterSchema), registerUser);
    router.get("/v2/api/auth/login", RequestValidator(LoginSchema), loginUser);
}