import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Shield, Zap, LayoutDashboard, Package, FolderTree } from 'lucide-react';

export function LandingPage() {
  const navigateToLogin = () => {
    window.location.hash = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Навбар */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Админ Самбар</span>
            </div>
            <Button onClick={navigateToLogin} variant="outline" className="hidden sm:flex">
              Нэвтрэх
            </Button>
          </div>
        </div>
      </nav>

      {/* Герой хэсэг */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Зүүн контент */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                Одоо бүгдэд нээлттэй
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Бизнесээ{' '}
                <span className="text-indigo-600">итгэлээр</span> удирдаж, хянаж бай
              </h1>
              
              <p className="text-lg text-gray-600 max-w-lg">
                Бүтээгдэхүүнүүдээ хянаж, ангиллаа удирдаж, бизнесээ өсгөхөд туслах хүчирхэг, 
                ойлгомжтой самбар. Орчин үеийн багуудад зориулав.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={navigateToLogin}
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg"
                >
                  Эхлэх
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  onClick={navigateToLogin}
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg"
                >
                  Демо харах
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full border-2 border-white"></div>
                  </div>
                  <span>1000+ хэрэглэгч итгэж байна</span>
                </div>
              </div>
            </div>

            {/* Баруун контент - Самбар урьдчилан харах */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Самбар дуурайлгах хэсгийн толгой */}
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-gray-400">admin-sambar.app</span>
                  </div>
                </div>
                
                {/* Самбар дуурайлгах контент */}
                <div className="p-6 space-y-6">
                  {/* Тоо харуулах карт */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                        <Package className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">2,543</div>
                      <div className="text-xs text-gray-500">Бүтээгдэхүүн</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                        <FolderTree className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">48</div>
                      <div className="text-xs text-gray-500">Ангилал</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                        <BarChart3 className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">+24%</div>
                      <div className="text-xs text-gray-500">Өсөлт</div>
                    </div>
                  </div>
                  
                  {/* График хэсэг */}
                  <div className="bg-gray-50 rounded-xl p-4 h-32">
                    <div className="flex items-end justify-between h-full gap-2">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-indigo-500 rounded-t-sm opacity-80"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Онцлогуудын хэсэг */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Амжилтанд хүрэхэд хэрэгтэй бүх зүйл
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Бизнесээ үр дүнтэй удирдах, хянах, өсгөхөд туслах хүчирхэг онцлогууд.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Шинжилгээ ба ойлголт</h3>
              <p className="text-gray-600">
                Бодит цагийн шинжилгээ болон дэлгэрэнгүй тайлангаар гүйцэтгэлээ хяна.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Аюулгүй ба Найдвартай</h3>
              <p className="text-gray-600">
                Мэдээллээ аюулгүй, хамгаалалттай хадгалах корпоратив түвшний аюулгүй байдал.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Цахилгаан хурдан</h3>
              <p className="text-gray-600">
                Тав тухтай, хариу үйлдэлтэй туршлага зөвшөөрсөн хурд.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Дуудах хэсэг */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Эхлэхэд бэлэн үү?
          </h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Бизнесээ удирдах платформыг итгэж буй мянга мянган хэрэглэгчдийн нэг бол.
          </p>
          <Button 
            onClick={navigateToLogin}
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg"
          >
            Самбар руу нэвтрэх
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Хөл хэсэг */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-semibold">Админ Самбар</span>
            </div>
            <p className="text-sm">
              © 2026 Админ Самбар. Бүх эрх хуулиар хамгаалагдсан.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
