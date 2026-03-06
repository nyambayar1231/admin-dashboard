import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  LayoutDashboard,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { useLogin } from '@/hooks/useAuth';

type LoginFormData = {
  username: string;
  password: string;
};

type FormErrors = {
  username?: string;
  password?: string;
  general?: string;
};

export function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin();
  const isLoading = loginMutation.isPending;

  // Username validation: letters, numbers, underscores, 3-30 chars
  const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
    return usernameRegex.test(username);
  };

  // Password validation: minimum 8 characters
  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Талбар бөглөх үед алдаа цэвэрлэх
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    // Хэрэглэгчийн нэр шалгах
    if (!formData.username) {
      newErrors.username = 'Хэрэглэгчийн нэр оруулна уу';
    } else if (!validateUsername(formData.username)) {
      newErrors.username =
        'Хэрэглэгчийн нэр зөвхөн англи үсэг, тоо, -, _ ашиглана уу';
    }

    // Нууц үг шалгах
    if (!formData.password) {
      newErrors.password = 'Нууц үг оруулна уу';
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        'Нууц үг зөвхөн англи үсэг ашиглаж, 8-аас олон тэмдэгт байх ёстой';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await loginMutation.mutateAsync({
        username: formData.username,
        password: formData.password,
      });
    } catch (error: any) {
      setErrors({
        general: error.response?.data?.message || 'Нэвтрэхэд алдаа гарлаа',
      });
    }
  };

  const getUsernameValidationStatus = () => {
    if (!formData.username) return null;
    return validateUsername(formData.username) ? 'valid' : 'invalid';
  };

  const getPasswordValidationStatus = () => {
    if (!formData.password) return null;
    return validatePassword(formData.password) ? 'valid' : 'invalid';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo болон гарчиг */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-lg">
            <LayoutDashboard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Нэвтрэх</h1>
          <p className="text-gray-600">Админ самбартаа нэвтэрнэ үү</p>
        </div>

        {/* Нэвтрэх маягт */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Хэрэглэгчийн нэр */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">
                Хэрэглэгчийн нэр
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Жишээ: admin_123"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`h-12 ${
                    errors.username
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : getUsernameValidationStatus() === 'valid'
                        ? 'border-green-500 focus-visible:ring-green-500'
                        : ''
                  }`}
                  autoComplete="username"
                />
                {getUsernameValidationStatus() === 'valid' && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {errors.username && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.username}</span>
                </div>
              )}
              <p className="text-xs text-gray-500">
                3-30 тэмдэгт, зөвхөн англи үсэг, тоо, доогуур зураас (_)
                ашиглана уу
              </p>
            </div>

            {/* Нууц үг */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Нууц үг
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Нууц үг оруулна уу"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`h-12 pr-12 ${
                    errors.password
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : getPasswordValidationStatus() === 'valid'
                        ? 'border-green-500 focus-visible:ring-green-500'
                        : ''
                  }`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.password}</span>
                </div>
              )}
              <p className="text-xs text-gray-500">
                Хамгийн багадаа 8 тэмдэгт байх ёстой
              </p>
            </div>

            {/* Ерөнхий алдаа */}
            {errors.general && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errors.general}</span>
              </div>
            )}

            {/* Нэвтрэх товч */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Нэвтэрч байна...</span>
                </div>
              ) : (
                'Нэвтрэх'
              )}
            </Button>
          </form>
        </div>

        {/* Тусламж мэдээлэл */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Нэвтрэхэд асуудал гарсан уу? Админтай холбогдоно уу</p>
        </div>
      </div>
    </div>
  );
}
