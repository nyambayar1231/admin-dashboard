import type { Category, Product, DashboardStats } from '../types';

// Mock data with placeholder images
const categories: Category[] = [
  { id: '1', name: 'Electronics', description: 'Electronic devices and accessories', slug: 'electronics', productCount: 15, createdAt: '2024-01-01', updatedAt: '2024-01-15' },
  { id: '2', name: 'Clothing', description: 'Men and women clothing', slug: 'clothing', productCount: 25, createdAt: '2024-01-02', updatedAt: '2024-01-16' },
  { id: '3', name: 'Home & Garden', description: 'Home improvement and gardening', slug: 'home-garden', productCount: 10, createdAt: '2024-01-03', updatedAt: '2024-01-17' },
  { id: '4', name: 'Sports', description: 'Sports equipment and accessories', slug: 'sports', productCount: 8, createdAt: '2024-01-04', updatedAt: '2024-01-18' },
  { id: '5', name: 'Books', description: 'Physical and digital books', slug: 'books', productCount: 30, createdAt: '2024-01-05', updatedAt: '2024-01-19' },
];

const products: Product[] = [
  { id: '1', name: 'iPhone 15 Pro', description: 'Latest Apple smartphone with titanium design', price: 999, stock: 50, categoryId: '1', categoryName: 'Electronics', sku: 'IP-15-PRO', status: 'active', imageUrl: 'https://placehold.co/400x400/1a1a1a/FFF?text=iPhone+15+Pro', createdAt: '2024-01-10', updatedAt: '2024-01-20' },
  { id: '2', name: 'MacBook Pro M3', description: 'High-performance laptop with M3 chip', price: 1999, stock: 25, categoryId: '1', categoryName: 'Electronics', sku: 'MBP-M3', status: 'active', imageUrl: 'https://placehold.co/400x400/2d2d2d/FFF?text=MacBook+Pro', createdAt: '2024-01-11', updatedAt: '2024-01-21' },
  { id: '3', name: 'Cotton T-Shirt', description: 'Comfortable cotton t-shirt for everyday wear', price: 29, stock: 5, categoryId: '2', categoryName: 'Clothing', sku: 'TS-COT-001', status: 'active', imageUrl: 'https://placehold.co/400x400/f0f0f0/333?text=Cotton+T-Shirt', createdAt: '2024-01-12', updatedAt: '2024-01-22' },
  { id: '4', name: 'Running Shoes', description: 'Professional running shoes for athletes', price: 129, stock: 3, categoryId: '4', categoryName: 'Sports', sku: 'RS-PRO-001', status: 'active', imageUrl: 'https://placehold.co/400x400/ff6b35/FFF?text=Running+Shoes', createdAt: '2024-01-13', updatedAt: '2024-01-23' },
  { id: '5', name: 'Garden Tools Set', description: 'Complete gardening tools for your backyard', price: 89, stock: 0, categoryId: '3', categoryName: 'Home & Garden', sku: 'GT-SET-001', status: 'inactive', imageUrl: 'https://placehold.co/400x400/4a7c59/FFF?text=Garden+Tools', createdAt: '2024-01-14', updatedAt: '2024-01-24' },
  { id: '6', name: 'JavaScript Guide', description: 'Comprehensive JS book for developers', price: 49, stock: 100, categoryId: '5', categoryName: 'Books', sku: 'BK-JS-001', status: 'active', imageUrl: 'https://placehold.co/400x400/f7df1e/333?text=JS+Guide', createdAt: '2024-01-15', updatedAt: '2024-01-25' },
  { id: '7', name: 'Wireless Earbuds', description: 'Premium wireless earbuds with noise cancellation', price: 249, stock: 15, categoryId: '1', categoryName: 'Electronics', sku: 'WE-PRO-001', status: 'active', imageUrl: 'https://placehold.co/400x400/3b82f6/FFF?text=Earbuds', createdAt: '2024-01-16', updatedAt: '2024-01-26' },
  { id: '8', name: 'Yoga Mat', description: 'Non-slip yoga mat for home workouts', price: 39, stock: 8, categoryId: '4', categoryName: 'Sports', sku: 'YM-001', status: 'active', imageUrl: 'https://placehold.co/400x400/8b5cf6/FFF?text=Yoga+Mat', createdAt: '2024-01-17', updatedAt: '2024-01-27' },
  { id: '9', name: 'Coffee Maker', description: 'Automatic coffee maker for your kitchen', price: 149, stock: 12, categoryId: '3', categoryName: 'Home & Garden', sku: 'CM-001', status: 'active', imageUrl: 'https://placehold.co/400x400/6b4423/FFF?text=Coffee+Maker', createdAt: '2024-01-18', updatedAt: '2024-01-28' },
  { id: '10', name: 'React Patterns Book', description: 'Advanced React patterns and best practices', price: 59, stock: 45, categoryId: '5', categoryName: 'Books', sku: 'BK-REACT-001', status: 'active', imageUrl: 'https://placehold.co/400x400/61dafb/333?text=React+Book', createdAt: '2024-01-19', updatedAt: '2024-01-29' },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    await delay(500);
    return {
      totalProducts: products.length,
      totalCategories: categories.length,
      totalRevenue: 15234,
      lowStockItems: products.filter(p => p.stock <= 5 && p.status === 'active').length,
    };
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    await delay(600);
    return [...categories];
  },

  getCategory: async (id: string): Promise<Category | undefined> => {
    await delay(400);
    return categories.find(c => c.id === id);
  },

  createCategory: async (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
    await delay(700);
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
      productCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    categories.push(newCategory);
    return newCategory;
  },

  updateCategory: async (id: string, updates: Partial<Category>): Promise<Category> => {
    await delay(700);
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Category not found');
    categories[index] = { ...categories[index], ...updates, updatedAt: new Date().toISOString() };
    return categories[index];
  },

  deleteCategory: async (id: string): Promise<void> => {
    await delay(600);
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Category not found');
    categories.splice(index, 1);
  },

  // Products
  getProducts: async (): Promise<Product[]> => {
    await delay(600);
    return [...products];
  },

  getProduct: async (id: string): Promise<Product | undefined> => {
    await delay(400);
    return products.find(p => p.id === id);
  },

  createProduct: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    await delay(700);
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    products.push(newProduct);
    
    // Update category product count
    const category = categories.find(c => c.id === product.categoryId);
    if (category) {
      category.productCount++;
    }
    
    return newProduct;
  },

  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product> => {
    await delay(700);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() };
    return products[index];
  },

  deleteProduct: async (id: string): Promise<void> => {
    await delay(600);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    
    const product = products[index];
    products.splice(index, 1);
    
    // Update category product count
    const category = categories.find(c => c.id === product.categoryId);
    if (category) {
      category.productCount--;
    }
  },
};
