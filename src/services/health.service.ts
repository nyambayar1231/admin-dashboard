import apiClient from '../lib/api-client';

export type HealthStatus = {
  status: 'healthy' | 'unhealthy';
  timestamp?: string;
  message?: string;
};

export const healthService = {
  check: async () => {
    const response = await apiClient.get<HealthStatus>('/health');
    return response.data;
  },
};
