export type Category = {
  id: string;
  name: string;
  description: string;
  slug: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
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
};

export type DashboardStats = {
  totalProducts: number;
  totalCategories: number;
  totalRevenue: number;
  lowStockItems: number;
};
