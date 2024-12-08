import { CartModel } from "../models/cart.model.js";
import MongoDao from "./mongo.dao.js";

class CartDaoMongo extends MongoDao {
  constructor() {
    super(CartModel)
  }

  async create(cart) {
    try {
      return await this.model.create(cart);
    } catch (error) {
      throw new Error(error);
    }
  }

}

export const cartDao = new CartDaoMongo();