
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getPaymentMethods, initiatePayment } from '@/services/paymentService';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bank, Smartphone, Copy, ArrowRight, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

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
  const [copied, setCopied] = useState<Record<string, boolean>>({});

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

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied({ ...copied, [field]: true });
      setTimeout(() => {
        setCopied({ ...copied, [field]: false });
      }, 2000);
    });
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
          <Tabs defaultValue="bank" onValueChange={(value) => setSelectedMethod(value as 'bank' | 'momo')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bank" className="flex items-center gap-2">
                <Bank size={16} />
                <span>Ngân hàng</span>
              </TabsTrigger>
              <TabsTrigger value="momo" className="flex items-center gap-2">
                <Smartphone size={16} />
                <span>MoMo</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="bank" className="mt-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Ngân hàng:</span>
                  <span className="font-medium">{paymentMethods.bank.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Số tài khoản:</span>
                  <span className="font-medium">{paymentMethods.bank.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Chủ tài khoản:</span>
                  <span className="font-medium">{paymentMethods.bank.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Số tiền:</span>
                  <span className="font-medium">{planPrice === 'Liên hệ' ? 'Liên hệ' : `${planPrice} VND`}</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="momo" className="mt-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Ví điện tử:</span>
                  <span className="font-medium">{paymentMethods.momo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Số điện thoại:</span>
                  <span className="font-medium">{paymentMethods.momo.phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Chủ tài khoản:</span>
                  <span className="font-medium">{paymentMethods.momo.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Số tiền:</span>
                  <span className="font-medium">{planPrice === 'Liên hệ' ? 'Liên hệ' : `${planPrice} VND`}</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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

      <Dialog open={showPaymentDetails} onOpenChange={setShowPaymentDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chi tiết thanh toán</DialogTitle>
            <DialogDescription>
              Vui lòng sử dụng thông tin dưới đây để hoàn tất thanh toán của bạn.
            </DialogDescription>
          </DialogHeader>
          
          {paymentDetails && (
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Mã tham chiếu:</label>
                <div className="flex gap-2">
                  <Input value={referenceCode} readOnly className="bg-muted" />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(referenceCode, 'reference')}
                    title="Sao chép mã tham chiếu"
                  >
                    {copied['reference'] ? <Check size={16} /> : <Copy size={16} />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Lưu mã này để kiểm tra trạng thái thanh toán sau này</p>
              </div>
              
              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Phương thức:</span>
                  <span>{paymentDetails.name}</span>
                </div>
                
                {paymentDetails.accountNumber && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Số tài khoản:</span>
                    <div className="flex items-center gap-1">
                      <span>{paymentDetails.accountNumber}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard(paymentDetails.accountNumber, 'account')}
                        title="Sao chép số tài khoản"
                      >
                        {copied['account'] ? <Check size={14} /> : <Copy size={14} />}
                      </Button>
                    </div>
                  </div>
                )}
                
                {paymentDetails.phoneNumber && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Số điện thoại:</span>
                    <div className="flex items-center gap-1">
                      <span>{paymentDetails.phoneNumber}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard(paymentDetails.phoneNumber, 'phone')}
                        title="Sao chép số điện thoại"
                      >
                        {copied['phone'] ? <Check size={14} /> : <Copy size={14} />}
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Người nhận:</span>
                  <span>{paymentDetails.accountName}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Số tiền:</span>
                  <span className="font-bold">{new Intl.NumberFormat('vi-VN').format(paymentDetails.amount)} VND</span>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">Nội dung chuyển khoản:</span>
                    <div className="flex gap-2">
                      <Input value={paymentDetails.instructions} readOnly className="bg-muted text-sm" />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => copyToClipboard(paymentDetails.instructions, 'instructions')}
                        title="Sao chép nội dung chuyển khoản"
                      >
                        {copied['instructions'] ? <Check size={16} /> : <Copy size={16} />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md text-sm">
                <p>Vui lòng chuyển khoản đúng số tiền và nội dung để việc xác minh diễn ra nhanh chóng. 
                Sau khi chuyển khoản, hệ thống sẽ kiểm tra và kích hoạt tài khoản của bạn.</p>
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-between">
            <Button 
              variant="outline" 
              onClick={handleClosePaymentDetails}
            >
              Đã hiểu
            </Button>
            <Button 
              variant="default" 
              className="gap-1"
              onClick={() => navigate('/dashboard')}
            >
              <span>Đến trang quản lý</span>
              <ArrowRight size={16} />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentForm;
