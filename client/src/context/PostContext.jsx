import { createContext, useContext, useState, useEffect } from "react";
import { createPostReq, getPostReq, getAllPostReq, deletePostReq, getPostByIdReq, updatePostReq } from "../api/post";

const PostContext = createContext();

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("Error en el contexto de las publicaciones");
  return context;
};

export const PostProvider = ({ children }) => {
  //generamos las publicaciones y sus estados para exportar en el provider
  const [post, setPost] = useState([]);
  //TODO:Manejamos los estados de errores:-----------------------------------AGREGADO: BIEN
  const [errors, setErrors] = useState([]);


  //1) Crear
  const createPost = async (post) => {
    // console.log(post);
    const res = await createPostReq(post);
    // console.log(res);
  };

  //2) Buscar
  const getAllPost = async () => {
    const res = await getPostReq();
    // console.log(res);
    try {
      setPost(res.data);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }

  };

  //TODO:----------------------------------------------------------------------AGREGADO: BIEN
  const getAllAllPost = async () => {
    const res = await getAllPostReq();
    // console.log(res);
    try {
      setPost(res.data);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  //3) Eliminar
  const deletePost = async (id) => {
    try {
      const res = await deletePostReq(id);
      // console.log(res);
      if (res.status === 200) setPost(post.filter((post) => post._id !== id));
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  //4) Buscar por Id
  const getPostById = async (id) => {
    try {
      const res = await getPostByIdReq(id);
      // console.log(res);
      //retornamos para que lo pueda ver en el postFormPage
      return res.data;
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  //5) Actualizar
  const updatePost = async (id, post) => {
    try {
      const res = await updatePostReq(id, post);
    } catch (error) {
      console.log(error);
    }
  };


  //TODO:-----------------------------------------------------------------------AGREDADO: BIEN
  

  //este useEffect es para manejar el tiempo del error y limpiar pasado el tiempo estipulado
  useEffect(() => {
    // if (errors.length > 0) {
      //el uso de timers en react es peligroso por eso generamos lo siguiente
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    // }
  }, [errors]);
  //TODO:-----------------------------------------------------------------------

  return (
    <PostContext.Provider value={{ post, createPost, getAllPost, getAllAllPost, deletePost, getPostById, updatePost, errors }}>
      {children}
    </PostContext.Provider>
  );
};
