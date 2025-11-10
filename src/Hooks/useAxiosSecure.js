import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthContext";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    //Request
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        const token = user?.accessToken;
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }

        return config;
      },
      (err) => Promise.reject(err)
    );

    //Response


    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, [user?.accessToken]);

  return instance;
};

export default useAxiosSecure;
