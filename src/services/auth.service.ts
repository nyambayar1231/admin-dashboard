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

export type MeResponse = {
  user: {
    _id: string;
    username: string;
  };
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/users/login', credentials);
    return response as unknown as LoginResponse;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/users/logout');
  },

  me: async (): Promise<MeResponse> => {
    const response = await apiClient.get<MeResponse>('/users/me');
    return response as unknown as MeResponse;
  },

  refresh: async (): Promise<void> => {
    await apiClient.post('/users/refresh');
  },
};
