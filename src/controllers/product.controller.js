import Controllers from "./controller.manager.js";
import { productService } from "../services/product.services.js";

class ProductController extends Controllers {
    constructor(){
        super(productService)
    }

    addToCart = async (req, res, next) => {
        try {
            const { id } = req.params;
            const cart_id = req.user.cart_id;
            const response = await this.service.addToCart(id, cart_id);
            res.json(response);
            
        } catch (error) {
            next(error);
        }
    }

}

export const productController = new ProductController();