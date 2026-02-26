import {
  Package,
  FolderTree,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Plus,
} from 'lucide-react';
import { useDashboardStats } from '@/hooks/useApi';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const stats = [
  { name: 'Total Products', icon: Package, color: 'bg-blue-500' },
  { name: 'Categories', icon: FolderTree, color: 'bg-green-500' },
  { name: 'Total Revenue', icon: DollarSign, color: 'bg-purple-500' },
  { name: 'Low Stock Items', icon: AlertTriangle, color: 'bg-red-500' },
];

export function Dashboard() {
  const { data: dashboardStats, isLoading } = useDashboardStats();

  const statValues = dashboardStats
    ? [
        dashboardStats.totalProducts,
        dashboardStats.totalCategories,
        `$${dashboardStats.totalRevenue.toLocaleString()}`,
        dashboardStats.lowStockItems,
      ]
    : [0, 0, '$0', 0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Нүүр</h1>
        <p className="text-muted-foreground">
          Overview of your store's performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                <div className={`${stat.color} p-2 rounded-md`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <Skeleton className="h-8 w-20" />
                  ) : (
                    statValues[index]
                  )}
                </div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">+12%</span>
                  <span className="ml-1">from last month</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-green-500 rounded-full shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    New product added
                  </p>
                  <p className="text-xs text-muted-foreground">
                    iPhone 15 Pro - 2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    Category updated
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Electronics - 5 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    Low stock alert
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Running Shoes - 3 items left
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might need</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <a href="#/products">
                <Button
                  variant="outline"
                  className="w-full h-auto py-6 flex flex-col items-center gap-2"
                >
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">Add Product</span>
                </Button>
              </a>
              <a href="#/categories">
                <Button
                  variant="outline"
                  className="w-full h-auto py-6 flex flex-col items-center gap-2"
                >
                  <FolderTree className="h-6 w-6" />
                  <span className="text-sm">Add Category</span>
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
