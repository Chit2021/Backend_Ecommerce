import mongoose, { ObjectId } from "mongoose"
import CategoryRepo from "../models/Category.js"
import { Category } from "../types/categories.js"

async function paginateCategories(pageNumber:number, pageSize:number) {
    const skip = (pageNumber - 1) * pageSize;
    const categories = await CategoryRepo.find().skip(skip).limit(pageSize).exec();
    return categories;
  }

async function findAll() {
    const categories = await CategoryRepo.find().exec()

    return categories
}

async function findOne(categoryId: string) {
    const id = new mongoose.Types.ObjectId(categoryId)
    const category = await CategoryRepo.findById(id)

    return category
}

async function createOne(category: Category) {
    const newCategory = new CategoryRepo(category)
    return await newCategory.save()
}

async function updateOne(categoryId: string, updatedCategory: Category) {
    const id = new mongoose.Types.ObjectId(categoryId);
    const category = await CategoryRepo.findById(id);
      
    if (!category) {
        return undefined
    }
    console.log('category:',category, 'updatedCategory:', updatedCategory)
      // Update category fields
    category.name = updatedCategory.name
    await category.save();
    return category;
}

async function deleteOne(categoryId: string) {
    const id = new mongoose.Types.ObjectId(categoryId);
    const category = await CategoryRepo.findById(id);
  
    if (!category) {
        return undefined
    }
  
    const deletedCategory = await CategoryRepo.deleteOne({ _id: id });
  
    if (deletedCategory.deletedCount === 0) {
        return undefined
    }
      
    return category;
}

export default {
    paginateCategories,
    findOne,
    findAll,
    createOne,
    updateOne,
    deleteOne
}