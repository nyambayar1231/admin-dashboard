import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Store user info in localStorage (no token provided by backend)
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('username', data.username);
      
      // Clear any stale queries
      queryClient.clear();
      
      // Redirect to dashboard
      window.location.hash = '/dashboard';
    },
  });
};
