
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Smartphone } from 'lucide-react';

interface PaymentMethod {
  name: string;
  accountNumber?: string;
  phoneNumber?: string;
  accountName: string;
  instructions: string;
  qrCodeUrl?: string;
}

interface PaymentMethodTabsProps {
  paymentMethods: {
    bank: PaymentMethod;
    momo: PaymentMethod;
  };
  selectedMethod: 'bank' | 'momo';
  onSelect: (value: 'bank' | 'momo') => void;
  planPrice: string;
}

const PaymentMethodTabs: React.FC<PaymentMethodTabsProps> = ({
  paymentMethods,
  selectedMethod,
  onSelect,
  planPrice
}) => {
  return (
    <Tabs defaultValue={selectedMethod} onValueChange={(value) => onSelect(value as 'bank' | 'momo')}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="bank" className="flex items-center gap-2">
          <Building size={16} />
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
  );
};

export default PaymentMethodTabs;
