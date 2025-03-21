
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Bot, CalendarDays, Clock, ChevronRight, Search, BookOpen, Tag, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const blogPosts = [
  {
    id: 1,
    title: 'SuperAI ra mắt phiên bản mới với nhiều tính năng hấp dẫn',
    excerpt: 'Khám phá những tính năng mới nhất của SuperAI giúp nâng cao trải nghiệm người dùng và tăng cường khả năng sáng tạo.',
    date: '01/06/2023',
    readTime: '5 phút',
    category: 'Tin tức',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    author: 'Nguyễn Minh Tuấn',
    tags: ['Cập nhật', 'Tính năng mới', 'AI']
  },
  {
    id: 2,
    title: 'Hướng dẫn sử dụng công cụ Sáng tạo nội dung',
    excerpt: 'Bài viết hướng dẫn chi tiết cách sử dụng công cụ Sáng tạo nội dung để tạo ra những bài viết chất lượng cao.',
    date: '15/05/2023',
    readTime: '7 phút',
    category: 'Hướng dẫn',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    author: 'Trần Thị Mai Anh',
    tags: ['Sáng tạo', 'Nội dung', 'Hướng dẫn']
  },
  {
    id: 3,
    title: 'Tối ưu hóa việc sử dụng SuperAI trong công việc hàng ngày',
    excerpt: 'Những mẹo hữu ích giúp bạn tích hợp SuperAI vào quy trình làm việc hàng ngày, nâng cao hiệu suất và tiết kiệm thời gian.',
    date: '10/05/2023',
    readTime: '6 phút',
    category: 'Mẹo hay',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    author: 'Lê Văn Hùng',
    tags: ['Hiệu suất', 'Tối ưu', 'Mẹo hay']
  },
  {
    id: 4,
    title: 'So sánh SuperAI với các nền tảng AI khác trên thị trường',
    excerpt: 'Phân tích chi tiết về ưu điểm của SuperAI so với các nền tảng AI khác, giúp bạn có cái nhìn toàn diện về lựa chọn của mình.',
    date: '01/05/2023',
    readTime: '8 phút',
    category: 'Đánh giá',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    author: 'Nguyễn Minh Tuấn',
    tags: ['So sánh', 'Đánh giá', 'Thị trường AI']
  },
  {
    id: 5,
    title: 'Tương lai của AI và vai trò của SuperAI',
    excerpt: 'Tầm nhìn về tương lai của công nghệ AI và cách SuperAI định hình lại cách chúng ta làm việc và sáng tạo.',
    date: '20/04/2023',
    readTime: '10 phút',
    category: 'Xu hướng',
    image: 'https://images.unsplash.com/photo-1643116774075-acc00caa9a7b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    author: 'Trần Thị Mai Anh',
    tags: ['Tương lai', 'Công nghệ', 'Xu hướng AI']
  },
  {
    id: 6,
    title: 'Cách sử dụng WiseBase để quản lý kiến thức',
    excerpt: 'Hướng dẫn chi tiết về cách sử dụng WiseBase để lưu trữ, tổ chức và truy xuất thông tin một cách hiệu quả.',
    date: '15/04/2023',
    readTime: '6 phút',
    category: 'Hướng dẫn',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    author: 'Lê Văn Hùng',
    tags: ['WiseBase', 'Quản lý kiến thức', 'Hướng dẫn']
  },
  {
    id: 7,
    title: 'Bắt đầu với SuperAI: Hướng dẫn toàn diện cho người mới',
    excerpt: 'Bài viết chi tiết giúp người dùng mới làm quen với các tính năng cơ bản của SuperAI và bắt đầu sử dụng ngay.',
    date: '10/04/2023',
    readTime: '12 phút',
    category: 'Hướng dẫn',
    image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    author: 'Trần Thị Mai Anh',
    tags: ['Người mới', 'Bắt đầu', 'Hướng dẫn cơ bản']
  },
  {
    id: 8,
    title: 'Các mô hình AI được sử dụng trong SuperAI',
    excerpt: 'Giới thiệu chi tiết về các mô hình AI tiên tiến được tích hợp trong SuperAI và khả năng của từng mô hình.',
    date: '01/04/2023',
    readTime: '9 phút',
    category: 'Công nghệ',
    image: 'https://images.unsplash.com/photo-1620783770629-122b7f187703?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    author: 'Nguyễn Minh Tuấn',
    tags: ['Mô hình AI', 'Công nghệ', 'Kỹ thuật']
  },
];

const categories = [
  'Tất cả',
  'Tin tức',
  'Hướng dẫn',
  'Mẹo hay',
  'Đánh giá',
  'Xu hướng',
  'Công nghệ'
];

const popularTags = [
  'AI', 'Hướng dẫn', 'Công nghệ', 'Mẹo hay', 'Tối ưu', 'WiseBase', 'Sáng tạo'
];

const Blog: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen py-16 pt-24 md:pt-24">
        <div className="container px-4 mx-auto">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-6">
              <Bot size={16} /> Blog SuperAI
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Tin tức & Hướng dẫn <span className="text-gradient">mới nhất</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Cập nhật những tin tức mới nhất về SuperAI và các hướng dẫn chi tiết giúp bạn khai thác tối đa sức mạnh của nền tảng.
            </p>
            
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Tìm kiếm bài viết..." className="pl-10 pr-4 py-6" />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BookOpen size={18} /> Danh mục
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <Button 
                        key={index} 
                        variant={index === 0 ? "default" : "ghost"} 
                        className="w-full justify-start"
                        size="sm"
                      >
                        {category}
                        {index === 0 && <span className="ml-auto bg-white/20 text-xs py-0.5 px-1.5 rounded-full">8</span>}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Tag size={18} /> Thẻ phổ biến
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        className="rounded-full text-xs"
                        size="sm"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Nhận thông báo</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Đăng ký để nhận thông báo về các bài viết mới nhất
                  </p>
                  <Input placeholder="Email của bạn" className="mb-2" />
                  <Button className="w-full">Đăng ký</Button>
                </div>
              </div>
            </div>
            
            {/* Main Blog Content */}
            <div className="lg:col-span-3">
              {/* Content Tabs */}
              <Tabs defaultValue="all" className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="all">Tất cả</TabsTrigger>
                    <TabsTrigger value="tutorials">Hướng dẫn</TabsTrigger>
                    <TabsTrigger value="news">Tin tức</TabsTrigger>
                    <TabsTrigger value="trends">Xu hướng</TabsTrigger>
                  </TabsList>
                  
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter size={14} /> Bộ lọc
                  </Button>
                </div>
                
                <TabsContent value="all">
                  {/* Featured Post */}
                  <div className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-xl overflow-hidden shadow-lg">
                      <div className="h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${blogPosts[0].image})` }}></div>
                      <div className="p-8 bg-card flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-primary font-medium">{blogPosts[0].category}</div>
                          <div className="text-sm text-muted-foreground">{blogPosts[0].date}</div>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">{blogPosts[0].title}</h2>
                        <p className="text-muted-foreground mb-4">{blogPosts[0].excerpt}</p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                          <div className="flex items-center gap-2">
                            <CalendarDays size={14} />
                            <span>{blogPosts[0].date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            <span>{blogPosts[0].readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">Bởi: <span className="font-medium">{blogPosts[0].author}</span></div>
                          <Button className="w-fit">Đọc bài viết</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Blog Posts Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
                    {blogPosts.slice(1).map((post) => (
                      <Card key={post.id} className="border-0 shadow overflow-hidden hover:shadow-md transition-all">
                        <div 
                          className="h-48 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${post.image})` }}
                        >
                          <div className="flex justify-end p-4">
                            <div className="bg-black/60 text-white text-xs py-1 px-2 rounded">
                              {post.category}
                            </div>
                          </div>
                        </div>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-muted-foreground">
                              Bởi: <span className="font-medium">{post.author}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {post.date}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                          <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, idx) => (
                              <span key={idx} className="text-xs bg-primary/10 text-primary py-0.5 px-2 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>{post.readTime}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary p-0">
                              <span className="flex items-center gap-1">
                                Xem thêm <ChevronRight size={14} />
                              </span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  <div className="flex justify-center mb-12">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled>Trước</Button>
                      <Button variant="default" size="sm">1</Button>
                      <Button variant="outline" size="sm">2</Button>
                      <Button variant="outline" size="sm">3</Button>
                      <Button variant="outline" size="sm">Sau</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="tutorials">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Xem các hướng dẫn sử dụng SuperAI</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="news">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Xem tin tức mới nhất về SuperAI</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="trends">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Khám phá các xu hướng mới về AI</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="max-w-3xl mx-auto py-12 px-6 md:px-12 bg-primary/5 rounded-xl text-center mt-16">
            <h2 className="text-2xl font-bold mb-4">Đăng ký nhận bản tin</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Cập nhật những tin tức mới nhất và hướng dẫn hữu ích về SuperAI được gửi trực tiếp vào email của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input placeholder="Email của bạn" className="flex-1" />
              <Button>Đăng ký</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
