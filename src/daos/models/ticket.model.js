import { Schema, Types, model } from "mongoose";
import crypto from "crypto";

const collection = "tickets"
const TicketSchema = new Schema({
    code: {type: String, default: crypto.randomBytes(12).toString("hex"), required: true,},
    purchase_datetime: {type: Date, default: Date.now, required: true},
    amount: {type: Number, required: true},
    purchaser: {type: String, required: true},
    purchased_items: {type: Array, default: []},
    items_without_stock: {type: Array, default: []},
})

export const TicketModel = model(collection, TicketSchema);