import mongoose, { ObjectId } from "mongoose"
import ProductRepo from "../models/Product.js"
import { Product } from "../types/products.js"

async function findAll() {
  const products = await ProductRepo.find().exec()

  return products
}

async function findOne(productId: string) {
  const id = new mongoose.Types.ObjectId(productId)
  const product = await ProductRepo.findById(id)

  return product
}

async function createOne(product: Product) {
  const newProduct = new ProductRepo(product)
  return await newProduct.save()
}

async function updateOne(productId: string, updatedProduct: Product) {
  const product = await ProductRepo.findByIdAndUpdate(productId, updatedProduct, { new: true });
  return product;
}

async function deleteOne(productId: string) {
  const product = await ProductRepo.findByIdAndDelete(productId);
  return product;
}

export default {
  findOne,
  findAll,
  createOne,
  updateOne,
  deleteOne
}
