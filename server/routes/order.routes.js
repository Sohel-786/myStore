import { Router } from "express";
import { IsLoggedIn, authorizedRoles } from "../middlewares/auth.middleware.js";
import { confirmOrder, deleteOrder, getAllOrders, getAllOrdersAdmin } from "../controllers/order.controller.js";
const orderRoutes = Router();

orderRoutes
    .route("/:orderId")
    .put(IsLoggedIn, confirmOrder)
    .delete(IsLoggedIn, deleteOrder);

orderRoutes.route("/getAllOrders").get(IsLoggedIn, getAllOrders);

orderRoutes.route("/getOrdersforAdmin").get(IsLoggedIn, authorizedRoles("ADMIN"), getAllOrdersAdmin);

export default orderRoutes;
