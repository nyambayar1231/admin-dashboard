import { useState } from 'react';
import { Plus, Search, Pencil, Trash2, AlertCircle, Folder } from 'lucide-react';
import { useCategories, useDeleteCategory, useCreateCategory, useUpdateCategory } from '@/hooks/useApi';
import type { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper<Category>();

export function Categories() {
  const { data: categories = [], isLoading } = useCategories();
  const deleteCategory = useDeleteCategory();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    slug: '',
  });

  const columns = [
    columnHelper.accessor('name', {
      header: 'Ангиллын нэр',
      cell: (info) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Folder className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-medium truncate">{info.getValue()}</p>
            <p className="text-sm text-muted-foreground">/{info.row.original.slug}</p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('description', {
      header: 'Тайлбар',
      cell: (info) => <p className="text-muted-foreground max-w-xs truncate">{info.getValue()}</p>,
    }),
    columnHelper.accessor('productCount', {
      header: 'Бүтээгдэхүүн',
      cell: (info) => (
        <Badge variant="secondary">
          {info.getValue()} бүтээгдэхүүн
        </Badge>
      ),
    }),
    columnHelper.accessor('updatedAt', {
      header: 'Сүүлд шинэчлэгдсэн',
      cell: (info) => (
        <span className="text-sm text-muted-foreground">
          {new Date(info.getValue()).toLocaleDateString()}
        </span>
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
            onClick={() => openEditModal(info.row.original)}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Засах</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDeletingCategory(info.row.original)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Устгах</span>
          </Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory.mutate({ id: editingCategory.id, updates: formData });
    } else {
      createCategory.mutate({
        name: formData.name,
        description: formData.description,
        slug: formData.slug,
      } as Omit<Category, 'id' | 'createdAt' | 'updatedAt'>);
    }
    closeModal();
  };

  const handleDelete = () => {
    if (deletingCategory) {
      deleteCategory.mutate(deletingCategory.id);
      setDeletingCategory(null);
    }
  };

  const openCreateModal = () => {
    setFormData({ name: '', description: '', slug: '' });
    setIsCreateModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      slug: category.slug,
    });
    setIsCreateModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setEditingCategory(null);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
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
        <div className="rounded-md border">
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Толгой */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ангилал</h1>
          <p className="text-muted-foreground">Бүтээгдэхүүнүүдээ ангилалд оруулах</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="mr-2 h-4 w-4" />
          Ангилал нэмэх
        </Button>
      </div>

      {/* Хайлт */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Ангилал хайх..."
          value={globalFilter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Хүснэгт */}
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
                  Үр дүн олдсонгүй.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Үүсгэх/Засах Модал */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editingCategory ? 'Ангилал засах' : 'Ангилал нэмэх'}</DialogTitle>
              <DialogDescription>
                {editingCategory
                  ? 'Ангиллынхаа өөрчлөлтүүдийг энд оруулна уу.'
                  : 'Бүтээгдэхүүнүүдээ зохион байгуулах шинэ ангилал нэмэх.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ангиллын нэр</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const name = e.target.value;
                    setFormData({
                      ...formData,
                      name,
                      slug: editingCategory ? formData.slug : generateSlug(name)
                    });
                  }}
                  placeholder="Ангиллын нэр оруулах"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="slug-энд-оруулах"
                  required
                />
                <p className="text-xs text-muted-foreground">URL-д ашиглагдана: /category/{formData.slug}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Тайлбар</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ангиллын тайлбар оруулах"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeModal}>
                Цуцлах
              </Button>
              <Button type="submit">
                {editingCategory ? 'Ангилал шинэчлэх' : 'Ангилал үүсгэх'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Устгах баталгаа */}
      <Dialog open={!!deletingCategory} onOpenChange={() => setDeletingCategory(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Ангилал устгах
            </DialogTitle>
            <DialogDescription>
              Та &quot;{deletingCategory?.name}&quot;-г устгахдаа итгэлтэй байна уу? Энэ ангилал дахь {deletingCategory?.productCount} бүтээгдэхүүн бас өөрчлөгдөнө.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingCategory(null)}>
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
