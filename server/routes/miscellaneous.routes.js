import { Router } from "express";
import { IsLoggedIn } from "../middlewares/auth.middleware.js";
import { getCountriesStates } from "../controllers/miscellaneous.controller.js";
const router = Router();

router.route("/").get(IsLoggedIn, getCountriesStates);

export default router;
