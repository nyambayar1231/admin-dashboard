import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      // Clear query cache and reload to trigger router loader
      queryClient.clear();
      window.location.href = '/dashboard';
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear();
      window.location.href = '/login';
    },
    onError: () => {
      queryClient.clear();
      window.location.href = '/login';
    },
  });
};
