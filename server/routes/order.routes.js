import { Router } from "express";
import { IsLoggedIn } from "../middlewares/auth.middleware";
import { createOrder } from "../controllers/order.controller";
const orderRoutes = Router();

orderRoutes
    .route('/createOrder')
    .post(IsLoggedIn, createOrder);

export default orderRoutes;