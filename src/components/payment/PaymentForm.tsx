
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Copy, Smartphone, Check, ArrowRight } from 'lucide-react';
import { 
  initiateBankTransfer, 
  initiateMomoPayment, 
  type PaymentDetails 
} from '@/services/paymentService';

interface PaymentFormProps {
  planName: string;
  planPrice: string;
  planDescription: string;
  isOpen: boolean;
  onClose: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  planName,
  planPrice,
  planDescription,
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'momo'>('bank_transfer');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleInitiatePayment = async () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để tiếp tục');
      return;
    }

    setIsLoading(true);
    try {
      const amount = parseInt(planPrice.replace(/\./g, ''), 10);

      if (paymentMethod === 'bank_transfer') {
        const details = await initiateBankTransfer(user.id, amount, planName);
        setPaymentDetails(details);
      } else {
        const details = await initiateMomoPayment(user.id, amount, planName);
        setPaymentDetails(details);
      }
    } catch (error) {
      toast.error(error.message || 'Có lỗi xảy ra, vui lòng thử lại sau');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`Đã sao chép ${field}`);
    
    setTimeout(() => {
      setCopiedField(null);
    }, 3000);
  };

  const handleClose = () => {
    setPaymentDetails(null);
    onClose();
  };

  const renderBankTransferDetails = () => {
    if (!paymentDetails) return null;
    
    return (
      <div className="space-y-4 mt-4">
        <div className="p-4 rounded-md border bg-muted/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Ngân hàng</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{paymentDetails.bankName}</span>
              <button
                onClick={() => copyToClipboard(paymentDetails.bankName!, 'Tên ngân hàng')}
                className="text-primary hover:text-primary/80"
              >
                {copiedField === 'Tên ngân hàng' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Số tài khoản</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{paymentDetails.accountNumber}</span>
              <button
                onClick={() => copyToClipboard(paymentDetails.accountNumber!, 'Số tài khoản')}
                className="text-primary hover:text-primary/80"
              >
                {copiedField === 'Số tài khoản' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Chủ tài khoản</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{paymentDetails.accountHolder}</span>
              <button
                onClick={() => copyToClipboard(paymentDetails.accountHolder!, 'Tên chủ tài khoản')}
                className="text-primary hover:text-primary/80"
              >
                {copiedField === 'Tên chủ tài khoản' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Số tiền</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{paymentDetails.amount.toLocaleString('vi-VN')} VND</span>
              <button
                onClick={() => copyToClipboard(paymentDetails.amount.toString(), 'Số tiền')}
                className="text-primary hover:text-primary/80"
              >
                {copiedField === 'Số tiền' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Nội dung chuyển khoản</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{paymentDetails.reference}</span>
              <button
                onClick={() => copyToClipboard(paymentDetails.reference, 'Nội dung chuyển khoản')}
                className="text-primary hover:text-primary/80"
              >
                {copiedField === 'Nội dung chuyển khoản' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>Vui lòng chuyển khoản đúng số tiền và nội dung để hệ thống xác nhận tự động.</p>
          <p className="mt-2">Hệ thống sẽ kích hoạt gói dịch vụ của bạn trong vòng 5 phút sau khi nhận được thanh toán.</p>
        </div>
        
        <Button className="w-full" onClick={handleClose}>
          Tôi đã thanh toán
        </Button>
      </div>
    );
  };

  const renderMomoDetails = () => {
    if (!paymentDetails || !paymentDetails.qrCodeUrl) return null;
    
    return (
      <div className="space-y-4 mt-4">
        <div className="flex flex-col items-center">
          <img
            src={paymentDetails.qrCodeUrl}
            alt="MoMo QR Code"
            className="w-64 h-64 object-contain mb-4"
          />
          
          <p className="text-center text-sm">
            Quét mã QR để thanh toán <strong>{paymentDetails.amount.toLocaleString('vi-VN')} VND</strong>
          </p>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>Sử dụng ứng dụng MoMo để quét mã QR và hoàn tất thanh toán.</p>
          <p className="mt-2">Hệ thống sẽ kích hoạt gói dịch vụ của bạn ngay sau khi thanh toán thành công.</p>
        </div>
        
        <Button className="w-full" onClick={handleClose}>
          Tôi đã thanh toán
        </Button>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Thanh toán gói {planName}</DialogTitle>
          <DialogDescription>
            {planDescription}
            <div className="mt-2 text-lg font-semibold">
              {planPrice} VND/{planName === 'Pro' ? 'tháng' : ''}
            </div>
          </DialogDescription>
        </DialogHeader>

        {!paymentDetails ? (
          <>
            <Tabs defaultValue="bank_transfer" onValueChange={(value) => setPaymentMethod(value as 'bank_transfer' | 'momo')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="bank_transfer" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>Chuyển khoản</span>
                </TabsTrigger>
                <TabsTrigger value="momo" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span>MoMo</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="bank_transfer">
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Thanh toán bằng chuyển khoản ngân hàng. Bạn sẽ nhận được thông tin tài khoản để 
                    thực hiện chuyển khoản sau khi nhấn nút bên dưới.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="momo">
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Thanh toán nhanh chóng bằng ví điện tử MoMo. Quét mã QR bằng ứng dụng MoMo trên 
                    điện thoại của bạn để hoàn tất thanh toán.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button type="button" onClick={handleInitiatePayment} disabled={isLoading} className="w-full">
                {isLoading ? 'Đang xử lý...' : 'Tiếp tục thanh toán'}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            {paymentMethod === 'bank_transfer' && renderBankTransferDetails()}
            {paymentMethod === 'momo' && renderMomoDetails()}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentForm;
