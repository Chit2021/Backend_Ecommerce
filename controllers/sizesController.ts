import { NextFunction, Request, Response } from "express";

// services
import SizeService from "../services/sizeService.js";

// error builder
import { ApiError } from "../errors/ApiError.js";

export async function findAllSize(
  _: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sizes = await SizeService.findAll();
    res.json(sizes);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function createOneSize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newSize = req.body;
    const size = await SizeService.createOne(newSize);
    res.status(201).json(size);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}