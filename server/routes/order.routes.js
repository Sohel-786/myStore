import { Router } from "express";
import { IsLoggedIn } from "../middlewares/auth.middleware.js";
import { confirmOrder, getAllOrders } from "../controllers/order.controller.js";
const orderRoutes = Router();

orderRoutes.route("/:orderId").put(IsLoggedIn, confirmOrder);

orderRoutes.route("/getAllOrders").get(IsLoggedIn, getAllOrders);

export default orderRoutes;
