import axios, { InternalAxiosRequestConfig } from "axios";
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken";

import { RootState } from "../redux/store";

const createAxiosJWT = () => {
  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig<any>) => {
      const accessToken = useSelector(
        (state: RootState) => state.user.accessToken,
      );
      try {
        // const jwtObj = jwt.verify(accessToken, "daylakeymahoaaccessToken");
        // console.log(jwtObj);
        
        // const isExpire = Date.now() >= jwtObj.exp
    } catch (error) {}
      return config;
    },
    (err) => {
      return Promise.reject(err);
    },
  );
  return axiosInstance;
};

export const axiosJWT = createAxiosJWT()
