import MongoDao from "./mongo.dao.js";
import { ProductModel } from "../models/product.model.js";

class ProductDao extends MongoDao {
    constructor() {
        super(ProductModel)
    }
}

export const productDao = new ProductDao();