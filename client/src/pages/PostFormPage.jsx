import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import { usePosts } from "../context/PostContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const PostFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();

  const { post, createPost, getPostById, updatePost } = usePosts();
  // console.log(post);
  // console.log(createPost);

  //carga la aplicación lea ese parametro de la url
  const params = useParams();
  useEffect(() => {
    // console.log(params);
    async function loadPost() {
      if (params.id) {
        const post = await getPostById(params.id);
        //el setValue del useForm
        setValue("title", post.title);
        setValue("description", post.description);
      }
    }
    loadPost();
  }, []);

  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    //A) esto es para probar para crear publicacion
    // createPost(data);
    // navigate("/post");

    //B) en caso de que actualicemos tenemos que hacer la condicional
    if (params.id) {
      updatePost(params.id, data);
    } else {
      createPost(data);
    }
    navigate("/post");
  });
  return (
    <div >
      <Navbar />
      <br />
      <h1 className=" text-center underline uppercase text-3xl font-semibold text-white mb-6">Nueva Publicacion:</h1>
      <br />
      <div className="flex justify-center">
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
          <form onSubmit={onSubmit}>
            <input type="text" {...register("title")} placeholder="Titulo" autoFocus
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            />
            <input type="text" {...register("img")} placeholder="URL de la imagen" autoFocus
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            />
            <textarea {...register("description")} placeholder="Descripción" rows="3"
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            ></textarea>

            

            {/* <form ref="uploadForm" id="uploadForm" action="/upload" method="post" encType="multipart/form-data">
              <label >Seleccionar Archivos</label>
              <input type="file" name="archivo" />
              <input type="submit" value="Subir" />
            </form> */}


            <button type="submit" className="h-10 px-6 font-semibold rounded-md bg-green-900 text-white my-5" >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
