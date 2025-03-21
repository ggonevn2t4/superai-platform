
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Bot, CalendarDays, Clock, ChevronRight, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'SuperAI ra mắt phiên bản mới với nhiều tính năng hấp dẫn',
    excerpt: 'Khám phá những tính năng mới nhất của SuperAI giúp nâng cao trải nghiệm người dùng và tăng cường khả năng sáng tạo.',
    date: '01/06/2023',
    readTime: '5 phút',
    category: 'Tin tức',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 2,
    title: 'Hướng dẫn sử dụng công cụ Sáng tạo nội dung',
    excerpt: 'Bài viết hướng dẫn chi tiết cách sử dụng công cụ Sáng tạo nội dung để tạo ra những bài viết chất lượng cao.',
    date: '15/05/2023',
    readTime: '7 phút',
    category: 'Hướng dẫn',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 3,
    title: 'Tối ưu hóa việc sử dụng SuperAI trong công việc hàng ngày',
    excerpt: 'Những mẹo hữu ích giúp bạn tích hợp SuperAI vào quy trình làm việc hàng ngày, nâng cao hiệu suất và tiết kiệm thời gian.',
    date: '10/05/2023',
    readTime: '6 phút',
    category: 'Mẹo hay',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 4,
    title: 'So sánh SuperAI với các nền tảng AI khác trên thị trường',
    excerpt: 'Phân tích chi tiết về ưu điểm của SuperAI so với các nền tảng AI khác, giúp bạn có cái nhìn toàn diện về lựa chọn của mình.',
    date: '01/05/2023',
    readTime: '8 phút',
    category: 'Đánh giá',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 5,
    title: 'Tương lai của AI và vai trò của SuperAI',
    excerpt: 'Tầm nhìn về tương lai của công nghệ AI và cách SuperAI định hình lại cách chúng ta làm việc và sáng tạo.',
    date: '20/04/2023',
    readTime: '10 phút',
    category: 'Xu hướng',
    image: 'https://images.unsplash.com/photo-1643116774075-acc00caa9a7b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 6,
    title: 'Cách sử dụng WiseBase để quản lý kiến thức',
    excerpt: 'Hướng dẫn chi tiết về cách sử dụng WiseBase để lưu trữ, tổ chức và truy xuất thông tin một cách hiệu quả.',
    date: '15/04/2023',
    readTime: '6 phút',
    category: 'Hướng dẫn',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
];

const categories = [
  'Tất cả',
  'Tin tức',
  'Hướng dẫn',
  'Mẹo hay',
  'Đánh giá',
  'Xu hướng'
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

          {/* Categories */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => (
                <Button 
                  key={index} 
                  variant={index === 0 ? "default" : "outline"} 
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-xl overflow-hidden shadow-lg">
              <div className="h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${blogPosts[0].image})` }}></div>
              <div className="p-8 bg-card flex flex-col justify-center">
                <div className="text-sm text-primary font-medium mb-2">{blogPosts[0].category}</div>
                <h2 className="text-2xl font-bold mb-4">{blogPosts[0].title}</h2>
                <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
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
                <Button className="w-fit">Đọc bài viết</Button>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="border-0 shadow overflow-hidden hover:shadow-md transition-all">
                <div 
                  className="h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${post.image})` }}
                ></div>
                <CardContent className="pt-6">
                  <div className="text-sm text-primary font-medium mb-2">{post.category}</div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarDays size={14} />
                        <span>{post.date}</span>
                      </div>
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

          {/* Newsletter Section */}
          <div className="max-w-3xl mx-auto py-12 px-6 md:px-12 bg-primary/5 rounded-xl text-center">
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
