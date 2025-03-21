import React from 'react';
import Layout from '@/components/layout/Layout';
import { Search, FileText, BookOpen, Code, Server, Layers, ArrowRight, ChevronRight, ExternalLink, Copy, MessageCircle, Paintbrush, Database, Wrench, Zap, Info, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Documentation: React.FC = () => {
  const mainCategories = [
    { 
      id: 'getting-started', 
      icon: <BookOpen className="h-5 w-5" />, 
      name: 'Bắt đầu',
      description: 'Hướng dẫn cơ bản để bắt đầu sử dụng SuperAI' 
    },
    { 
      id: 'chat', 
      icon: <MessageCircle className="h-5 w-5" />, 
      name: 'Trò chuyện AI', 
      description: 'Tìm hiểu về tính năng trò chuyện thông minh'
    },
    { 
      id: 'creative', 
      icon: <Paintbrush className="h-5 w-5" />, 
      name: 'Công cụ sáng tạo', 
      description: 'Hướng dẫn sử dụng các công cụ sáng tạo'
    },
    { 
      id: 'wisebase', 
      icon: <Database className="h-5 w-5" />, 
      name: 'WiseBase', 
      description: 'Quản lý và tổ chức tri thức với WiseBase'
    },
    { 
      id: 'tools', 
      icon: <Wrench className="h-5 w-5" />, 
      name: 'Công cụ chuyên biệt', 
      description: 'Khám phá các công cụ AI chuyên biệt'
    },
    { 
      id: 'advanced', 
      icon: <Zap className="h-5 w-5" />, 
      name: 'Tính năng nâng cao', 
      description: 'Các tính năng và tùy chỉnh nâng cao'
    },
  ];

  const sidebar = [
    {
      category: 'Bắt đầu',
      items: [
        { title: 'Giới thiệu', path: '#intro' },
        { title: 'Đăng ký và đăng nhập', path: '#signup' },
        { title: 'Tổng quan giao diện', path: '#interface' },
        { title: 'Cài đặt tài khoản', path: '#account' },
      ]
    },
    {
      category: 'Tính năng cơ bản',
      items: [
        { title: 'Trò chuyện với AI', path: '#chat' },
        { title: 'Tạo nội dung', path: '#content' },
        { title: 'Duyệt web với AI', path: '#browser' },
        { title: 'Quản lý tri thức', path: '#knowledge' },
      ]
    },
    {
      category: 'Tính năng nâng cao',
      items: [
        { title: 'Tùy chỉnh mô hình', path: '#models' },
        { title: 'Cài đặt API', path: '#api' },
        { title: 'Tích hợp với ứng dụng khác', path: '#integrations' },
        { title: 'Bảo mật và quyền riêng tư', path: '#security' },
      ]
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen py-8 pt-24 md:pt-24">
        <div className="container px-4 mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary font-medium text-sm mb-2">
              <FileText size={16} /> Tài liệu
            </div>
            <h1 className="text-2xl md:text-4xl font-bold">Tài liệu <span className="text-gradient">SuperAI</span></h1>
            <p className="text-muted-foreground mt-2">
              Tìm hiểu chi tiết về cách sử dụng và tận dụng tối đa sức mạnh của nền tảng SuperAI
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Tìm kiếm trong tài liệu..." 
                className="pl-10"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 border rounded-lg p-4">
                <h3 className="font-medium mb-4">Mục lục</h3>
                <ScrollArea className="h-[calc(100vh-230px)]">
                  <div className="space-y-6 pr-4">
                    {sidebar.map((section, idx) => (
                      <div key={idx}>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">{section.category}</h4>
                        <ul className="space-y-1">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <a 
                                href={item.path} 
                                className="text-sm block py-1 hover:text-primary transition-colors"
                              >
                                {item.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>

            {/* Main documentation content */}
            <div className="lg:col-span-3">
              {/* Section tabs */}
              <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                  <TabsTrigger value="guides">Hướng dẫn</TabsTrigger>
                  <TabsTrigger value="api">API</TabsTrigger>
                  <TabsTrigger value="examples">Ví dụ</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  {/* Categories grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {mainCategories.map((category) => (
                      <Card key={category.id} className="hover:shadow-md transition-all hover:border-primary/50 cursor-pointer">
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                              {category.icon}
                            </div>
                            <CardTitle className="text-lg">{category.name}</CardTitle>
                          </div>
                          <CardDescription>{category.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="ghost" size="sm" className="gap-1 text-primary">
                            Xem chi tiết <ChevronRight size={14} />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Introduction */}
                  <div id="intro" className="space-y-6 mb-10">
                    <h2 className="text-2xl font-bold">Giới thiệu về SuperAI</h2>
                    <p className="text-muted-foreground">
                      SuperAI là nền tảng trí tuệ nhân tạo toàn diện, được thiết kế để hỗ trợ người dùng Việt Nam 
                      tận dụng sức mạnh của AI trong công việc và cuộc sống hàng ngày. Nền tảng tích hợp các mô hình 
                      AI tiên tiến nhất, với giao diện thân thiện và hỗ trợ đầy đủ tiếng Việt.
                    </p>
                    <p className="text-muted-foreground">
                      Tài liệu này cung cấp thông tin chi tiết về cách sử dụng SuperAI, từ các tính năng cơ bản 
                      đến những tùy chỉnh nâng cao, giúp bạn khai thác tối đa tiềm năng của nền tảng.
                    </p>

                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="text-primary mt-1">
                          <Info size={16} />
                        </div>
                        <div>
                          <h4 className="font-medium">Lưu ý</h4>
                          <p className="text-sm text-muted-foreground">
                            SuperAI liên tục cập nhật và cải tiến. Tài liệu này được cập nhật thường xuyên 
                            để phản ánh những thay đổi mới nhất. Vui lòng kiểm tra phiên bản tài liệu để 
                            đảm bảo bạn đang xem thông tin mới nhất.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Getting Started */}
                  <div id="signup" className="space-y-6 mb-10">
                    <h2 className="text-2xl font-bold">Đăng ký và đăng nhập</h2>
                    <p className="text-muted-foreground">
                      Để bắt đầu sử dụng SuperAI, bạn cần đăng ký tài khoản. Quá trình đăng ký đơn giản 
                      và chỉ mất vài phút.
                    </p>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Các bước đăng ký:</h3>
                      <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                        <li>Truy cập trang chủ SuperAI và nhấp vào nút "Đăng ký"</li>
                        <li>Nhập thông tin cá nhân: email, tên người dùng và mật khẩu</li>
                        <li>Xác nhận email của bạn thông qua liên kết được gửi đến hộp thư</li>
                        <li>Hoàn tất thiết lập hồ sơ cơ bản</li>
                        <li>Bắt đầu sử dụng SuperAI</li>
                      </ol>

                      <div className="p-4 border rounded-lg bg-card mt-4">
                        <h4 className="font-medium mb-2">Đăng nhập</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Sau khi đăng ký, bạn có thể đăng nhập bằng email và mật khẩu đã đăng ký. 
                          SuperAI cũng hỗ trợ đăng nhập bằng Google và Facebook để thuận tiện hơn.
                        </p>
                        <Button size="sm">Tìm hiểu thêm về quản lý tài khoản</Button>
                      </div>
                    </div>
                  </div>

                  {/* Features Overview */}
                  <div id="interface" className="space-y-6 mb-10">
                    <h2 className="text-2xl font-bold">Tổng quan giao diện</h2>
                    <p className="text-muted-foreground">
                      Giao diện SuperAI được thiết kế trực quan và dễ sử dụng, với các thành phần chính sau:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageCircle size={20} className="text-primary" />
                          <h3 className="font-medium">Trò chuyện AI</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Giao diện trò chuyện thông minh với AI, hỗ trợ nhiều mô hình khác nhau và 
                          tùy chỉnh cài đặt.
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Paintbrush size={20} className="text-primary" />
                          <h3 className="font-medium">Sáng tạo</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Công cụ tạo nội dung văn bản, hình ảnh, và các tài liệu sáng tạo khác với 
                          sự hỗ trợ của AI.
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe size={20} className="text-primary" />
                          <h3 className="font-medium">Trình duyệt thông minh</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Trình duyệt web tích hợp AI, giúp tìm kiếm và tổng hợp thông tin hiệu quả hơn.
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Database size={20} className="text-primary" />
                          <h3 className="font-medium">WiseBase</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Hệ thống quản lý tri thức, giúp lưu trữ và tổ chức thông tin một cách thông minh.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Code Example */}
                  <div className="mb-10">
                    <h3 className="text-lg font-medium mb-4">Ví dụ về tương tác với AI</h3>
                    <div className="relative bg-muted rounded-lg p-4 mb-4">
                      <div className="font-mono text-sm">
                        <div className="text-green-600">// Ví dụ về cách tạo một yêu cầu hiệu quả</div>
                        <div className="text-blue-600 mt-2">const <span className="text-purple-600">promptExample</span> = {`{`}</div>
                        <div className="pl-4">topic: <span className="text-amber-600">"Tổng hợp thông tin về biến đổi khí hậu"</span>,</div>
                        <div className="pl-4">specificRequirements: <span className="text-amber-600">"Tập trung vào tác động ở Việt Nam"</span>,</div>
                        <div className="pl-4">format: <span className="text-amber-600">"Báo cáo ngắn với đánh giá chi tiết"</span>,</div>
                        <div className="pl-4">additionalContext: <span className="text-amber-600">"Dành cho học sinh THPT"</span></div>
                        <div className="text-blue-600">{`}`};</div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-foreground"
                      >
                        <Copy size={14} />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Cung cấp yêu cầu rõ ràng và chi tiết sẽ giúp AI tạo ra kết quả chính xác hơn. Bạn nên 
                      chỉ định chủ đề, yêu cầu cụ thể, định dạng mong muốn và bối cảnh bổ sung.
                    </p>
                  </div>

                  <Button className="gap-2">
                    <ArrowRight size={16} /> Tiếp tục với hướng dẫn sử dụng Chat AI
                  </Button>
                </TabsContent>

                <TabsContent value="guides">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Hướng dẫn chi tiết sẽ được hiển thị ở đây</p>
                  </div>
                </TabsContent>

                <TabsContent value="api">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Tài liệu API sẽ được hiển thị ở đây</p>
                  </div>
                </TabsContent>

                <TabsContent value="examples">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Các ví dụ sẽ được hiển thị ở đây</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Documentation;
