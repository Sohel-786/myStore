import { Router } from "express";
import { IsLoggedIn } from "../middlewares/auth.middleware";
import { createCheckoutSession } from "../controllers/payment.controller";

const paymentRoutes = Router();

paymentRoutes
.route('/create-checkout-session')
.post(IsLoggedIn, createCheckoutSession);

export default paymentRoutes;