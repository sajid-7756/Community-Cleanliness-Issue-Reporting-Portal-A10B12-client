import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "https://assignment-10-server-xi-navy.vercel.app",
});
const useAxiosSecure = () => {
  const { user, signOutFunc } = useContext(AuthContext);
  const navigate = useNavigate();

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
    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        if (status === 401 || status === 403) {
          signOutFunc()
            .then(() => {
              navigate("/register");
            })
            .catch();
        }
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, signOutFunc, user?.accessToken]);

  return instance;
};

export default useAxiosSecure;
