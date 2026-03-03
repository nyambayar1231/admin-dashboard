import {
  Package,
  FolderTree,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Plus,
} from 'lucide-react';
import { useDashboardStats, useHealthCheck } from '@/hooks/useApi';
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
  { name: 'Нийт бүтээгдэхүүн', icon: Package, color: 'bg-blue-500' },
  { name: 'Ангилал', icon: FolderTree, color: 'bg-green-500' },
  { name: 'Нийт орлого', icon: DollarSign, color: 'bg-purple-500' },
  { name: 'Бага нөөцтэй', icon: AlertTriangle, color: 'bg-red-500' },
];

export function Dashboard() {
  const { data: dashboardStats, isLoading } = useDashboardStats();
  const { data: health, isLoading: isHealthLoading } = useHealthCheck();

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
          Дэлгүүрийн гүйцэтгэлийн ерөнхий мэдээлэл
        </p>
      </div>

      {/* Тоо харуулах сүлжээ */}
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
                  <span className="ml-1">өнгөрсөн сараас</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Backend холболтын төлөв */}
      <Card>
        <CardHeader>
          <CardTitle>Серверийн төлөв</CardTitle>
          <CardDescription>Backend API холболтын мэдээлэл</CardDescription>
        </CardHeader>
        <CardContent>
          {isHealthLoading ? (
            <Skeleton className="h-6 w-32" />
          ) : health ? (
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  health.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className="font-medium">
                {health.status === 'healthy' ? 'Холбогдсон' : 'Холбогдоход асуудалтай'}
              </span>
              {health.timestamp && (
                <span className="text-sm text-muted-foreground">
                  (Шалгасан: {new Date(health.timestamp).toLocaleTimeString()})
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-500">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>Холбогдож чадсангүй</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Сүүлийн үйл ажиллагаа ба хурдан үйлдэл */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Сүүлийн үйл ажиллагаа</CardTitle>
            <CardDescription>Дэлгүүрийн сүүлийн шинэчлэлтүүд</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-green-500 rounded-full shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    Шинэ бүтээгдэхүүн нэмэгдлээ
                  </p>
                  <p className="text-xs text-muted-foreground">
                    iPhone 15 Pro - 2 цагийн өмнө
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    Ангилал шинэчлэгдлээ
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Электроник - 5 цагийн өмнө
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    Бага нөөцийн анхааруулга
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Гүйцэтгэх гутал - 3 ширхэг үлдлээ
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Хурдан үйлдэл</CardTitle>
            <CardDescription>Хэрэгтэй байж магадгүй ерөнхий даалгаврууд</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <a href="#/products">
                <Button
                  variant="outline"
                  className="w-full h-auto py-6 flex flex-col items-center gap-2"
                >
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">Бүтээгдэхүүн нэмэх</span>
                </Button>
              </a>
              <a href="#/categories">
                <Button
                  variant="outline"
                  className="w-full h-auto py-6 flex flex-col items-center gap-2"
                >
                  <FolderTree className="h-6 w-6" />
                  <span className="text-sm">Ангилал нэмэх</span>
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
