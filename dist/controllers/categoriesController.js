var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import categoriesService from "../services/categoriesService.js";
import { ApiError } from "../errors/ApiError.js";
export function getOffset(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pageNumber = Number(req.query.pageNumber) || 1;
            const pageSize = Number(req.query.pageSize) || 10;
            const categories = yield categoriesService.paginateCategories(pageNumber, pageSize);
            res.json(categories);
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
export function findAllCategory(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield categoriesService.findAll();
        res.json({ categories });
    });
}
export function findOneCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = req.params.categoryId;
        const category = yield categoriesService.findOne(categoryId);
        if (!category) {
            next(ApiError.resourceNotFound("Category not found."));
            return;
        }
        res.json({ category });
    });
}
export function createOneCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCategory = req.body;
        const category = yield categoriesService.createOne(newCategory);
        res.status(201).json({ category });
    });
}
export function updateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = req.params.id;
        const name = req.body;
        if (name) {
            const category = yield categoriesService.updateOne(categoryId, name);
            if (category) {
                res.json({ message: `${JSON.stringify(category)} has been updated` });
            }
            else {
                res.status(404).json({ code: 404, error: "Category not found" });
            }
        }
        else {
            res.status(400).json({ code: 404, error: "Details are Required" });
        }
    });
}
export function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = req.params.id;
        const category = yield categoriesService.deleteOne(categoryId);
        if (category) {
            res.json({
                message: `Category ${categoryId} has been deleted successfully`,
            });
        }
        else {
            res.status(404).json({ code: 404, error: "Category not found" });
        }
    });
}
export default {
    findOneCategory,
    findAllCategory,
    createOneCategory,
    updateCategory,
    deleteCategory
};
