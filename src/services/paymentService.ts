
import { supabase } from '@/integrations/supabase/client';

interface PaymentMethod {
  name: string;
  accountNumber?: string;
  phoneNumber?: string;
  accountName: string;
  instructions: string;
  qrCodeUrl?: string;
}

interface PaymentMethods {
  bank: PaymentMethod;
  momo: PaymentMethod;
}

interface InitiatePaymentParams {
  plan: string;
  paymentMethod: 'bank' | 'momo';
  userEmail: string;
  amount: number;
}

interface PaymentDetails extends PaymentMethod {
  amount: number;
  plan: string;
  userEmail: string;
}

interface PaymentResponse {
  success: boolean;
  referenceCode?: string;
  paymentDetails?: PaymentDetails;
  error?: string;
}

export async function getPaymentMethods(): Promise<PaymentMethods | null> {
  try {
    const { data, error } = await supabase.functions.invoke('payment-gateway', {
      method: 'GET',
      body: { action: 'methods' }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    return null;
  }
}

export async function initiatePayment(params: InitiatePaymentParams): Promise<PaymentResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('payment-gateway', {
      method: 'POST',
      body: { action: 'initiate', ...params }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error initiating payment:', error);
    return { success: false, error: 'Không thể khởi tạo thanh toán' };
  }
}

export async function verifyPayment(referenceCode: string): Promise<{ success: boolean; verified: boolean; message?: string; error?: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('payment-gateway', {
      method: 'POST',
      body: { action: 'verify', referenceCode }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return { success: false, verified: false, error: 'Không thể xác minh thanh toán' };
  }
}
