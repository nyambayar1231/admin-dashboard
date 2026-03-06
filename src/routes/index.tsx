import { createFileRoute, redirect } from '@tanstack/react-router';
import type { RouterContext } from '@/App';

export const Route = createFileRoute('/')({
  beforeLoad: async ({ context }) => {
    const ctx = context as RouterContext;
    if (!ctx.user) {
      throw redirect({ to: '/login' });
    }
    throw redirect({ to: '/dashboard' });
  },
});
