import Post from "../models/post.model.js";
import { findUser } from "./auth.controllers.js"

//TODO: GET TODAS LAS Publicaciones
export const getAllPosts = async (req, res) => {
  try {
    //primero mostramos el find sin atributos y despues con atributos
    //para cuando agregamos la logica para cada usuario
    //para ver toda la información el populate
    const allPosts = await Post.find({ user: req.user.id }).populate("user"); //con esto mostramos toda la info

    res.status(200).json(allPosts);
  } catch (error) {
    return res.status(400).json({ message: "Error al buscar todas las publicaciones", error });
  }
};

//TODO:-------------------------------------------------------BIEN
export const getAllAllPosts = async (req, res) => {
  try {
    //primero mostramos el find sin atributos y despues con atributos
    //para cuando agregamos la logica para cada usuario
    //para ver toda la información el populate
    const allPosts = await Post.find().populate("user"); //con esto mostramos toda la info

    res.status(200).json(allPosts);
  } catch (error) {
    return res.status(400).json({ message: "Error al buscar todas las publicaciones", error });
  }
};
//TODO:-----------------------------------------------------------------

//TODO: GET Publicacion BY ID
export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const postFound = await Post.findById(id);

    if (!postFound)
      return res.status(404).json({ message: "No se encontró la publicacion" });
    res.status(200).json(postFound);
  } catch (error) {
    return res.status(400).json({ message: "Error al buscar la publicacion por Id", error });
  }
};

//TODO: POST CREAR Publicacion
//TODO:----------------------------------------------------------------MODIFICADO: BIEN  
export const createPost = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const userName = await findUser(req.user.id)
    const newPost = new Post({ title, description, date, user: req.user.id, userName: userName.username /*para cuando agregamos la logica para cada usuario*/ });

    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    return res.status(400).json({ message: "Error al crear la publicacion", error });
  }
};

//TODO: PUT ACTUALIZAR Publicacion
export const updatePost = async (req, res) => {
  try {
    const aux = await Post.findById(req.params.id)
    // console.log(aux.user._id.toString()!==req.user.id)
    if (aux.user._id.toString() !== req.user.id) return res.status(404).json({ message: "No se puede editar esta Publicacion porque no es de su autoria" });

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("user");

    if (!updatePost)
      return res.status(404).json({ message: "Publicacion no encontrada" });

    res.status(200).json(updatedPost);
  } catch (error) { }
};

//TODO: DELETE ELIMINAR Publicacion
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const aux = await Post.findById(req.params.id)
    // console.log(aux.user._id.toString()!==req.user.id)
    if (aux.user._id.toString() !== req.user.id) return res.status(404).json({ message: "No se puede eliminar esta Publicacion porque no es de su autoria" });

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost)
      return res.status(404).json({ message: "No se encontró la publicacion para eliminar" });
    res.status(200).json({ message: "Publicacion eliminada" });
  } catch (error) {
    return res.status(400).json({ message: "Error al intentar eliminar la publicacion", error });
  }
};
