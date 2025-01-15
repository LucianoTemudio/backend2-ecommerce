import Services from "./service.manager.js";
import { productDao } from "../daos/mongodb/product.dao.js";
import { cartService } from "./cart.services.js";
import { userController } from "../controllers/user.controller.js";

class ProductService extends Services {
    constructor() {
        super(productDao)
    }

    addToCart = async (id, cart_id) => {
        try {
        let prod_selected = await this.dao.getById(id);
        prod_selected = {
            "prod_id": prod_selected._id,
            "prod_name": prod_selected.name,
            "prod_price": prod_selected.price,
            "prod_quantity": 1
        }

        if (!prod_selected) throw new Error("Error getById");

        const current_cart = await cartService.getById(cart_id)
        
        // valida si hay stock

        let current_prod_stock = await this.dao.getById(id)
        current_prod_stock = current_prod_stock.stock
        
        if (parseInt(current_prod_stock,10) >0) {
            const current_cart_array = current_cart.cart
            const new_cart_array = current_cart_array.concat([prod_selected])  
            const updated_cart = await cartService.update(cart_id,{ "cart": new_cart_array })
    
            //actualizo la info del producto para reducir el stock en 1 unidad
            const updated_prod_stock = parseInt(current_prod_stock, 10) -1
            await this.dao.update(id, {"stock": parseInt(updated_prod_stock, 10) });
            return updated_cart;
        }

        if (parseInt(current_prod_stock,10) <1) {
            const current_no_stock_array = current_cart.no_stock
            const new_no_stock_array = current_no_stock_array.concat([prod_selected])
            const updated_cart = await cartService.update(cart_id,{ "no_stock": new_no_stock_array })
            return updated_cart;
        }



        
        } catch (error) {
            throw error;
        }
    }
}

export const productService = new ProductService();