import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { usePosts } from "../context/PostContext";
import { PostCard } from "../components/PostCard";

export const PostPage = () => {
  // const { user } = useAuth();
  const { getAllPost, post } = usePosts();

  //useEffect para traer las publicaciones cuando se ejecuta esta pagina
  useEffect(() => {
    getAllPost();
  }, []);

  if (post.length === 0)
  // console.log(post.length)
    return (
      <>
        <Navbar />
        <h1 className="uppercase text-2xl font-semibold text-center">No Tienes Publicaciones</h1>
      </>
    );

  return (
    <>
      <Navbar />
      <h1 className="uppercase text-2xl font-semibold text-center">Mis Publicaciones:</h1>
      <hr />
      <br />
      {/* PRUEBA 1 */}
      {/* {JSON.stringify(user, null, 3)} */}

      {/* PRUEBA 2 */}
      {/* 
      {post.map((tas, i) => (
        <div key={i}>
          <h1>{tas.title}</h1>
          <p>{tas.description}</p>
        </div>
      ))} */}

      {/* PRUEBA 3 CON TASKCARD */}

      <div className="grid grid-cols-3 gap-2">
        {post.map((post, i) => (
          <PostCard post={post} key={i} />
        ))}
      </div>
    </>
  );
};
