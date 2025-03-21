
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyPayment } from '@/services/paymentService';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ArrowLeft, Search, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const PaymentDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [referenceCode, setReferenceCode] = useState<string>(searchParams.get('ref') || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    status: 'success' | 'error' | 'pending' | null;
    message: string;
  }>({ status: null, message: '' });

  const handleVerify = async () => {
    if (!referenceCode.trim()) {
      toast.error('Vui lòng nhập mã tham chiếu thanh toán');
      return;
    }

    setIsVerifying(true);
    try {
      const result = await verifyPayment(referenceCode);
      
      if (result.success) {
        if (result.verified) {
          setVerificationResult({
            status: 'success',
            message: 'Thanh toán của bạn đã được xác nhận. Tài khoản của bạn đã được nâng cấp.'
          });
          toast.success('Thanh toán đã được xác nhận');
        } else {
          setVerificationResult({
            status: 'pending',
            message: 'Chúng tôi chưa nhận được thanh toán của bạn. Vui lòng kiểm tra lại sau.'
          });
          toast.info('Thanh toán đang chờ xử lý');
        }
      } else {
        setVerificationResult({
          status: 'error',
          message: result.error || 'Không thể xác minh thanh toán. Vui lòng thử lại sau.'
        });
        toast.error('Không thể xác minh thanh toán');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationResult({
        status: 'error',
        message: 'Đã xảy ra lỗi khi xác minh thanh toán. Vui lòng thử lại sau.'
      });
      toast.error('Đã xảy ra lỗi khi xác minh thanh toán');
    } finally {
      setIsVerifying(false);
    }
  };

  const getStatusIcon = () => {
    switch (verificationResult.status) {
      case 'success':
        return <CheckCircle2 className="h-16 w-16 text-green-500" />;
      case 'error':
        return <XCircle className="h-16 w-16 text-red-500" />;
      case 'pending':
        return <AlertCircle className="h-16 w-16 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate('/pricing')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại bảng giá
          </Button>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6">Kiểm tra trạng thái thanh toán</h1>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Mã tham chiếu thanh toán</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Nhập mã tham chiếu"
                    value={referenceCode}
                    onChange={(e) => setReferenceCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleVerify}
                    disabled={isVerifying || !referenceCode.trim()}
                    className="gap-1"
                  >
                    {isVerifying ? 'Đang kiểm tra...' : (
                      <>
                        <Search className="h-4 w-4" />
                        <span>Kiểm tra</span>
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Nhập mã tham chiếu bạn đã nhận khi thanh toán để kiểm tra trạng thái
                </p>
              </div>
              
              {verificationResult.status && (
                <div className={`flex flex-col items-center p-6 rounded-lg border ${
                  verificationResult.status === 'success' ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : 
                  verificationResult.status === 'error' ? 'border-red-200 bg-red-50 dark:bg-red-900/20' : 
                  'border-amber-200 bg-amber-50 dark:bg-amber-900/20'
                }`}>
                  {getStatusIcon()}
                  <h3 className={`mt-4 text-lg font-medium ${
                    verificationResult.status === 'success' ? 'text-green-700 dark:text-green-300' : 
                    verificationResult.status === 'error' ? 'text-red-700 dark:text-red-300' : 
                    'text-amber-700 dark:text-amber-300'
                  }`}>
                    {verificationResult.status === 'success' ? 'Thanh toán thành công' : 
                     verificationResult.status === 'error' ? 'Có lỗi xảy ra' : 
                     'Đang chờ xử lý'}
                  </h3>
                  <p className="mt-2 text-center">{verificationResult.message}</p>
                  
                  {verificationResult.status === 'success' && (
                    <Button
                      className="mt-4"
                      onClick={() => navigate('/chat')}
                    >
                      Bắt đầu sử dụng
                    </Button>
                  )}
                  
                  {verificationResult.status === 'pending' && (
                    <p className="mt-4 text-sm text-amber-600 dark:text-amber-400">
                      Nếu bạn đã thanh toán, vui lòng đợi trong 15-30 phút và kiểm tra lại.
                    </p>
                  )}
                </div>
              )}
              
              <div className="border-t pt-6 mt-6">
                <h2 className="text-lg font-medium mb-4">Bạn cần hỗ trợ?</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Nếu bạn đã thanh toán nhưng hệ thống chưa cập nhật, vui lòng liên hệ với chúng tôi qua email 
                  <a href="mailto:support@superai.vn" className="text-primary font-medium hover:underline ml-1">
                    support@superai.vn
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentDetails;
