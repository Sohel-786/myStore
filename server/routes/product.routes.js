import { Router } from "express";
import { AddProduct, getAllProducts } from "../controllers/product.controller";
import upload from "../middlewares/multer.middleware";
import { IsLoggedIn, authorizedRoles } from "../middlewares/auth.middleware";
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