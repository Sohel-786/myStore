import { Router } from "express";
import {
  AddProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.controller.js";
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

productRoutes
  .route("/:productId")
  .put(
    IsLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    updateProduct
  );

export default productRoutes;
