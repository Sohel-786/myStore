import { Router } from "express";
import { addAddress, getUser, login, logout, register } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { IsLoggedIn } from "../middlewares/auth.middleware.js";
const userRoutes = Router();

userRoutes.post('/register', upload.single('avatar') ,register);

userRoutes.post('/login', login);

userRoutes.get('/logout', IsLoggedIn, logout);

userRoutes.get('/me', IsLoggedIn, getUser);

userRoutes.post('/add-address', IsLoggedIn, addAddress);

export default userRoutes;