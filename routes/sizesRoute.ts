import express from "express";

// controllers
import { createOneSize, findAllSize } from "../controllers/sizesController.js";

// middlewares
import { validateSchema } from "../middlewares/schemaValidate.js";

// schema
import { SizeSchema } from "../schemas/sizeSchema.js";

const router = express.Router();

// routes
router.get("/", findAllSize);
router.post("/", validateSchema(SizeSchema), createOneSize);

export default router;