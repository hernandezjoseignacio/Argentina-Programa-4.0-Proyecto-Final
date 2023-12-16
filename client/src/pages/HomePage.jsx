import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { usePosts } from "../context/PostContext";
import { PostCard } from "../components/PostCard";


export const HomePage = () => {
  const { getAllAllPost, post, errors: postErrors } = usePosts();
  
  //useEffect para traer las publicaciones cuando se ejecuta esta pagina
  useEffect(() => {
    getAllAllPost();
  }, []);

  if (post.length === 0)
    return (
      <>
        <Navbar />
        <h1 className="uppercase text-2xl font-semibold text-center">Publicaciones de Todos los Usuarios:</h1>
        <hr />
        <br />
        <h2 className="uppercase font-semibold">Todavía No hay Publicaciones en la base de datos</h2>
      </>
    );

  return (
    <>
      <Navbar />
      <h1 className="uppercase text-2xl font-semibold text-center">Publicaciones de todos los Usuarios:</h1>
      <hr />
      
      {/* TODO:---------------AGREGADO: BIEN */}
        <div className="bg-red-800 text-white text-center">
          {JSON.stringify(postErrors.message, null, 3)}
        </div>

      <div className="grid grid-cols-3 gap-2">
        {post.map((post, i) => (
          <PostCard post={post} key={i} />
        ))}
      </div>
    </>
  );
};
