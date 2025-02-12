import { createHash, isValidPassword } from "../utils.js";
import Services from "./service.manager.js";
import { userDao } from "../daos/mongodb/user.dao.js";
import { cartDao } from "../daos/mongodb/cart.dao.js";
import { cartService } from "./cart.services.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

class UserService extends Services {
  constructor() {
    super(userDao);
  }

  generateToken = (user) => {
    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      role: user.role,
      cart_id: user.cart,
    };

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "20m" });
  };

  getUserByEmail = async (email) => {
    try {
      return await this.dao.getByEmail(email);
    } catch (error) {
      throw new Error(error);
    }
  };

  register = async (user) => {
    try {
      const { email, password } = user;
      const existUser = await this.getUserByEmail(email);
      if (existUser) throw new Error("User already exists"); 
      
      let newUser = await this.dao.register({
        ...user,
        password: createHash(password),
      });
      const user_id = newUser._id;
      const cart_generator = await cartService.create({user_id});
      newUser = await this.dao.update(user_id,{"cart":cart_generator._id})
  
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  login = async (user) => {
    try {
      const { email, password } = user;
      const userExist = await this.getUserByEmail(email);
      if (!userExist) throw new Error("User not found");
      const passValid = isValidPassword(password, userExist);
      if (!passValid) throw new Error("incorrect credentials");
      //const response = this.generateToken(userExist);
      //return new UserResDTO(response);
      return this.generateToken(userExist);
    } catch (error) {
      throw error;
    }
  };
}

export const userService = new UserService();