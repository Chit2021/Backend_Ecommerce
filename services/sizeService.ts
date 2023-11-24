import mongoose from "mongoose";

// types
import { TSize } from "../types/size.js";

// model
import  { Size } from "../models/Size.js";

async function findAll() {
  return await Size.find().lean().exec();
}

async function createOne(size: TSize) {
  const newSize = new Size(size);
  return await newSize.save();
}

export default {
  findAll,
  createOne,
};