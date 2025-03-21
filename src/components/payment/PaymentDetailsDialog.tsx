
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import CopyableField from './CopyableField';

interface PaymentDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentDetails: any;
  referenceCode: string;
  selectedMethod: 'bank' | 'momo';
  onClose: () => void;
}

const PaymentDetailsDialog: React.FC<PaymentDetailsProps> = ({
  open,
  onOpenChange,
  paymentDetails,
  referenceCode,
  selectedMethod,
  onClose
}) => {
  const navigate = useNavigate();

  if (!paymentDetails) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chi tiết thanh toán</DialogTitle>
          <DialogDescription>
            Vui lòng sử dụng thông tin dưới đây để hoàn tất thanh toán của bạn.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <CopyableField
            value={referenceCode}
            label="Mã tham chiếu:"
            field="mã tham chiếu"
            description="Lưu mã này để kiểm tra trạng thái thanh toán sau này"
          />
          
          {paymentDetails.qrCodeUrl && selectedMethod === 'momo' && (
            <div className="flex flex-col items-center bg-pink-50 dark:bg-pink-950/20 rounded-lg p-4 border border-pink-200 dark:border-pink-900">
              <h3 className="text-center font-semibold mb-2">Quét mã QR để thanh toán</h3>
              <div className="w-full max-w-[250px] mx-auto mb-3">
                <AspectRatio ratio={1/1} className="bg-white rounded-md overflow-hidden">
                  <img 
                    src={paymentDetails.qrCodeUrl} 
                    alt="MoMo QR Code" 
                    className="w-full h-full object-contain p-1"
                  />
                </AspectRatio>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Sử dụng ứng dụng MoMo hoặc ngân hàng để quét mã QR này
              </p>
            </div>
          )}
          
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
                  <CopyableField
                    value={paymentDetails.accountNumber}
                    field="số tài khoản"
                    className="hidden"
                  />
                </div>
              </div>
            )}
            
            {paymentDetails.phoneNumber && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Số điện thoại:</span>
                <div className="flex items-center gap-1">
                  <span>{paymentDetails.phoneNumber}</span>
                  <CopyableField
                    value={paymentDetails.phoneNumber}
                    field="số điện thoại"
                    className="hidden"
                  />
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
              <CopyableField
                value={paymentDetails.instructions}
                label="Nội dung chuyển khoản:"
                field="nội dung chuyển khoản"
              />
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md text-sm">
            <p>Vui lòng chuyển khoản đúng số tiền và nội dung để việc xác minh diễn ra nhanh chóng. 
            Sau khi chuyển khoản, hệ thống sẽ kiểm tra và kích hoạt tài khoản của bạn.</p>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Đã hiểu
          </Button>
          <Button 
            variant="default" 
            className="gap-1"
            onClick={() => navigate('/payment/verify')}
          >
            <span>Kiểm tra trạng thái</span>
            <ArrowRight size={16} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDetailsDialog;
