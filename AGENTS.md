# Project Agent Guidelines

## Package Manager

**Always use `bun` instead of `npm`.**

```bash
# Installing dependencies
bun install

# Adding new dependencies
bun add <package-name>
bun add -D <package-name>  # dev dependencies

# Running scripts
bun run dev
bun run build
bun run lint
```

## TypeScript Type Definitions

### General Rule

**Prefer `type` over `interface` whenever possible**, but use `interface` when it's the better tool for the job.

### When to Use `type`

- Object shapes and structures
- Union types (`type Status = 'active' | 'inactive'`)
- Intersection types (`type AdminUser = User & { permissions: string[] }`)
- Mapped types and conditional types
- Function type aliases
- Tuple types

### When to Use `interface`

- Declaration merging is needed (e.g., extending third-party library types)
- Class implements patterns where you want clear inheritance
- When the object shape is meant to be extended/overridden

### Examples

```typescript
// Use type for object shapes
type User = {
  id: string;
  name: string;
  email: string;
};

// Use type for unions
type ApiStatus = 'loading' | 'success' | 'error';

// Use interface when declaration merging is needed
interface Window {
  myCustomProperty: string;
}

// Use interface for class implements when inheritance matters
interface Repository<T> {
  find(id: string): Promise<T>;
  save(item: T): Promise<void>;
}
```

### Key Principle

Don't force `type` where `interface` provides clearer semantics or better DX. Choose the right tool for the specific use case.

## Routing (TanStack Router)

### File-Based Routing Structure

Use TanStack Router with file-based routing. Routes are defined in `src/routes/` directory:

```
src/routes/
├── __root.tsx              # Root layout (wraps all routes)
├── index.tsx               # / route (home)
├── login.tsx               # /login
└── dashboard/
    ├── route.tsx           # /dashboard layout with auth guard
    ├── index.tsx           # /dashboard (main page)
    ├── products.tsx        # /dashboard/products
    └── categories.tsx      # /dashboard/categories
```

### Route Protection Pattern

Use `beforeLoad` for authentication guards. The auth check should use router context (set by root route's `beforeLoad`), not Zustand store, to avoid timing issues:

```typescript
import { createFileRoute, redirect } from '@tanstack/react-router';
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
```

### Root Route Auth Initialization

The root route's `beforeLoad` fetches auth and returns user data, which gets merged into context for all child routes:

```typescript
// __root.tsx
export const Route = createRootRoute({
  component: RootComponent,
  beforeLoad: async () => {
    try {
      const response = await authService.me();
      return { user: response.user }; // Merged into context
    } catch {
      return { user: null };
    }
  },
});

function RootComponent() {
  const { user } = Route.useRouteContext();
  const { setUser } = useAuthStore();

  // Sync router context to Zustand for components
  useEffect(() => {
    if (user) {
      setUser({ userId: user._id, username: user.username });
    } else {
      setUser(null);
    }
  }, [user, setUser]);

  return <Outlet />;
}
```

**Key Points:**
- `beforeLoad` in root route runs before child routes, setting up auth context
- Child routes' `beforeLoad` receives the context with user data
- Components sync context to Zustand via `useEffect` for reactive state
- This avoids timing issues where `beforeLoad` runs before React renders

### Navigation

Always use TanStack Router's `Link` component instead of `<a>` tags:

```typescript
import { Link } from '@tanstack/react-router';

// Correct
<Link to="/dashboard/products">Products</Link>

// Incorrect (hash-based routing)
<a href="#/products">Products</a>
```

### Key Routing Rules

1. **Protected routes**: Use `beforeLoad` with `redirect` for auth checks
2. **Nested layouts**: Create `route.tsx` files for parent layouts
3. **Clean URLs**: No hash-based routing (`#/`)
4. **Auth flow**:
   - `/` → redirects to `/login` or `/dashboard` based on auth state
   - `/login` → shows login, redirects to `/dashboard` if already auth'd
   - `/dashboard/*` → requires auth, redirects to `/login` if not auth'd

## State Management (Zustand)

Use Zustand for global state management. Store files go in `src/stores/`.

### Auth Store Pattern

```typescript
import { create } from 'zustand';

export type User = {
  userId: string;
  username: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
}));
```

### Accessing Store Outside React

Use `.getState()` for accessing store outside React components:

```typescript
const { isAuthenticated } = useAuthStore.getState();
```

## Authentication

### Cookie-Based Auth (Industry Standard)

1. **HTTP Client Setup**: Use `withCredentials: true` to send cookies
2. **Token Storage**: Tokens are stored in httpOnly cookies (not localStorage)
3. **Auth State**: Store user info in Zustand (memory only)
4. **Token Refresh**: Automatic silent refresh with request queue

### API Client Configuration

```typescript
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // IMPORTANT: Send cookies
  // ...
});

// Response interceptor for 401 handling with token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 with automatic token refresh
    // Queue pending requests during refresh
  }
);
```

### Auth Hooks Pattern

```typescript
// Login mutation - clears cache and reloads to trigger router loader
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      queryClient.clear();
      window.location.href = '/dashboard';
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear();
      window.location.href = '/login';
    },
  });
};
```

**Note:** Auth initialization is handled by the root route's `beforeLoad`, not a hook. Use `Route.useRouteContext()` to access auth state in components, or `useAuthStore()` for reactive state in child components.

### Security Best Practices

1. **Never store tokens in localStorage** (vulnerable to XSS)
2. **Use httpOnly cookies** for tokens (XSS-proof)
3. **Keep auth state in memory** (Zustand store)
4. **Implement automatic token refresh** (seamless UX)
5. **Queue requests during refresh** (no request failures)
