import { createFileRoute, redirect } from '@tanstack/react-router';
import { Login } from '@/pages/Login';
import type { RouterContext } from '@/App';

export const Route = createFileRoute('/login')({
  component: Login,
  beforeLoad: async ({ context }) => {
    const ctx = context as RouterContext;
    if (ctx.user) {
      throw redirect({ to: '/dashboard' });
    }
  },
});
