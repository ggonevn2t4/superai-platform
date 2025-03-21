
import React from 'react';
import { Check, X, CreditCard, Zap, Star } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const pricingPlans = [
  {
    name: 'Free',
    description: 'Trải nghiệm cơ bản với các tính năng giới hạn',
    price: '0',
    duration: 'mãi mãi',
    features: [
      { name: 'Trò chuyện cơ bản với AI', included: true },
      { name: 'Trình duyệt web giới hạn', included: true },
      { name: '10 tin nhắn/ngày', included: true },
      { name: 'Tính năng sáng tạo cơ bản', included: false },
      { name: 'Công cụ nâng cao', included: false },
      { name: 'Lưu trữ không giới hạn', included: false },
    ],
    popular: false,
    buttonText: 'Đăng ký miễn phí',
    color: 'bg-white',
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    name: 'Pro',
    description: 'Dành cho người dùng cá nhân với nhu cầu cao hơn',
    price: '199.000',
    duration: 'tháng',
    features: [
      { name: 'Trò chuyện với AI không giới hạn', included: true },
      { name: 'Trình duyệt web đầy đủ', included: true },
      { name: 'Tin nhắn không giới hạn', included: true },
      { name: 'Tính năng sáng tạo đầy đủ', included: true },
      { name: 'Công cụ nâng cao', included: true },
      { name: 'Lưu trữ 50GB', included: true },
    ],
    popular: true,
    buttonText: 'Nâng cấp ngay',
    color: 'bg-primary/5',
    icon: <Zap className="h-5 w-5" />,
  },
  {
    name: 'Enterprise',
    description: 'Giải pháp toàn diện cho doanh nghiệp',
    price: 'Liên hệ',
    duration: '',
    features: [
      { name: 'Tất cả tính năng Pro', included: true },
      { name: 'API tùy chỉnh', included: true },
      { name: 'Hỗ trợ 24/7', included: true },
      { name: 'Tùy chỉnh mô hình AI', included: true },
      { name: 'Quản lý người dùng', included: true },
      { name: 'Dung lượng không giới hạn', included: true },
    ],
    popular: false,
    buttonText: 'Liên hệ với chúng tôi',
    color: 'bg-white',
    icon: <Star className="h-5 w-5" />,
  },
];

const PricingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePlanSelect = (planName: string) => {
    if (!user) {
      toast.info('Bạn cần đăng nhập để tiếp tục');
      navigate('/auth');
      return;
    }

    if (planName === 'Free') {
      toast.success('Bạn đã đăng ký gói Free thành công!');
    } else if (planName === 'Pro') {
      toast.info('Đang chuyển đến trang thanh toán...');
      // Simulating payment process
      setTimeout(() => {
        toast('Chức năng thanh toán đang được phát triển');
      }, 1500);
    } else {
      toast.info('Chúng tôi sẽ liên hệ với bạn sớm!');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bảng giá dịch vụ SuperAI
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lựa chọn gói dịch vụ phù hợp với nhu cầu của bạn, từ gói miễn phí đến gói doanh nghiệp với đầy đủ tính năng
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg ${plan.popular ? 'shadow-md border-primary' : 'shadow-sm'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                    PHỔ BIẾN NHẤT
                  </div>
                </div>
              )}
              <CardHeader className={`${plan.color} transition-colors`}>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <div className="p-2 rounded-full bg-white/90 shadow-sm">
                    {plan.icon}
                  </div>
                </div>
                <CardDescription className="text-sm mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <div className="flex items-end">
                    {plan.price === 'Liên hệ' ? (
                      <span className="text-3xl font-bold">Liên hệ</span>
                    ) : (
                      <>
                        <span className="text-sm font-medium mt-auto">VND</span>
                        <span className="text-3xl font-bold mx-1">{plan.price}</span>
                        {plan.duration && (
                          <span className="text-sm text-gray-500">/{plan.duration}</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mr-2 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handlePlanSelect(plan.name)}
                  className={`w-full ${plan.popular ? '' : 'bg-secondary hover:bg-secondary/90'}`}
                  variant={plan.popular ? 'default' : 'secondary'}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Câu hỏi thường gặp</h2>
          <div className="space-y-6 text-left">
            <div>
              <h3 className="font-semibold text-lg mb-2">Làm thế nào để nâng cấp hoặc hạ cấp gói dịch vụ?</h3>
              <p className="text-gray-600">Bạn có thể dễ dàng nâng cấp hoặc hạ cấp gói dịch vụ bất kỳ lúc nào trong phần cài đặt tài khoản. Thay đổi sẽ có hiệu lực ngay lập tức.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Có cần thẻ tín dụng để đăng ký gói Free không?</h3>
              <p className="text-gray-600">Không, bạn không cần cung cấp thông tin thanh toán khi đăng ký gói Free. Chỉ khi nâng cấp lên gói Pro hoặc Enterprise, bạn mới cần cung cấp phương thức thanh toán.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Tôi có thể hủy gói dịch vụ bất kỳ lúc nào không?</h3>
              <p className="text-gray-600">Có, bạn có thể hủy gói dịch vụ bất kỳ lúc nào. Đối với gói Pro, bạn sẽ vẫn có quyền truy cập đến hết chu kỳ thanh toán hiện tại.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
