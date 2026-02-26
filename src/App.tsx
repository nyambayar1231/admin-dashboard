import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dashboard } from '@/pages/Dashboard';
import { Products } from '@/pages/Products';
import { Categories } from '@/pages/Categories';
import { Layout } from '@/layouts/Layout';
import { useState } from 'react';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Simple router using hash-based routing
function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');

  window.addEventListener('hashchange', () => {
    setCurrentPath(window.location.hash.slice(1) || '/');
  });

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  // Make navigate available globally for Layout
  (window as any).navigate = navigate;

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Dashboard />;
      case '/products':
        return <Products />;
      case '/categories':
        return <Categories />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
