import apiClient from '../lib/api-client';

export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  userId: string;
  username: string;
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/users/login', credentials);
    return response as unknown as LoginResponse;
  },
};
