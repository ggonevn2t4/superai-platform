
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getPaymentMethods, initiatePayment } from '@/services/paymentService';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import PaymentMethodTabs from './PaymentMethodTabs';
import PaymentDetailsDialog from './PaymentDetailsDialog';

interface PaymentFormProps {
  planName: string;
  planPrice: string;
  onSuccess?: () => void;
}

interface PaymentMethod {
  name: string;
  accountNumber?: string;
  phoneNumber?: string;
  accountName: string;
  instructions: string;
  qrCodeUrl?: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ planName, planPrice, onSuccess }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState<{ bank: PaymentMethod; momo: PaymentMethod } | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'bank' | 'momo'>('bank');
  const [loading, setLoading] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [referenceCode, setReferenceCode] = useState<string>('');

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const methods = await getPaymentMethods();
      if (methods) {
        setPaymentMethods(methods);
      }
    };
    
    fetchPaymentMethods();
  }, []);

  const handlePaymentInitiation = async () => {
    if (!user) {
      toast.error('Bạn cần đăng nhập để thanh toán');
      navigate('/auth');
      return;
    }

    setLoading(true);
    try {
      // Parse the price from string format (e.g., "199.000") to number
      const priceStr = planPrice === 'Liên hệ' ? '0' : planPrice;
      const amount = parseFloat(priceStr.replace(/\./g, ''));

      const response = await initiatePayment({
        plan: planName,
        paymentMethod: selectedMethod,
        userEmail: user.email || '',
        amount,
      });

      if (response.success && response.paymentDetails) {
        setPaymentDetails(response.paymentDetails);
        setReferenceCode(response.referenceCode || '');
        setShowPaymentDetails(true);
      } else {
        toast.error(response.error || 'Có lỗi xảy ra khi khởi tạo thanh toán');
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error('Không thể kết nối đến cổng thanh toán');
    } finally {
      setLoading(false);
    }
  };

  const handleClosePaymentDetails = () => {
    setShowPaymentDetails(false);
    if (onSuccess) onSuccess();
  };

  if (!paymentMethods) {
    return <div className="flex justify-center p-6">Đang tải phương thức thanh toán...</div>;
  }

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Thanh toán</CardTitle>
          <CardDescription>Chọn phương thức thanh toán cho gói {planName}</CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentMethodTabs 
            paymentMethods={paymentMethods}
            selectedMethod={selectedMethod}
            onSelect={setSelectedMethod}
            planPrice={planPrice}
          />
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handlePaymentInitiation} 
            disabled={loading || planPrice === 'Liên hệ'} 
            className="w-full"
          >
            {loading ? 'Đang xử lý...' : 'Tiếp tục thanh toán'}
          </Button>
        </CardFooter>
      </Card>

      <PaymentDetailsDialog
        open={showPaymentDetails}
        onOpenChange={setShowPaymentDetails}
        paymentDetails={paymentDetails}
        referenceCode={referenceCode}
        selectedMethod={selectedMethod}
        onClose={handleClosePaymentDetails}
      />
    </>
  );
};

export default PaymentForm;
