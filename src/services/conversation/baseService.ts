
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Get the current authenticated user
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};

// Handle common error patterns
export const handleError = (error: any, errorMessage: string): void => {
  console.error(errorMessage, error);
  toast.error(errorMessage);
};
