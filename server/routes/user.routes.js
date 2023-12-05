import { Router } from "express";
import { register } from "../controllers/user.controller";
const userRoutes = Router();

userRoutes.post('/register', upload.single('avatar') ,register);