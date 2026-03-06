import { createRootRoute, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/authStore';

export const Route = createRootRoute({
  component: RootComponent,
  beforeLoad: async () => {
    try {
      const response = await authService.me();
      // Return user to be merged into context for child routes
      return { user: response.user };
    } catch {
      // Return null user if not authenticated
      return { user: null };
    }
  },
  pendingComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
    </div>
  ),
});

function RootComponent() {
  const { user } = Route.useRouteContext();
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (user) {
      setUser({
        userId: user._id,
        username: user.username,
      });
    } else {
      setUser(null);
    }
  }, [user, setUser]);

  return <Outlet />;
}
