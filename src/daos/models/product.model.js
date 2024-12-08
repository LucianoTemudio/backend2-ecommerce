import { Schema, model } from "mongoose"; 
import mongoosePaginator from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema({
    title: { type: String, required: true },
    photo: {
        type: String,
        default: "../../../../public/assets/product.jpg"
    },
    category: { type: String, required: true },
    price: { type: Number, default: 1 },
    stock: { type: Number, required: true }
});

schema.plugin(mongoosePaginator)
const Product = model(collection, schema);
export default Product;