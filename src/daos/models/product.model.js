import { Schema, model } from "mongoose";

const collection = "products";
const schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true},
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: false }
});

export const ProductModel = model(collection, schema);