import { z } from "zod";
import { SizeSchema } from "../schemas/sizeSchema.js";

export type TSizeSchema = z.infer<typeof SizeSchema>;

export type TSize = TSizeSchema & { id: number };