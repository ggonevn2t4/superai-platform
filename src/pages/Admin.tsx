
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
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Shield, Users } from 'lucide-react';
import { useAdminStatus } from '@/hooks/useAdminStatus';

// Type definitions
interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  role: string;
  username: string | null;
}

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAdminStatus();
  const [users, setUsers] = useState<UserProfile[]>([]);

  // Fetch users if admin
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      toast.error('Bạn không có quyền truy cập trang này');
      navigate('/');
      return;
    }

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin, isLoading, navigate]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      // Get profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
        
      if (profilesError) throw profilesError;
      
      // Get auth users for emails - fixing the type issue here
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) throw authError;
      
      if (!authUsers || !profiles) {
        console.error('No users found');
        return;
      }
      
      // Combine data - fix TypeScript error by properly typing the data
      const combinedUsers = profiles.map(profile => {
        const authUser = authUsers.users.find(u => u.id === profile.id);
        return {
          id: profile.id,
          email: authUser?.email || 'No email',
          created_at: profile.created_at,
          role: profile.role,
          username: profile.username
        };
      });
      
      setUsers(combinedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast.error('Không thể tải dữ liệu người dùng');
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
            Quản lý người dùng và quyền truy cập hệ thống
          </p>
        </div>

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
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Admin;
