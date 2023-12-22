import { Router } from "express";
import { addAddress, deleteAddress, getUser, login, logout, register, updateAddress } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { IsLoggedIn } from "../middlewares/auth.middleware.js";
const userRoutes = Router();

userRoutes.post('/register', upload.single('avatar') ,register);

userRoutes.post('/login', login);

userRoutes.get('/logout', IsLoggedIn, logout);

userRoutes.get('/me', IsLoggedIn, getUser);

userRoutes.post('/add-address', IsLoggedIn, addAddress);

userRoutes.put('/update-address', IsLoggedIn, updateAddress);

userRoutes.delete('/delete-address', IsLoggedIn, deleteAddress);

export default userRoutes;