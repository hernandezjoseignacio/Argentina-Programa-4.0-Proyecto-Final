import { Router } from "express";
import { login, logout, profile, register, verifyToken } from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
import {  validateRegister, validateLogin, handleErrorValidations } from "../middlewares/validateAuth.js";

const router = Router();

//Ruta para el registro de usuario
router.post("/register", validateRegister, handleErrorValidations, register);

//Ruta para el logueo del usuario
router.post("/login", validateLogin, handleErrorValidations, login);

//Ruta para el desloqueo del usuario
router.post("/logout", logout);

//Pedidos desde el Frontend sobre verificacion del Token
router.get("/verifyToken", verifyToken);

//Para crear/editar el perfil del usuario
router.get("/profile", authRequired, profile);



export default router;
