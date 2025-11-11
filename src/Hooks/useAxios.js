import axios from "axios";

const instance = axios.create({
  baseURL: "https://assignment-10-server-xi-navy.vercel.app",
});
const useAxios = () => {
  return instance;
};

export default useAxios;
