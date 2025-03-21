
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Bot, Shield, Zap, BrainCircuit, ArrowRight, Users, Blocks, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen py-16 pt-24 md:pt-24">
        <div className="container px-4 mx-auto">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-6">
              <Bot size={16} /> Giới thiệu về SuperAI
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Nền tảng AI toàn diện <span className="text-gradient">hàng đầu Việt Nam</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              SuperAI kết hợp sức mạnh của các mô hình AI tiên tiến nhất để mang đến trải nghiệm trí tuệ nhân tạo toàn diện,
              giúp người dùng nâng cao hiệu suất công việc và sáng tạo không giới hạn.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/chat">Trải nghiệm ngay</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/help">Tìm hiểu thêm</Link>
              </Button>
            </div>
          </div>

          {/* Mission Section */}
          <div className="max-w-4xl mx-auto py-16 border-t border-b">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Sứ mệnh của chúng tôi</h2>
                <p className="text-muted-foreground mb-6">
                  SuperAI ra đời với sứ mệnh đưa công nghệ AI tiên tiến đến gần hơn với người dùng Việt Nam, 
                  phá bỏ rào cản ngôn ngữ và cung cấp các giải pháp AI phù hợp với nhu cầu của thị trường trong nước.
                </p>
                <p className="text-muted-foreground">
                  Chúng tôi cam kết đổi mới liên tục, đồng hành cùng người dùng trên hành trình khám phá tiềm năng vô hạn 
                  của trí tuệ nhân tạo trong mọi lĩnh vực của cuộc sống.
                </p>
              </div>
              <div className="bg-primary/5 rounded-xl p-8 md:p-10">
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Users size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Dễ dàng tiếp cận</h3>
                      <p className="text-sm text-muted-foreground">Giao diện thân thiện, hỗ trợ tiếng Việt hoàn chỉnh</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <BrainCircuit size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Công nghệ tiên tiến</h3>
                      <p className="text-sm text-muted-foreground">Tích hợp các mô hình AI hiện đại nhất</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Bảo mật an toàn</h3>
                      <p className="text-sm text-muted-foreground">Bảo vệ dữ liệu người dùng theo tiêu chuẩn quốc tế</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Tính năng nổi bật</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                SuperAI mang đến đa dạng công cụ AI giúp bạn tối ưu hóa công việc và phát triển ý tưởng sáng tạo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-md hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Zap size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Trò chuyện thông minh</h3>
                  <p className="text-muted-foreground mb-4">
                    Trò chuyện với AI thông minh, hỗ trợ đa ngôn ngữ và hiểu sâu về ngữ cảnh tiếng Việt.
                  </p>
                  <Link to="/chat" className="text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Khám phá <ArrowRight size={16} />
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Blocks size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Công cụ đa dạng</h3>
                  <p className="text-muted-foreground mb-4">
                    Bộ công cụ AI toàn diện giúp bạn tạo nội dung, xử lý dữ liệu và phân tích thông tin.
                  </p>
                  <Link to="/tools" className="text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Khám phá <ArrowRight size={16} />
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Star size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sáng tạo không giới hạn</h3>
                  <p className="text-muted-foreground mb-4">
                    Công cụ sáng tạo nội dung, hình ảnh và ý tưởng đột phá với sự hỗ trợ của AI.
                  </p>
                  <Link to="/creative" className="text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Khám phá <ArrowRight size={16} />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto py-16 text-center">
            <div className="bg-primary/5 rounded-xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Sẵn sàng trải nghiệm SuperAI?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Bắt đầu hành trình khám phá tiềm năng vô hạn của trí tuệ nhân tạo cùng SuperAI ngay hôm nay.
              </p>
              <Button asChild size="lg">
                <Link to="/chat">Bắt đầu ngay</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
