import axios, { InternalAxiosRequestConfig } from "axios";
import { useSelector } from "react-redux";
import { JwtPayload } from "jsonwebtoken";
import {jwtDecode} from "jwt-decode";

import { RootState } from "../redux/store";

const createAxiosJWT = () => {
  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig<any>) => {
      const accessToken = useSelector(
        (state: RootState) => state.user.user.accessToken
      );

      const user = useSelector((state: RootState) => state.user.user);
      // jwt.verify(accessToken, "daylakeymahoaaccessToken");
      const decodeToken = jwtDecode<JwtPayload>(accessToken);
      let date = new Date();
      console.log(decodeToken);
      if ((decodeToken.exp as number) < date.getTime() / 1000) {
        const resultRefreshToken = await refreshToken();
        const newUser = {
          ...user,
          accessToken: resultRefreshToken.accessToken,
        };
        console.log(newUser);
        
        config.headers["Authorization"] = `Bearer ${resultRefreshToken.accessToken}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return axiosInstance;
};

export const refreshToken = async () => {
  try {
    const res = await axios.post("http://localhost:8080/auth/refresh", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const axiosJWT = createAxiosJWT();
