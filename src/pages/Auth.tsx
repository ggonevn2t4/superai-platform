
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Bot, ArrowRight, LogIn, UserPlus } from 'lucide-react';
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
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate('/chat');
    }
  }, [user, navigate, loading]);

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
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
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
          <h1 className="text-2xl font-bold mt-4">Chào mừng trở lại</h1>
          <p className="text-muted-foreground mt-1">Đăng nhập hoặc tạo tài khoản mới</p>
        </div>

        <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'login' | 'signup')}>
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="login">Đăng nhập</TabsTrigger>
            <TabsTrigger value="signup">Đăng ký</TabsTrigger>
          </TabsList>

          <Card>
            <CardHeader>
              <CardTitle>{authMode === 'login' ? 'Đăng nhập' : 'Đăng ký'}</CardTitle>
              <CardDescription>
                {authMode === 'login' 
                  ? 'Nhập thông tin tài khoản của bạn để đăng nhập' 
                  : 'Tạo tài khoản mới để sử dụng SuperAI'}
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
                      {authMode === 'login' ? (
                        <><LogIn size={16} /> Đăng nhập</>
                      ) : (
                        <><UserPlus size={16} /> Đăng ký</>
                      )}
                    </span>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </Tabs>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <Link to="/" className="text-primary hover:underline">Trở về trang chủ</Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
