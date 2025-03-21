
import React from 'react';
import Layout from '../components/layout/Layout';
import SpecializedTools from '../components/tools/SpecializedTools';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Lightbulb, Zap } from 'lucide-react';

const Tools: React.FC = () => {
  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Công cụ AI</h1>
          <p className="text-muted-foreground">
            Khám phá các công cụ trí tuệ nhân tạo chuyên biệt giúp bạn tối ưu hóa công việc và 
            tăng hiệu suất trong nhiều lĩnh vực khác nhau.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">Hiệu suất cao</CardTitle>
              <CardDescription>
                Các công cụ AI chuyên biệt giúp tối ưu hóa quy trình làm việc và gia tăng năng suất
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">AI tùy chỉnh</CardTitle>
              <CardDescription>
                Mỗi công cụ được tùy chỉnh để đáp ứng các nhu cầu cụ thể trong từng lĩnh vực
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">Sáng tạo không giới hạn</CardTitle>
              <CardDescription>
                Mở rộng khả năng sáng tạo và tư duy với các công cụ AI tiên tiến
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        
        <SpecializedTools />
      </div>
    </Layout>
  );
};

export default Tools;
