import { Router } from "express";
import {
  addAddress,
  changePassword,
  deleteAddress,
  forgotPassword,
  getUser,
  login,
  logout,
  register,
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

userRoutes.post("/reset/:resetToken", resetPassword);

userRoutes.post("/changepassword", IsLoggedIn, changePassword);

userRoutes
  .route("/address")
  .post(IsLoggedIn, addAddress)
  .put(IsLoggedIn, updateAddress);

userRoutes.delete("/delete-address/:addressId", IsLoggedIn, deleteAddress);

export default userRoutes;
