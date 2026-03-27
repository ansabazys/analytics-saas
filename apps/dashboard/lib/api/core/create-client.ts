import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosInstance,
} from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "./token";
import { authApi } from "../clients/auth-client";

/**
 * Extend Axios request config to include _retry
 */
interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * Queue item type
 */
interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}

export const createApiClient = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  // ✅ Attach access token
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // 🔥 REFRESH LOGIC (TYPED)
  let isRefreshing = false;
  let failedQueue: QueueItem[] = [];

  const processQueue = (
    error: AxiosError | null,
    token: string | null = null
  ) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else if (token) {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryRequestConfig;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      // ❌ prevent infinite loop
      if (originalRequest.url?.includes("/auth/refresh")) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return instance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const res = await authApi.post<{ accessToken: string }>("/auth/refresh");

          const newToken = res.data.accessToken;
          setAccessToken(newToken);

          processQueue(null, newToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }

          return instance(originalRequest);
        } catch (err) {
          const axiosErr = err as AxiosError;

          processQueue(axiosErr, null);
          clearAccessToken();

          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }

          return Promise.reject(axiosErr);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};