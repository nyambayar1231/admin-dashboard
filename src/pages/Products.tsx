import { useState } from 'react';
import { Plus, Search, LayoutGrid, List, AlertCircle } from 'lucide-react';
import { useProducts, useDeleteProduct, useCreateProduct, useUpdateProduct, useCategories } from '@/hooks/useApi';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductTable } from '@/components/ProductTable';

type ViewMode = 'grid' | 'table';

export function Products() {
  const { data: products = [], isLoading } = useProducts();
  const { data: categories = [] } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [globalFilter, setGlobalFilter] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    price: string;
    stock: string;
    categoryId: string;
    sku: string;
    status: 'active' | 'inactive' | 'draft';
  }>({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    sku: '',
    status: 'active',
  });

  // Бүтээгдэхүүнийг хайлтаар шүүх
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
    product.sku.toLowerCase().includes(globalFilter.toLowerCase()) ||
    product.categoryName.toLowerCase().includes(globalFilter.toLowerCase())
  );

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      categoryId: product.categoryId,
      sku: product.sku,
      status: product.status,
    });
    setIsCreateModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      categoryId: formData.categoryId,
      categoryName: categories.find(c => c.id === formData.categoryId)?.name || '',
      sku: formData.sku,
      status: formData.status,
      imageUrl: `https://placehold.co/400x400/666/FFF?text=${encodeURIComponent(formData.name)}`,
    };

    if (editingProduct) {
      await updateProduct.mutateAsync({ id: editingProduct.id, updates: productData });
    } else {
      await createProduct.mutateAsync(productData);
    }
    closeModal();
  };

  const handleDelete = async () => {
    if (deletingProduct) {
      await deleteProduct.mutateAsync(deletingProduct.id);
      setDeletingProduct(null);
    }
  };

  const openCreateModal = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      categoryId: '',
      sku: '',
      status: 'active',
    });
    setIsCreateModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setEditingProduct(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-80" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Толгой */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Бүтээгдэхүүн</h1>
          <p className="text-muted-foreground">
            Бүтээгдэхүүний нөөцөө удирдах ({filteredProducts.length} бараа)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value: string) => value && setViewMode(value as ViewMode)}
          >
            <ToggleGroupItem value="grid" aria-label="Grid харах">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="table" aria-label="Хүснэгт харах">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <Button onClick={openCreateModal}>
            <Plus className="mr-2 h-4 w-4" />
            Бүтээгдэхүүн нэмэх
          </Button>
        </div>
      </div>

      {/* Хайлт */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Бүтээгдэхүүнийг нэр, SKU, эсвэл ангилалаар хайх..."
          value={globalFilter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Бүтээгдэхүүн харуулах */}
      {viewMode === 'grid' ? (
        <ProductGrid
          products={filteredProducts}
          onEdit={openEditModal}
          onDelete={setDeletingProduct}
        />
      ) : (
        <ProductTable
          products={filteredProducts}
          globalFilter={globalFilter}
          onEdit={openEditModal}
          onDelete={setDeletingProduct}
        />
      )}

      {/* Үүсгэх/Засах Модал */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Бүтээгдэхүүн засах' : 'Бүтээгдэхүүн нэмэх'}</DialogTitle>
              <DialogDescription>
                {editingProduct
                  ? 'Бүтээгдэхүүний өөрчлөлтүүдээ энд оруулна уу.'
                  : 'Нөөцөд шинэ бүтээгдэхүүн нэмэх.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Бүтээгдэхүүний нэр</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Бүтээгдэхүүний нэр оруулах"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="SKU оруулах"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Үнэ ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Нөөц</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="0"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Ангилал</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value: string) => setFormData({ ...formData, categoryId: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Ангилал сонгох" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Төлөв</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'active' | 'inactive' | 'draft') =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Төлөв сонгох" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Идэвхитэй</SelectItem>
                      <SelectItem value="inactive">Идэвхигүй</SelectItem>
                      <SelectItem value="draft">Ноорог</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Тайлбар</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Бүтээгдэхүүний тайлбар оруулах"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeModal}>
                Цуцлах
              </Button>
              <Button type="submit">
                {editingProduct ? 'Бүтээгдэхүүн шинэчлэх' : 'Бүтээгдэхүүн үүсгэх'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Устгах баталгаа */}
      <Dialog open={!!deletingProduct} onOpenChange={() => setDeletingProduct(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Бүтээгдэхүүн устгах
            </DialogTitle>
            <DialogDescription>
              Та &quot;{deletingProduct?.name}&quot;-г устгахдаа итгэлтэй байна уу? Энэ үйлдлийг буцаах боломжгүй.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingProduct(null)}>
              Цуцлах
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Устгах
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
