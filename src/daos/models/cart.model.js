import { Schema, Types, model } from "mongoose";

const collection = "carts"
const schema = new Schema({
    user_id: { type: Types.ObjectId, ref: "users", required: true },
    cart: { type: Array , default: [] },
    no_stock: { type: Array , default: [] },
})

export const CartModel = model(collection, schema)