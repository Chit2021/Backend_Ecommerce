import { NextFunction, Request, Response } from "express";
import categoriesService from "../services/categoriesService.js";
import { ApiError } from "../errors/ApiError.js";
import { ObjectId } from "mongoose";

export async function getOffset(req:Request, res: Response)  {
  try {
    const pageNumber = Number(req.query.pageNumber) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const categories = await categoriesService.paginateCategories(pageNumber, pageSize);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function findAllCategory(_: Request, res: Response) {
  const categories = await categoriesService.findAll();

  res.json({ categories });
}

export async function findOneCategory(req: Request,res: Response,next: NextFunction) {
  const categoryId = req.params.categoryId;
  const category = await categoriesService.findOne(categoryId);

  if (!category) {
    next(ApiError.resourceNotFound("Category not found."));
    return;
  }
  res.json({ category });
}

export async function createOneCategory(req: Request, res: Response) {
  const newCategory = req.body;
  const category = await categoriesService.createOne(newCategory);

  res.status(201).json({ category });
}

export async function updateCategory(req: Request, res: Response) {
  const categoryId = req.params.id;
  const  name  = req.body;
  if (name) {
    const category = await categoriesService.updateOne(categoryId, name);
    if (category) {
      res.json({ message: `${JSON.stringify(category)} has been updated` });
    } else {
      res.status(404).json({ code: 404, error: "Category not found" });
    }
  } else {
    res.status(400).json({ code: 404, error: "Details are Required" });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  const categoryId = req.params.id;
  const category = await categoriesService.deleteOne(categoryId);

  if (category) {
    res.json({
      message: `Category ${categoryId} has been deleted successfully`,
    });
  } else {
    res.status(404).json({ code: 404, error: "Category not found" });
  }
}



export default {
  findOneCategory,
  findAllCategory,
  createOneCategory,
  updateCategory,
  deleteCategory
};