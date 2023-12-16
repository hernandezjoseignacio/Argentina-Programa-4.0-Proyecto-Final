import { usePosts } from "../context/PostContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";//TODO:...................MAL

export const PostCard = ({ post }) => {
  const { deletePost } = usePosts();
  const { getUserName } = useAuth();//TODO:------------------MAL

  return (
    <div className="bg-zinc-800 max-w-md w-full m-5 p-5 rounded-md space-y-3">
      <header className="flex justify-center">
        <h1 className="underline uppercase text-3xl font-semibold text-white">{post.title}</h1>
      </header>

      <div className="flex justify-center">
        <img src={post.img} alt="Imagen de la publicacion" />
      </div>

      <p className="">{post.description}</p>
      <div className="flex justify-between">
        <p className="text-center">Autor: {post.userName}</p>

        <p className="text-end text-xl font-bold">
          {new Date(post.date).toLocaleDateString()}
        </p>
      </div>

      <div className="flex gap-x-6  justify-end">
        <div className="flex h-10 px-8 font-semibold rounded-md bg-green-500 text-white my-3  space-x-4 ">
          <Link to={`/post/${post._id}`} className="my-2">
            Editar
          </Link>
            
        </div>
        <div>
          <button onClick={() => { deletePost(post._id) }}
            className="h-10 px-6 font-semibold rounded-md bg-red-500 text-white my-3  space-x-4">
            Eliminar
          </button>
        </div>

      </div>
    </div>
  );
};
