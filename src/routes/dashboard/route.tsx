import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { Layout } from '@/layouts/Layout';
import type { RouterContext } from '@/App';

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
  beforeLoad: async ({ context }) => {
    const ctx = context as RouterContext;
    if (!ctx.user) {
      throw redirect({ to: '/login' });
    }
  },
});

function DashboardLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
