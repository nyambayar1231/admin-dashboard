import { Pencil, Trash2, ArrowUpDown } from 'lucide-react';
import type { Product } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const columnHelper = createColumnHelper<Product>();

interface ProductTableProps {
  products: Product[];
  globalFilter: string;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductTable({ products, globalFilter, onEdit, onDelete }: ProductTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

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

  const columns = [
    columnHelper.accessor('name', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-0 hover:bg-transparent"
        >
          Product
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      ),
      cell: (info) => {
        const product = info.row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-muted overflow-hidden shrink-0">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <Package className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-medium truncate">{info.getValue()}</p>
              <p className="text-xs text-muted-foreground">{product.sku}</p>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor('categoryName', {
      header: 'Category',
      cell: (info) => (
        <Badge variant="outline" className="font-normal">
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor('price', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-0 hover:bg-transparent"
        >
          Price
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      ),
      cell: (info) => <span className="font-medium">${info.getValue().toLocaleString()}</span>,
    }),
    columnHelper.accessor('stock', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-0 hover:bg-transparent"
        >
          Stock
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      ),
      cell: (info) => {
        const stock = info.getValue();
        return (
          <span className={cn(
            'font-medium',
            stock === 0 && 'text-gray-400',
            stock > 0 && stock <= 5 && 'text-red-500',
            stock > 5 && stock <= 20 && 'text-yellow-500',
            stock > 20 && 'text-green-500'
          )}>
            {stock}
          </span>
        );
      },
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => (
        <Badge variant={getStatusVariant(info.getValue())}>
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: (info) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(info.row.original)}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(info.row.original)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: () => {},
    state: {
      sorting,
      globalFilter,
    },
  });

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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="hover:bg-muted/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
