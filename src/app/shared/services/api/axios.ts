import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { environment } from "../../../environments/environment";
import { getAppInjector } from "../injectors/app.injector";
import { TokenStorageService } from "./common/token-storage-service";

export default (): AxiosInstance => {
  const injector = getAppInjector();
  const tokenStorage = injector.get(TokenStorageService);

  const instance: AxiosInstance = axios.create({
    baseURL: environment.apiUrl,
    timeout: 60000,
  });

  // request
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = tokenStorage.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (config.params) {
        Object.keys(config.params).forEach((key) => {
          if (config.params[key] === "" || config.params[key] == null) {
            delete config.params[key];
          }
        });
      }

      if (config.data && typeof config.data === "object") {
        Object.keys(config.data).forEach((key) => {
          if (config.data[key] == null) {
            delete config.data[key];
          }
        });
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  // response
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: any) => {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        tokenStorage.clearToken();
        window.location.href = "/signin";
      }

      return Promise.reject(error);
    },
  );

  return instance;
};
