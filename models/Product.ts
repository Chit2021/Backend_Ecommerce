import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const ProductSchema = new Schema({
  id: ObjectId,
  name: String,
})

export default mongoose.model("Product", ProductSchema)

// import mongoose, { Document } from "mongoose";

// export interface Product extends Document {
//   name: string;
//   description: string;
//   price: number;
//   image: string;
// }

// const ProductSchema = new mongoose.Schema<Product>({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   image: { type: String, required: true },
// });

// export default mongoose.model<Product>("Product", ProductSchema);
