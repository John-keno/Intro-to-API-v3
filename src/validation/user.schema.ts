import z from "zod";


export const RegisterSchema = z.object({
    email: z.string().email().min(3, "field is required"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
}).strict();

export const LoginSchema = z.object({
    email: z.string().email("email not valid").min(3, "field is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
}).strict();