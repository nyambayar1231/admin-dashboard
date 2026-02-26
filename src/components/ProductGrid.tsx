import { MoreHorizontal, Pencil, Trash2, Package } from 'lucide-react';
import type { Product } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductGrid({ products, onEdit, onDelete }: ProductGridProps) {
  const getStockColor = (stock: number) => {
    if (stock === 0) return 'text-gray-400';
    if (stock <= 5) return 'text-red-500';
    if (stock <= 20) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getStockBgColor = (stock: number) => {
    if (stock === 0) return 'bg-gray-100';
    if (stock <= 5) return 'bg-red-50';
    if (stock <= 20) return 'bg-yellow-50';
    return 'bg-green-50';
  };

  const getStatusVariant = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'secondary';
      case 'draft':
        return 'outline';
      default:
        return 'default';
    }
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Package className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">No products found</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or add a new product.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
          {/* Image Container */}
          <div className="relative aspect-square bg-muted overflow-hidden">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <Package className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
            {/* Stock Badge */}
            <div className={cn(
              'absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1',
              getStockBgColor(product.stock),
              getStockColor(product.stock)
            )}>
              <Package className="h-3 w-3" />
              {product.stock === 0 ? 'Out of stock' : `${product.stock} in stock`}
            </div>
          </div>

          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg leading-tight truncate" title={product.name}>
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground truncate">{product.sku}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(product)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(product)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={getStatusVariant(product.status)}>
                  {product.status}
                </Badge>
                <Badge variant="outline" className="font-normal">
                  {product.categoryName}
                </Badge>
              </div>
              <span className="font-bold text-lg">
                ${product.price.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
