import Controllers from "./controller.manager.js";
import { userService } from '../services/user.services.js';
import UserResDTO from "../daos/dto/user/user.res.dto.js";
import { transporter } from "../services/email.service.js";
import { templateHtml } from "../services/template.js";
import { userRepository } from "../daos/repository/user.repository.js";
import 'dotenv/config';

class UserController extends Controllers {
  constructor(){
    super(userService)
  }

  register = async (req, res, next) => {
    try {
      const user = await this.service.register(req.body);

      // envío de email de bienvenida
      const user_email = user.email
      const user_name = user.first_name

      const gmailConfig = {
          from: process.env.EMAIL,
          to: user_email,
          subject: 'ecommerce: registro de usuario completo!',
          html: templateHtml(user_name),
      }
      await transporter.sendMail(gmailConfig);

      res.json(user);
    } catch (error) {
      next(error);
    }
  };
  
  login = async (req, res, next) => {
    try {
      const token = await this.service.login(req.body);
      res
        .cookie('token', token, { httpOnly: true })
        .json({ message: 'Login OK', token });
    } catch (error) {
      next(error);
    }
  };
  
  privateData = (req, res, next) => {
    try {
      if (!req.user)
        throw new Error("No se puede acceder a los datos del usuario");

      // aplico el DTO del user en la respuesta para evitar mostrar información sensible (ejemplo=password)
      let user = req.user;
      user = userRepository.getPrivateData(user);
      res.json({
        user
      })
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController();