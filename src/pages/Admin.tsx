
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';
import { useAdminStatus } from '@/hooks/useAdminStatus';
import { useUserManagement } from '@/hooks/useUserManagement';
import UserManagement from '@/components/admin/UserManagement';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isAdmin, isLoading: isAdminCheckLoading } = useAdminStatus();
  const { users, isLoading: isUsersLoading, fetchUsers, promoteToAdmin, demoteToUser } = useUserManagement();

  // Fetch users if admin
  useEffect(() => {
    if (!isAdminCheckLoading && !isAdmin) {
      toast.error('Bạn không có quyền truy cập trang này');
      navigate('/');
      return;
    }

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin, isAdminCheckLoading, navigate, fetchUsers]);

  if (isAdminCheckLoading || isUsersLoading) {
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

        <UserManagement 
          users={users} 
          promoteToAdmin={promoteToAdmin} 
          demoteToUser={(userId) => demoteToUser(userId, user?.id)} 
        />
      </div>
    </Layout>
  );
};

export default Admin;
