import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", //Variable, segun lo que aparezca en consola al levantar el servidor de Client
  withCredentials: true,
});

export default instance;
