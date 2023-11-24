import express from "express";
import CategoryController from "../controllers/categoriesController.js";
import { validateCategory } from "../middlewares/categoryValidate.js";
const router = express.Router();
router.get("/", CategoryController.findAllCategory);
router.get("/:categoryId", CategoryController.findOneCategory);
router.post("/", validateCategory, CategoryController.createOneCategory);
router.use((req, res, next) => {
    console.log(" got here");
    res.on("finish", () => {
        console.log("Record created:", {
        /* log data */
        });
    });
    next();
});
export default router;
