import Services from "./service.manager.js";
import { cartDao } from "../daos/mongodb/cart.dao.js";
import { userService } from "./user.services.js";
import { ticketService } from "./ticket.services.js";
import "dotenv/config";

class CartService extends Services {
  constructor() {
    super(cartDao);
  }

  create = async (cart) => {
    try {
      const newCart = await this.dao.create(cart);
      return newCart;
    } catch (error) {
      throw error;
    }
  };

  purchase = async (id) => {
    try {

      // busco el carrito con el id y luego creo dos arrays (una con los productos con stock y otra sin stock)
      const cart = await this.dao.getById(id)
      const with_stock = cart.cart
      const without_stock = cart.no_stock

      // creación de un nuevo array con los precios de los productos agregados al carrito
      const with_stock_prices = with_stock.map(get_totals)

      function get_totals(item) {
        return item.prod_price;
      }

      // suma del total de los precios de los productos agregados al carrito (para actualizar en el ticket)
      let total_amount = 0;
      for (let i = 0; i < with_stock_prices.length; i++ ) {
        total_amount += with_stock_prices[i];
      }

      // email del usuario (para actualizar en el ticket)
      const user_id = cart.user_id
      const user_data = await userService.getById(user_id)
      const user_email = user_data.email

      // create ticket
      const ticket = await ticketService.create({
        "amount": total_amount,
        "purchaser": user_email,
        "purchased_items": with_stock,
        "items_without_stock": without_stock,
      })

      // clear all items in the cart
      await this.dao.update(id,{
        "cart": [],
        "no_stock": [],
      })

      return ticket

    } catch (error) {
      throw new Error(error);
    }
  }

  };

export const cartService = new CartService();