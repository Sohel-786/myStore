import { Router } from "express";
import { IsLoggedIn } from "../middlewares/auth.middleware.js";
import { confirmOrder, deleteOrder, getAllOrders } from "../controllers/order.controller.js";
const orderRoutes = Router();

orderRoutes
    .route("/:orderId")
    .put(IsLoggedIn, confirmOrder)
    .delete(IsLoggedIn, deleteOrder);

orderRoutes.route("/getAllOrders").get(IsLoggedIn, getAllOrders);

export default orderRoutes;
