import { Router } from "express";
import { login, logout, register } from "../controllers/user.controller";
import upload from "../middlewares/multer.middleware";
import { IsLoggedIn } from "../middlewares/auth.middleware";
const userRoutes = Router();

userRoutes.post('/register', upload.single('avatar') ,register);

userRoutes.post('/login', login);

userRoutes.get('/logout', IsLoggedIn, logout);
