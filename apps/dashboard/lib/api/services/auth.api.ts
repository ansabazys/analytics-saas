import { authApi } from "../clients/auth-client";
import { authProtectedApi } from "../clients/auth-protected";
import { setAccessToken, clearAccessToken } from "../core/token";
import type { AuthResponse, LoginInput, RegisterInput, User } from "../../types/auth";

export const register = async (data: RegisterInput): Promise<void> => {
  await authApi.post("/auth/register", data);
};

export const login = async (data: LoginInput): Promise<AuthResponse> => {
  const res = await authApi.post<AuthResponse>("/auth/login", data);
  setAccessToken(res.data.accessToken);
  const user = await getCurrentUser();
  return {
    accessToken: res.data.accessToken,
    user,
  };
};

export const getCurrentUser = async (): Promise<User> => {
  const res = await authProtectedApi.get<User>("/auth/me");
  return res.data;
};

export const logout = async (): Promise<void> => {
  await authProtectedApi.post("/auth/logout");
  clearAccessToken();
};
