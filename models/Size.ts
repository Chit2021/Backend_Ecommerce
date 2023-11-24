import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SizeSchema = new Schema({
  name: String,
});

export const Size = mongoose.model("Size", SizeSchema);