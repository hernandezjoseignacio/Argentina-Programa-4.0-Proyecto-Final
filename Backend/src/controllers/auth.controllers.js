import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config/dotenv.js";
import { createAccessToken } from "../middlewares/jwt.validation.js";

//---Registro de usuario---------------------------------------------
export const register = async (req, res) => {
  const { username, email, password, img } = req.body;

  //validación del usuario
  const foundUser = await User.findOne({ email });
  if (foundUser) return res.status(400).json(["El Email ya está en uso"]);
  try {
    //Encriptar constraseña (El numero indica las vueltas que el encriptador dará para generar la contraseña encriptada)
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ email, username, password: passwordHash, img });

    //Guardamos el registro del usuario
    const savedUser = await newUser.save();
    // res.status(200).json(savedUser);

    //---Para crear token - modo 1---------------------------
    // jwt.sign(
    //   { id: savedUser._id },
    //   "secret123",
    //   { expiresIn: "1h" },
    //   (err, token) => {
    //     if (err) console.log(err);
    //     res.cookie("token", token);
    //     res.json({ savedUser });
    //   }
    // );

    //---Para crear token - modo 2 (desde un archivo)---------------
    const token = await createAccessToken({ id: savedUser._id });
    res.cookie("token", token);
    res.json({
      message: "Usuario creado con éxito",
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error: error.message });
  }
};


//---Login de Usuario------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json(["Error en las credenciales."]);

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json(["Error en las credenciales"]);

    // Para crear token - modo 2 (desde un archivo)
    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      message: "Bienvenido!",
      username: userFound.username,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al loguearse", error: error.message });
  }
};

//---Logout de Usuario-------------------
export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).json({ message: "Hasta pronto!" });
};


export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });
    return res.json({
      message: "Perfil del usuario: ",
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      img: userFound.img,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
    // console.log(req.user);
  } catch (error) {
    res.status(400).json({ message: "Error en el perfil" });
  }
};

//TODO:-------------------------------------------------------MAL
export const findUser = async (id) => {
  try {
    const userFind = await User.findById(id) //con esto mostramos toda la info
    // console.log(userFind)
    return userFind
  } catch (error) {
    return res.status(400).json({ message: "Error al buscar el usuario", error });
  }
};
//TODO:-----------------------------------------------------------------------


const { secret } = SECRET_TOKEN();

//TODO: controller para verificación del token desde el backend
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  //Error si no hay Token
  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, secret, async (err, user) => {
    //Error si el Token no coincide con el del usuario
    if (err) return res.status(402).json({ message: "No autorizado" });

    const userFound = await User.findById(user.id);
    //Error si el usuario del Token no existe
    if (!userFound) return res.status(403).json({ message: "No autorizado" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      img: userFound.img
    });
  });
};
