import { z } from "zod";
export const userSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    }),
    email: z.string({
        required_error: "Email is required",
    }),
    password: z.string({
        required_error: "Password must be at least 5 characters long",
    }),
    // avatar: z.string().url({
    //   message: "Avatar must be a valid URL if provided",
    // }),
    // role: z.enum(['ADMIN', 'USER']).refine((value) => value !== undefined, {
    //   message: "Role must be 'USER' or 'admin'",
    // }),
});
export const requestSchema = z.object({
    body: userSchema,
});
