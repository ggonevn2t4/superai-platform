
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Bot, BookOpen, Video, Play, ChevronRight, FileText, GraduationCap, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from '@/components/ui/progress';

const Tutorials: React.FC = () => {
  const beginnerTutorials = [
    {
      id: 1,
      title: 'Bắt đầu với SuperAI',
      description: 'Hướng dẫn cơ bản để bắt đầu sử dụng SuperAI cho người mới',
      image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '10 phút',
      lessons: 5,
      progress: 0
    },
    {
      id: 2,
      title: 'Sử dụng trò chuyện AI hiệu quả',
      description: 'Tìm hiểu cách tương tác với AI để có được kết quả tốt nhất',
      image: 'https://images.unsplash.com/photo-1622484212385-f68b10d014a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '15 phút',
      lessons: 7,
      progress: 0
    },
    {
      id: 3,
      title: 'Các tính năng cơ bản của SuperAI',
      description: 'Khám phá các tính năng cơ bản và cách sử dụng chúng',
      image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '12 phút',
      lessons: 6,
      progress: 0
    }
  ];

  const intermediateTutorials = [
    {
      id: 4,
      title: 'Tạo nội dung sáng tạo với AI',
      description: 'Hướng dẫn chi tiết về việc sử dụng công cụ sáng tạo để tạo nội dung chất lượng',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '20 phút',
      lessons: 8,
      progress: 0
    },
    {
      id: 5,
      title: 'Quản lý tri thức với WiseBase',
      description: 'Tìm hiểu cách tổ chức và truy xuất thông tin hiệu quả với WiseBase',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '18 phút',
      lessons: 6,
      progress: 0
    }
  ];

  const advancedTutorials = [
    {
      id: 6,
      title: 'Tối ưu hóa prompt để có kết quả tốt nhất',
      description: 'Kỹ thuật nâng cao để viết prompt hiệu quả và nhận được kết quả chính xác',
      image: 'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '25 phút',
      lessons: 10,
      progress: 0
    },
    {
      id: 7,
      title: 'Làm việc với dữ liệu phức tạp',
      description: 'Hướng dẫn xử lý dữ liệu phức tạp và trích xuất thông tin hữu ích',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '30 phút',
      lessons: 12,
      progress: 0
    }
  ];

  const renderTutorialCard = (tutorial: any) => (
    <Card key={tutorial.id} className="overflow-hidden hover:shadow-md transition-all">
      <div className="relative">
        <div 
          className="h-48 bg-cover bg-center" 
          style={{ backgroundImage: `url(${tutorial.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <div className="text-white">
            <div className="flex items-center gap-2 text-xs mb-1">
              <Clock size={12} />
              <span>{tutorial.duration}</span>
              <span className="mx-1">•</span>
              <BookOpen size={12} />
              <span>{tutorial.lessons} bài học</span>
            </div>
          </div>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{tutorial.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-muted-foreground text-sm">{tutorial.description}</p>
        {tutorial.progress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Tiến độ</span>
              <span>{tutorial.progress}%</span>
            </div>
            <Progress value={tutorial.progress} className="h-1" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full gap-1">
          <Play size={16} /> {tutorial.progress > 0 ? 'Tiếp tục học' : 'Bắt đầu học'}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <Layout>
      <div className="min-h-screen py-16 pt-24 md:pt-24">
        <div className="container px-4 mx-auto">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-6">
              <GraduationCap size={16} /> Trung tâm hướng dẫn
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Hướng dẫn sử dụng <span className="text-gradient">SuperAI</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Khám phá các hướng dẫn chi tiết giúp bạn khai thác tối đa sức mạnh của SuperAI, 
              từ những bước cơ bản đến các kỹ thuật nâng cao.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Video size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Video hướng dẫn</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Xem các video hướng dẫn trực quan về cách sử dụng SuperAI
                    </p>
                    <Button variant="link" className="p-0 h-auto flex items-center gap-1 text-primary">
                      Xem thư viện video <ChevronRight size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Tài liệu chi tiết</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Tài liệu hướng dẫn chi tiết về tất cả tính năng của nền tảng
                    </p>
                    <Button variant="link" className="p-0 h-auto flex items-center gap-1 text-primary">
                      Đọc tài liệu <ChevronRight size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Câu hỏi thường gặp</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Giải đáp các câu hỏi thường gặp và vấn đề phổ biến
                    </p>
                    <Button variant="link" className="p-0 h-auto flex items-center gap-1 text-primary">
                      Xem FAQ <ChevronRight size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tutorials */}
          <div className="mb-16">
            <Tabs defaultValue="beginner">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Khóa học theo cấp độ</h2>
                  <p className="text-muted-foreground">Chọn khóa học phù hợp với trình độ của bạn</p>
                </div>
                <TabsList>
                  <TabsTrigger value="beginner">Người mới</TabsTrigger>
                  <TabsTrigger value="intermediate">Trung cấp</TabsTrigger>
                  <TabsTrigger value="advanced">Nâng cao</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="beginner">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {beginnerTutorials.map(tutorial => renderTutorialCard(tutorial))}
                </div>
              </TabsContent>
              
              <TabsContent value="intermediate">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {intermediateTutorials.map(tutorial => renderTutorialCard(tutorial))}
                </div>
              </TabsContent>
              
              <TabsContent value="advanced">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {advancedTutorials.map(tutorial => renderTutorialCard(tutorial))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Featured Tutorial */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Star className="text-yellow-500" size={24} />
              Hướng dẫn nổi bật
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-card rounded-xl shadow-md overflow-hidden">
              <div className="relative h-64 lg:h-auto">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                  <div className="p-8 text-white">
                    <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">Mới nhất</div>
                    <h3 className="text-2xl font-bold mb-2">Làm chủ SuperAI trong 7 ngày</h3>
                    <p className="mb-6 text-white/80">Khóa học toàn diện giúp bạn nắm vững các tính năng của SuperAI trong thời gian ngắn</p>
                    <div className="flex items-center gap-4 text-sm text-white/70 mb-6">
                      <div className="flex items-center gap-1">
                        <Video size={14} />
                        <span>12 video bài giảng</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>2 giờ 30 phút</span>
                      </div>
                    </div>
                    <Button className="gap-2 bg-white text-black hover:bg-white/90">
                      <Play size={16} /> Bắt đầu ngay
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h4 className="text-lg font-medium mb-4">Nội dung khóa học</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      1
                    </div>
                    <div>
                      <h5 className="font-medium">Giới thiệu về SuperAI</h5>
                      <p className="text-sm text-muted-foreground">Tổng quan về nền tảng và các tính năng</p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">12 phút</div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      2
                    </div>
                    <div>
                      <h5 className="font-medium">Sử dụng trò chuyện AI</h5>
                      <p className="text-sm text-muted-foreground">Hướng dẫn chi tiết về tính năng chat</p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">15 phút</div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      3
                    </div>
                    <div>
                      <h5 className="font-medium">Sáng tạo nội dung với AI</h5>
                      <p className="text-sm text-muted-foreground">Tạo văn bản, hình ảnh và nội dung đa phương tiện</p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">18 phút</div>
                  </div>
                  
                  <Button variant="link" className="w-full justify-center">Xem tất cả 12 bài học</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="max-w-3xl mx-auto py-12 px-6 md:px-12 bg-primary/5 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Bạn cần hỗ trợ thêm?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Nếu bạn không tìm thấy những gì bạn cần trong các hướng dẫn của chúng tôi,
              đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ bạn.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline">
                <Link to="/help">Trung tâm trợ giúp</Link>
              </Button>
              <Button asChild>
                <Link to="/chat">Liên hệ hỗ trợ</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tutorials;
