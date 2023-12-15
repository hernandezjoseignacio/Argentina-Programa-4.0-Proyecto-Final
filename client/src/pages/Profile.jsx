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
        <div className="bg-zinc-800 max-w-md w-full m-5 p-5 rounded-md space-y-3">
          <header className="flex justify-center">
            <h1 className="underline uppercase text-3xl font-semibold text-white">{user.username}</h1>
          </header>
          <p className="">{user.email}</p>
        </div>
      </div>
    </>
  );
};
