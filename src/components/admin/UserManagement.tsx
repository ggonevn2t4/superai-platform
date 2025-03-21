
import React from 'react';
import { useAuth } from '@/context/AuthContext';
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
import { Shield, Users } from 'lucide-react';
import { UserProfile } from '@/hooks/useUserManagement';

interface UserManagementProps {
  users: UserProfile[];
  promoteToAdmin: (userId: string) => Promise<void>;
  demoteToUser: (userId: string, currentUserId: string | undefined) => Promise<void>;
}

const UserManagement: React.FC<UserManagementProps> = ({ 
  users, 
  promoteToAdmin, 
  demoteToUser 
}) => {
  const { user } = useAuth();

  return (
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
            {users.map(userProfile => (
              <TableRow key={userProfile.id}>
                <TableCell className="font-medium">{userProfile.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    userProfile.role === 'admin' 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                      : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  }`}>
                    {userProfile.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                  </span>
                </TableCell>
                <TableCell>{new Date(userProfile.created_at).toLocaleDateString('vi-VN')}</TableCell>
                <TableCell>
                  {userProfile.role === 'user' ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => promoteToAdmin(userProfile.id)}
                      className="flex items-center gap-1"
                    >
                      <Shield size={14} />
                      <span>Thăng cấp</span>
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => demoteToUser(userProfile.id, user?.id)}
                      className="flex items-center gap-1"
                      disabled={userProfile.id === user?.id}
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
  );
};

export default UserManagement;
