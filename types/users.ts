// export type Role = "admin" | "user";

// export interface User {
//     id: number;
//     name: string;
//     email: string;
//     password: string;
//     role: Role;
// }

import { z } from "zod"
import { userSchema } from "../schemas/userSchema.js"
import { loginRequestSchema } from "../schemas/loginRequestSchema.js"

// to get the type FROM the ZOD validation
type UserDTO = z.infer<typeof userSchema>

// we are adding an ID because, when we validate the data we don't care about the id. why?? because IDs are handled by the database
export type User = UserDTO & { id: number }
//export type LoginRequest = z.infer<typeof loginRequestSchema>


// import { z } from "zod";
// import { userDataSchema } from "../schemas/userSchema.js";
// import { loginRequestSchema } from "../schemas/loginRequestSchema.js";

// export type User = z.infer<typeof userDataSchema>

// export type LoginRequest = z.infer<typeof loginRequestSchema>