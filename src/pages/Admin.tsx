
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Shield, Users, CreditCard, Settings } from 'lucide-react';

// Type definitions
interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  role: string;
  username: string | null;
}

interface Subscription {
  id: string;
  user_id: string;
  plan_type: string;
  status: string;
  start_date: string;
  end_date: string | null;
  created_at: string;
  user_email?: string;
}

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [activeTab, setActiveTab] = useState('users');

  // Check if current user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        
        if (data && data.role === 'admin') {
          setIsAdmin(true);
          fetchUsers();
          fetchSubscriptions();
        } else {
          // Not an admin, redirect to home
          toast.error('Bạn không có quyền truy cập trang này');
          navigate('/');
        }
      } catch (error: any) {
        console.error('Error checking admin status:', error);
        toast.error('Có lỗi xảy ra khi kiểm tra quyền truy cập');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      // First get auth users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) throw authError;
      
      if (!authUsers) {
        console.error('No auth users found');
        return;
      }
      
      // Then get profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
        
      if (profilesError) throw profilesError;
      
      // Combine data
      const combinedUsers = authUsers.users.map(authUser => {
        const profile = profiles?.find(p => p.id === authUser.id);
        return {
          id: authUser.id,
          email: authUser.email || 'No email',
          created_at: authUser.created_at,
          role: profile?.role || 'user',
          username: profile?.username
        };
      });
      
      setUsers(combinedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast.error('Không thể tải dữ liệu người dùng');
    }
  };

  // Fetch all subscriptions
  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*');
        
      if (error) throw error;
      
      if (data) {
        // Get user emails for each subscription
        const subsWithEmail = await Promise.all(
          data.map(async (sub) => {
            const { data: userData } = await supabase.auth.admin.getUserById(sub.user_id);
            return {
              ...sub,
              user_email: userData?.user?.email || 'Unknown'
            };
          })
        );
        
        setSubscriptions(subsWithEmail);
      }
    } catch (error: any) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Không thể tải dữ liệu đăng ký');
    }
  };

  // Promote user to admin
  const promoteToAdmin = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userId);
        
      if (error) throw error;
      
      toast.success('Đã thăng cấp thành quản trị viên');
      fetchUsers();
    } catch (error: any) {
      console.error('Error promoting user:', error);
      toast.error('Không thể thăng cấp người dùng');
    }
  };

  // Demote admin to user
  const demoteToUser = async (userId: string) => {
    try {
      // Don't allow demoting yourself
      if (userId === user?.id) {
        toast.error('Không thể hạ cấp chính mình');
        return;
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'user' })
        .eq('id', userId);
        
      if (error) throw error;
      
      toast.success('Đã hạ cấp xuống người dùng thường');
      fetchUsers();
    } catch (error: any) {
      console.error('Error demoting user:', error);
      toast.error('Không thể hạ cấp người dùng');
    }
  };

  // Add subscription for a user
  const addSubscription = async (userId: string, planType: string) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: userId,
          plan_type: planType,
          status: 'active',
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        });
        
      if (error) throw error;
      
      toast.success('Đã thêm gói đăng ký mới');
      fetchSubscriptions();
    } catch (error: any) {
      console.error('Error adding subscription:', error);
      toast.error('Không thể thêm gói đăng ký');
    }
  };

  // Cancel a subscription
  const cancelSubscription = async (subscriptionId: string) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ 
          status: 'cancelled',
          end_date: new Date().toISOString()
        })
        .eq('id', subscriptionId);
        
      if (error) throw error;
      
      toast.success('Đã hủy gói đăng ký');
      fetchSubscriptions();
    } catch (error: any) {
      console.error('Error cancelling subscription:', error);
      toast.error('Không thể hủy gói đăng ký');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container flex justify-center items-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null; // User redirected in useEffect
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Trang quản trị</h1>
          <p className="text-muted-foreground mt-2">
            Quản lý người dùng, đăng ký và cài đặt hệ thống
          </p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users size={16} />
              <span>Người dùng</span>
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center gap-2">
              <CreditCard size={16} />
              <span>Đăng ký</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} />
              <span>Cài đặt</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users size={18} />
                  <span>Quản lý người dùng</span>
                </CardTitle>
                <CardDescription>
                  Xem và quản lý tất cả người dùng trong hệ thống
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>Danh sách tất cả người dùng</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Vai trò</TableHead>
                      <TableHead>Ngày tham gia</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map(user => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'admin' 
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                              : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          }`}>
                            {user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString('vi-VN')}</TableCell>
                        <TableCell className="space-x-2">
                          {user.role === 'user' ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => promoteToAdmin(user.id)}
                              className="flex items-center gap-1"
                            >
                              <Shield size={14} />
                              <span>Thăng cấp</span>
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => demoteToUser(user.id)}
                              className="flex items-center gap-1"
                              disabled={user.id === user?.id}
                            >
                              <Shield size={14} />
                              <span>Hạ cấp</span>
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => addSubscription(user.id, 'premium')}
                            className="flex items-center gap-1"
                          >
                            <CreditCard size={14} />
                            <span>Thêm gói</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard size={18} />
                  <span>Quản lý đăng ký</span>
                </CardTitle>
                <CardDescription>
                  Xem và quản lý tất cả các gói đăng ký
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>Danh sách tất cả các gói đăng ký</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Người dùng</TableHead>
                      <TableHead>Gói</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Ngày bắt đầu</TableHead>
                      <TableHead>Ngày kết thúc</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map(sub => (
                      <TableRow key={sub.id}>
                        <TableCell className="font-medium">{sub.user_email}</TableCell>
                        <TableCell className="capitalize">{sub.plan_type}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            sub.status === 'active' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {sub.status === 'active' ? 'Hoạt động' : 'Đã hủy'}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(sub.start_date).toLocaleDateString('vi-VN')}</TableCell>
                        <TableCell>
                          {sub.end_date ? new Date(sub.end_date).toLocaleDateString('vi-VN') : 'Không xác định'}
                        </TableCell>
                        <TableCell>
                          {sub.status === 'active' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => cancelSubscription(sub.id)}
                              className="flex items-center gap-1"
                            >
                              <span>Hủy gói</span>
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings size={18} />
                  <span>Cài đặt hệ thống</span>
                </CardTitle>
                <CardDescription>
                  Cấu hình và quản lý các cài đặt hệ thống
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>Làm thế nào để thăng cấp người dùng thành quản trị viên?</AccordionTrigger>
                    <AccordionContent>
                      Đi đến tab "Người dùng", tìm người dùng bạn muốn thăng cấp và nhấp vào nút "Thăng cấp". Người dùng sẽ ngay lập tức được cấp quyền quản trị viên.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-2">
                    <AccordionTrigger>Làm thế nào để thêm gói đăng ký cho người dùng?</AccordionTrigger>
                    <AccordionContent>
                      Đi đến tab "Người dùng", tìm người dùng bạn muốn thêm gói và nhấp vào nút "Thêm gói". Bạn có thể xem và quản lý tất cả các gói đăng ký trong tab "Đăng ký".
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-3">
                    <AccordionTrigger>Tôi có thể hạ cấp một quản trị viên không?</AccordionTrigger>
                    <AccordionContent>
                      Có, bạn có thể hạ cấp bất kỳ quản trị viên nào trừ chính bạn. Điều này giúp đảm bảo rằng luôn có ít nhất một quản trị viên trong hệ thống.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
