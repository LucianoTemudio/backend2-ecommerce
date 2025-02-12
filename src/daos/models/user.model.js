import { Schema, Types, model } from "mongoose";

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    default: ' ',
  },
  role: {
    type: String,
    default: 'user',
  },
  cart: {
    type: String,
    ref: "carts",
    default: '',
  }
});

export const UserModel = model("users", UserSchema);