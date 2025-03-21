
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Bot, ArrowRight, LogIn, UserPlus, KeyRound, RefreshCw } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';

const Auth: React.FC = () => {
  const { signIn, signUp, user, loading, resetPassword, updatePassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const modeParam = searchParams.get('mode');
  
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot-password' | 'update-password'>(
    modeParam === 'update-password' ? 'update-password' : 'login'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Redirect if already logged in (except for update-password mode)
  useEffect(() => {
    if (user && !loading && authMode !== 'update-password') {
      navigate('/chat');
    }
  }, [user, navigate, loading, authMode]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (authMode === 'signup') {
        if (password !== confirmPassword) {
          setError('Mật khẩu xác nhận không khớp');
          setIsSubmitting(false);
          return;
        }
        await signUp(email, password);
      } else if (authMode === 'login') {
        await signIn(email, password);
      } else if (authMode === 'forgot-password') {
        await resetPassword(email);
        setResetSent(true);
      } else if (authMode === 'update-password') {
        if (password !== confirmPassword) {
          setError('Mật khẩu xác nhận không khớp');
          setIsSubmitting(false);
          return;
        }
        await updatePassword(password);
        navigate('/auth', { replace: true });
        setAuthMode('login');
      }
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && authMode !== 'update-password') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-all duration-300">
              <Bot size={24} className="text-white" />
            </div>
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">SuperAI</span>
          </Link>
          <h1 className="text-2xl font-bold mt-4">
            {authMode === 'login' && 'Chào mừng trở lại'}
            {authMode === 'signup' && 'Tạo tài khoản mới'}
            {authMode === 'forgot-password' && 'Khôi phục mật khẩu'}
            {authMode === 'update-password' && 'Cập nhật mật khẩu mới'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {authMode === 'login' && 'Đăng nhập hoặc tạo tài khoản mới'}
            {authMode === 'signup' && 'Điền thông tin để đăng ký tài khoản'}
            {authMode === 'forgot-password' && 'Chúng tôi sẽ gửi link khôi phục vào email của bạn'}
            {authMode === 'update-password' && 'Thiết lập mật khẩu mới cho tài khoản của bạn'}
          </p>
        </div>

        {authMode !== 'update-password' && (
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as any)}>
            <TabsList className="grid grid-cols-3 w-full mb-4">
              <TabsTrigger value="login">Đăng nhập</TabsTrigger>
              <TabsTrigger value="signup">Đăng ký</TabsTrigger>
              <TabsTrigger value="forgot-password">Quên mật khẩu</TabsTrigger>
            </TabsList>

            <Card>
              <CardHeader>
                <CardTitle>
                  {authMode === 'login' && 'Đăng nhập'}
                  {authMode === 'signup' && 'Đăng ký'}
                  {authMode === 'forgot-password' && 'Khôi phục mật khẩu'}
                </CardTitle>
                <CardDescription>
                  {authMode === 'login' && 'Nhập thông tin tài khoản của bạn để đăng nhập'}
                  {authMode === 'signup' && 'Tạo tài khoản mới để sử dụng SuperAI'}
                  {authMode === 'forgot-password' && 'Vui lòng nhập email đã đăng ký để nhận hướng dẫn khôi phục'}
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleAuth}>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {resetSent && authMode === 'forgot-password' && (
                    <Alert>
                      <AlertDescription>
                        Email hướng dẫn khôi phục mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="email@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  {(authMode === 'login' || authMode === 'signup') && (
                    <div className="space-y-2">
                      <Label htmlFor="password">Mật khẩu</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  
                  {authMode === 'signup' && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        placeholder="••••••••" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting || (authMode === 'forgot-password' && resetSent)}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                        Đang xử lý...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {authMode === 'login' && (<><LogIn size={16} /> Đăng nhập</>)}
                        {authMode === 'signup' && (<><UserPlus size={16} /> Đăng ký</>)}
                        {authMode === 'forgot-password' && (<><KeyRound size={16} /> Gửi email khôi phục</>)}
                      </span>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </Tabs>
        )}

        {authMode === 'update-password' && (
          <Card>
            <CardHeader>
              <CardTitle>Cập nhật mật khẩu mới</CardTitle>
              <CardDescription>
                Tạo mật khẩu mới cho tài khoản của bạn
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleAuth}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">Mật khẩu mới</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-new-password">Xác nhận mật khẩu mới</Label>
                  <Input 
                    id="confirm-new-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                      Đang xử lý...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <RefreshCw size={16} /> Cập nhật mật khẩu
                    </span>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <Link to="/" className="text-primary hover:underline">Trở về trang chủ</Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
