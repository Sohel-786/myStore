import { Router } from "express";
import {
  addAddress,
  addToBag,
  changePassword,
  deleteAddress,
  forgotPassword,
  getBagProducts,
  getUser,
  login,
  logout,
  register,
  removeFromBag,
  resetPassword,
  updateAddress,
  updateProfile,
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { IsLoggedIn } from "../middlewares/auth.middleware.js";
const userRoutes = Router();

userRoutes.post("/register", upload.single("avatar"), register);

userRoutes.post("/login", login);

userRoutes.get("/logout", IsLoggedIn, logout);

userRoutes.get("/me", IsLoggedIn, getUser);

userRoutes.put('/update', IsLoggedIn, upload.single("avatar"), updateProfile);

userRoutes.post("/reset", forgotPassword);

userRoutes.put("/reset/:resetToken", resetPassword);

userRoutes.put("/changepassword", IsLoggedIn, changePassword);

userRoutes
  .route('/bag/:productId')
  .post(IsLoggedIn, addToBag)
  .delete(IsLoggedIn, removeFromBag)

userRoutes
  .route('/wishlist/:productId')
  .post(IsLoggedIn, addToWishlist)
  .delete(IsLoggedIn, removeFromWishlist)

userRoutes.post('/getBag', IsLoggedIn, getBagProducts);

userRoutes
  .route("/address")
  .post(IsLoggedIn, addAddress)
  .put(IsLoggedIn, updateAddress);

userRoutes.delete("/delete-address/:addressId", IsLoggedIn, deleteAddress);

export default userRoutes;
