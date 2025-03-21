
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Type definitions
export interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  role: string;
  username: string | null;
}

// Define the structure of auth users returned by Supabase admin API
interface AdminUserList {
  users: Array<{
    id: string;
    email?: string;
    // Add other properties if needed
  }>;
  // Add other properties returned by the API if needed
}

export function useUserManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Get profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
        
      if (profilesError) throw profilesError;
      
      // Get auth users for emails
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) throw authError;
      
      if (!authUsers || !profiles) {
        console.error('No users found');
        setIsLoading(false);
        return;
      }
      
      // Properly type the authUsers data to fix the TypeScript error
      const typedAuthUsers = authUsers as unknown as AdminUserList;
      
      // Combine data using properly typed authUsers
      const combinedUsers = profiles.map(profile => {
        const authUser = typedAuthUsers.users.find(u => u.id === profile.id);
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
    } finally {
      setIsLoading(false);
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
  const demoteToUser = async (userId: string, currentUserId: string | undefined) => {
    try {
      // Don't allow demoting yourself
      if (userId === currentUserId) {
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

  return {
    users,
    isLoading,
    fetchUsers,
    promoteToAdmin,
    demoteToUser
  };
}
