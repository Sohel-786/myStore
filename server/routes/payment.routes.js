import { Router } from "express";
import { IsLoggedIn } from "../middlewares/auth.middleware.js";
import { createCheckoutSession } from "../controllers/payment.controller.js";

const paymentRoutes = Router();

paymentRoutes
.route('/create-checkout-session')
.post(IsLoggedIn, createCheckoutSession);

export default paymentRoutes;