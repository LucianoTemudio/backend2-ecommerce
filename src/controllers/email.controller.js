import { text } from "express";
import { transporter } from "../services/email.service.js";
import { templateHtml } from "../services/template.js";
import 'dotenv/config';

export const sendGmail = async(req, res) => {
    try {
        const { new_user } = req.body;
        const gmailConfig = {
            from: process.env.EMAIL,
            to: new_user,
            subject: 'ecommerce: registro de usuario completo!',
            text: "Bienvenido!!",
        }
        const response = await transporter.sendMail(gmailConfig);
        res.json(response)
    } catch (error) {
        res.send(error)
    }
}