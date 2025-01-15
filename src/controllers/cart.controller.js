import Controllers from "./controller.manager.js";
import { cartService } from "../services/cart.services.js";

class CartController extends Controllers {
    constructor() {
        super(cartService)
    }

    purchase = async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await this.service.purchase(id)
            res.json(response)
        } catch (error) {
            next(error);
        }
    }

}

export const cartController = new CartController();