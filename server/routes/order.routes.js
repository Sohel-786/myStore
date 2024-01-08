import { Router } from "express";
import { IsLoggedIn } from "../middlewares/auth.middleware.js";
import { createOrder } from "../controllers/order.controller.js";
const orderRoutes = Router();

orderRoutes
    .route('/createOrder')
    .post(IsLoggedIn, createOrder);

export default orderRoutes;