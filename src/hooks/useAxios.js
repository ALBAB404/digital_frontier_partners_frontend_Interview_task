import { useEffect } from "react";
import api from "../api";
import useAuth from "./useAuth";

const useAxios = () => {
  const {auth, setAuth} = useAuth();
  useEffect(() => {
    // add a request interceptor 
    const requestInterceptor = api.interceptors.request.use(config => {
      const authToken = auth?.authToken;
      if(authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
    );

    // Add a response interceptor
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        const originalRequest = error.config;
        
        // If 401 error and not already retried, logout user
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          setAuth(null); // Logout user on 401 error
        }
        
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    }
  }, [auth.authToken]);

  return api;
};

export default useAxios;

