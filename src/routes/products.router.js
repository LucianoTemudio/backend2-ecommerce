import { Router } from "express";
import { productController } from "../controllers/product.controller.js";
import { passportCall } from "../passport/passportCall.js";
import { roleAuth } from "../middlewares/roleAuth.js";

const router = Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getById);

// las siguientes rutas incluyen middleware "roleAuth" que valida el rol del usuario ya que deben ser Admin para crear/actualizar/eliminar productos
router.post("/", [passportCall('current'), roleAuth('admin')], productController.create);
router.put("/:id", [passportCall('current'), roleAuth('admin')], productController.update);
router.delete("/:id", [passportCall('current'), roleAuth('admin')],productController.delete);


// sólo el rol usuario puede agregar items al carrito
router.get("/:id/buy", [passportCall('current'), roleAuth('user')], productController.addToCart)

export default router;