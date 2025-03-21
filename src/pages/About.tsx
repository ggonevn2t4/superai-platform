
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Bot, Shield, Zap, BrainCircuit, ArrowRight, Users, Blocks, Star, Award, Code, Globe, History } from 'lucide-react';
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
                <p className="text-muted-foreground mb-6">
                  Chúng tôi cam kết đổi mới liên tục, đồng hành cùng người dùng trên hành trình khám phá tiềm năng vô hạn 
                  của trí tuệ nhân tạo trong mọi lĩnh vực của cuộc sống.
                </p>
                <p className="text-muted-foreground">
                  Tầm nhìn của chúng tôi là trở thành đối tác tin cậy trong quá trình chuyển đổi số, giúp các doanh nghiệp và cá nhân 
                  tại Việt Nam tận dụng sức mạnh của AI để phát triển và thịnh vượng trong kỷ nguyên số.
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

          {/* History Section - New */}
          <div className="max-w-4xl mx-auto py-16 border-b">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Hành trình phát triển</h2>
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <History size={28} />
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">2021 - Khởi đầu</h3>
                  <p className="text-muted-foreground">
                    SuperAI bắt đầu như một dự án nghiên cứu với mục tiêu phát triển các giải pháp AI phù hợp với người dùng 
                    Việt Nam. Đội ngũ sáng lập bao gồm các chuyên gia AI và kỹ sư phần mềm với nhiều năm kinh nghiệm.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Code size={28} />
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">2022 - Ra mắt phiên bản beta</h3>
                  <p className="text-muted-foreground">
                    Sau hơn một năm phát triển, phiên bản beta của SuperAI được ra mắt với các tính năng cơ bản. 
                    Chúng tôi nhận được nhiều phản hồi tích cực từ người dùng đầu tiên, giúp cải thiện sản phẩm.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Globe size={28} />
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">2023 - Mở rộng quy mô</h3>
                  <p className="text-muted-foreground">
                    SuperAI chính thức được ra mắt với đầy đủ tính năng. Chúng tôi bắt đầu hợp tác với nhiều doanh nghiệp 
                    và tổ chức giáo dục tại Việt Nam để mở rộng ứng dụng của AI trong nhiều lĩnh vực.
                  </p>
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
                    Tích hợp nhiều mô hình AI tiên tiến với khả năng hiểu ngữ cảnh vượt trội.
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
                    Từ phân tích dữ liệu đến chuyển đổi văn bản thành hình ảnh, tất cả trong một nền tảng.
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
                    Từ thiết kế đồ họa đến viết nội dung, SuperAI giúp bạn sáng tạo không giới hạn.
                  </p>
                  <Link to="/creative" className="text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Khám phá <ArrowRight size={16} />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team Section - New */}
          <div className="py-16 border-t">
            <h2 className="text-3xl font-bold mb-12 text-center">Đội ngũ phát triển</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users size={40} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-1">Nguyễn Minh Tuấn</h3>
                <p className="text-sm text-primary mb-2">Đồng sáng lập & Giám đốc Công nghệ</p>
                <p className="text-muted-foreground">
                  Chuyên gia AI với hơn 10 năm kinh nghiệm trong lĩnh vực học máy và xử lý ngôn ngữ tự nhiên.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users size={40} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-1">Trần Thị Mai Anh</h3>
                <p className="text-sm text-primary mb-2">Đồng sáng lập & Giám đốc Sản phẩm</p>
                <p className="text-muted-foreground">
                  Chuyên gia về trải nghiệm người dùng với kinh nghiệm phát triển sản phẩm tại nhiều công ty công nghệ lớn.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users size={40} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-1">Lê Văn Hùng</h3>
                <p className="text-sm text-primary mb-2">Giám đốc Phát triển Kinh doanh</p>
                <p className="text-muted-foreground">
                  Chuyên gia về phát triển kinh doanh và xây dựng quan hệ đối tác chiến lược trong lĩnh vực công nghệ.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials Section - New */}
          <div className="py-16 border-t">
            <h2 className="text-3xl font-bold mb-12 text-center">Khách hàng nói gì về chúng tôi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-xl shadow">
                <div className="flex gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Award size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Công ty ABC</h3>
                    <p className="text-sm text-muted-foreground">Doanh nghiệp vừa và nhỏ</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "SuperAI đã giúp chúng tôi tự động hóa nhiều quy trình xử lý văn bản và dữ liệu, 
                  giúp tiết kiệm thời gian và nguồn lực đáng kể. Giao diện dễ sử dụng và hỗ trợ tiếng Việt 
                  là những điểm cộng lớn."
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-xl shadow">
                <div className="flex gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Award size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Đại học XYZ</h3>
                    <p className="text-sm text-muted-foreground">Tổ chức giáo dục</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "Chúng tôi đã tích hợp SuperAI vào nhiều khóa học và dự án nghiên cứu. 
                  Sinh viên rất hào hứng khi được tiếp cận với công nghệ AI tiên tiến thông qua một nền tảng 
                  thân thiện và hỗ trợ tiếng Việt."
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto py-16 text-center">
            <div className="bg-primary/5 rounded-xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Sẵn sàng trải nghiệm SuperAI?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Bắt đầu hành trình khám phá tiềm năng vô hạn của trí tuệ nhân tạo cùng SuperAI ngay hôm nay.
                Đăng ký miễn phí và trải nghiệm sức mạnh của AI tiên tiến.
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
