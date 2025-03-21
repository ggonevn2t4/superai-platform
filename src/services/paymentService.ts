
import { supabase } from "@/integrations/supabase/client";

export interface PaymentDetails {
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
  amount: number;
  reference: string;
  qrCodeUrl?: string;
  paymentMethod: 'bank_transfer' | 'momo';
  planType: string;
}

export const generateReference = (userId: string) => {
  return `PAY-${userId.substring(0, 8)}-${Date.now().toString().substring(8)}`;
};

export const initiateBankTransfer = async (
  userId: string,
  amount: number,
  planType: string
): Promise<PaymentDetails> => {
  const reference = generateReference(userId);
  
  // Bank transfer details
  const paymentDetails: PaymentDetails = {
    bankName: "Vietcombank",
    accountNumber: "1234567890",
    accountHolder: "SUPER AI CORP",
    amount,
    reference,
    paymentMethod: 'bank_transfer',
    planType
  };

  try {
    // Record the payment attempt in the database
    await supabase.from('payment_attempts').insert({
      user_id: userId,
      amount,
      reference,
      payment_method: 'bank_transfer',
      plan_type: planType,
      status: 'pending'
    });

    return paymentDetails;
  } catch (error) {
    console.error("Error initiating bank transfer:", error);
    throw new Error("Không thể khởi tạo thanh toán, vui lòng thử lại sau.");
  }
};

export const initiateMomoPayment = async (
  userId: string,
  amount: number,
  planType: string
): Promise<PaymentDetails> => {
  const reference = generateReference(userId);
  
  try {
    // Call our edge function to get a QR code
    const { data, error } = await supabase.functions.invoke('payment-gateway', {
      body: {
        amount,
        reference,
        paymentMethod: 'momo',
        planType
      }
    });

    if (error) throw error;

    // Record the payment attempt in the database
    await supabase.from('payment_attempts').insert({
      user_id: userId,
      amount,
      reference,
      payment_method: 'momo',
      plan_type: planType,
      status: 'pending'
    });

    return {
      amount,
      reference,
      qrCodeUrl: data.qrCodeUrl,
      paymentMethod: 'momo',
      planType
    };
  } catch (error) {
    console.error("Error initiating MoMo payment:", error);
    throw new Error("Không thể khởi tạo thanh toán MoMo, vui lòng thử lại sau.");
  }
};
