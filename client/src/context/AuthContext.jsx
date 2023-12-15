import { createContext, useContext, useEffect, useState } from "react";
import { registerReq, loginRequest, verifyToken, getAllUser } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Error en el contexto del usuario");
  return context;
};

export const AuthProvider = ({ children }) => {
  //1)datos del usuario que va a ser leido en toda la aplicación.
  const [user, setUser] = useState(null);

  //3) informe si esta o no Autenticado
  const [isAuth, setIsAuth] = useState(false);

  //4) Manejamos los estados de errores:
  const [errors, setErrors] = useState([]);

  //2)datos del registro, lo traemos de Register.jsx ya que hace el mismo llamado para obtener datos del usuario
  const signup = async (user) => {
    try {
      const res = await registerReq(user);
      //actualizamos al user con este setUser
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      // console.log(error.response.data);
      //cambiamos el estado del error para el contexto
      setErrors(error.response.data);
    }
  };

  //5) Para validar el Login (ingresar con un usuario ya creado)
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      // console.log(error);
      setErrors(error.response.data);
    }
  };

  //6) Logout
  const signout = () => {
    Cookies.remove("token");
    setIsAuth(false);
    setUser(null);
  };

  //este useEffect es para manejar el tiempo del error y limpiar pasado el tiempo estipulado
  useEffect(() => {
    if (errors.length > 0) {
      //el uso de timers en react es peligroso por eso generamos lo siguiente
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  //Este useEffect es para cuando validamos cookies (Para guardarlas)
  useEffect(() => {
    async function verifyLogin() { //Esta funcion es a mero efecto de poder usar la funcion asincrona verifytoken ya que no se puede colocar el async en use effect ni en la funcion arround o flecha que posee
      const cookies = Cookies.get();
      if (cookies.token) {
        try {
          const res = await verifyToken(cookies.token);
          console.log(res);
          if (res.data) {
            setIsAuth(true);
            setUser(res.data);
          } else {
            setIsAuth(false);
          }
        } catch (error) {
          setIsAuth(false);
          setUser(null);
        }
      }
    }
    verifyLogin();
  }, []);

//TODO:---------------------------------------------MAL
  const getUserName = async () => {
    const res = await getAllUser();
    console.log(res);
    // try {
    //   setPost(res.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };
//TODO:---------------------------------------------------


  return (
    <AuthContext.Provider value={{ signup, signin, signout, user, getUserName, isAuth, errors }}> {/*con esto se va a poder llamar al signup y al user desde el contexto*/}
      {children}
    </AuthContext.Provider>
  );
};
