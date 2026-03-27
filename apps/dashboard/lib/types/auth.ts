export type User = {
  id: string;
  email: string;
  name: string | null;
  avatarUrl?: string | null;
  emailVerified?: boolean;
  createdAt?: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};
