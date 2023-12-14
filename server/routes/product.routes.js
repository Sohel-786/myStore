import { Router } from "express";
import { AddProduct, getAllProducts } from "../controllers/product.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { IsLoggedIn, authorizedRoles } from "../middlewares/auth.middleware.js";
const productRoutes = Router();

productRoutes
  .route("/")
  .get(getAllProducts)
  .post(
    IsLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    AddProduct
  );

export default productRoutes;