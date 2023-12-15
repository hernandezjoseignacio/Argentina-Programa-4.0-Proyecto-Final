import express from "express";
import { settingDotEnvDB } from "./config/dotenv.js";
import cors from "cors";
import morgan from "morgan";
import { connectMongo } from "./database/db.js";
import authroutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import cookieParser from "cookie-parser";
// const fileUpload = require('express-fileupload');

const app = express();
connectMongo();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173", //Variable, segun lo que aparezca en consola al levantar el servidor de Backend
    credentials: true,
  })
);
app.use(authroutes);
app.use(postRoutes);

// app.use(express.urlencoded({ extended: false}));
// app.use(fileUpload({createParentPath: true})); // {createParentPath: true} es para que cree el directorio si no existe
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views")); //_dirname es el directorio principal

// Arranca la aplicacion y renderiza el index.ejs
// app.get("/", (req, res)=>{
//   res.render("index");
// })

// Metodo POST para subir archivos
// app.post("/upload", (req,res)=>{
//   let file = req.files.archivo;
//   let uploadPath = `${__dirname}/Archivos/${file.name}`;
//   console.log(req.files);
//   if(!req.files || Object.keys(req.files).length === 0 ){
//       return res.status(400).send("¡Error: No se subieron los archivos!");
//   };
//   file.mv(uploadPath, (err)=>{
//       if(err) return res.status(500).send(err);
//       res.send("¡Archivo/s subido/s con exito!")
//   })

// })




const PORT = settingDotEnvDB().port || 5000;

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
