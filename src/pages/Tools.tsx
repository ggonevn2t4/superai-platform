
import React from 'react';
import Layout from '../components/layout/Layout';
import SpecializedTools from '../components/tools/SpecializedTools';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Lightbulb, Zap, Sparkles, Crown, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const Tools: React.FC = () => {
  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Công cụ AI</h1>
          <p className="text-muted-foreground">
            Khám phá các công cụ trí tuệ nhân tạo chuyên biệt giúp bạn tối ưu hóa công việc và 
            tăng hiệu suất trong nhiều lĩnh vực khác nhau.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">Hiệu suất cao</CardTitle>
              <CardDescription>
                Các công cụ AI chuyên biệt giúp tối ưu hóa quy trình làm việc và gia tăng năng suất
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <CardTitle className="text-xl">AI tùy chỉnh</CardTitle>
              <CardDescription>
                Mỗi công cụ được tùy chỉnh để đáp ứng các nhu cầu cụ thể trong từng lĩnh vực
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-500/5 to-amber-500/10 border-amber-500/20 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-amber-500" />
                </div>
              </div>
              <CardTitle className="text-xl">Sáng tạo không giới hạn</CardTitle>
              <CardDescription>
                Mở rộng khả năng sáng tạo và tư duy với các công cụ AI tiên tiến
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-4 items-center justify-center mb-10 p-6 rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5"
        >
          <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <Sparkles size={16} className="text-amber-500" />
            <span className="text-sm font-medium">Phân tích hình ảnh</span>
          </div>
          
          <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <Crown size={16} className="text-purple-500" />
            <span className="text-sm font-medium">Tạo nội dung chất lượng cao</span>
          </div>
          
          <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <Rocket size={16} className="text-blue-500" />
            <span className="text-sm font-medium">Phát triển phần mềm</span>
          </div>
          
          <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <Bot size={16} className="text-green-500" />
            <span className="text-sm font-medium">Trợ lý ảo thông minh</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SpecializedTools />
        </motion.div>
      </div>
    </Layout>
  );
};

export default Tools;
