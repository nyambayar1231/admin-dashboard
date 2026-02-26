export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  categoryName: string;
  sku: string;
  status: 'active' | 'inactive' | 'draft';
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalRevenue: number;
  lowStockItems: number;
}
