import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export const Profile = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <div className="text-center text-3xl font-semibold">Mi Perfil</div>
      <hr />
      <br />

      {/* {JSON.stringify(user, null, 3)} */}
      <div className="flex justify-center">
        <div className="bg-zinc-800 max-w-md w-full m-10 p-0 rounded-md space-y-3">
            <div className="flex justify-center">
              <img src={user.img} alt="Imagen de la publicacion" />
            </div>
          <header className="">
            <p className="underline decoration-1 mx-3 text-2xl">Nombre de usuario: </p>
            <h1 className="text-center uppercase text-3xl font-semibold text-white">{user.username}</h1>
          </header>
          <div className="">
          <p className="underline decoration-1 text-start mx-3 pt-3">Correo electrónico:</p>
          <p className="text-center mx-3 pb-3">{user.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};
