# Project Agent Guidelines

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
