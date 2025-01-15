import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", cartController.getAll);
router.get("/:id", cartController.getById);
router.get("/:id/purchase", cartController.purchase);

export default router;

