import { Router } from "express";
import { ticketController } from "../controllers/ticket.controller.js";

const router = Router();

router.get("/", ticketController.getAll)

export default router;