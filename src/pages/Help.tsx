
import React from 'react';
import Layout from '../components/layout/Layout';
import { BookOpen, Search, HelpCircle, MessageCircle, FileText, Video, BookMarked, ChevronRight, PenLine, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Help: React.FC = () => {
  const popularTopics = [
    { 
      title: 'Bắt đầu với SuperAI', 
      icon: <Lightbulb size={38} className="text-primary" />,
      description: 'Hướng dẫn cơ bản dành cho người mới bắt đầu sử dụng nền tảng'
    },
    { 
      title: 'Sử dụng chat AI hiệu quả', 
      icon: <MessageCircle size={38} className="text-blue-500" />,
      description: 'Các kỹ thuật và mẹo để tận dụng tối đa trợ lý AI'
    },
    { 
      title: 'Công cụ sáng tạo', 
      icon: <PenLine size={38} className="text-purple-500" />,
      description: 'Cách sử dụng các công cụ sáng tạo để tạo nội dung chất lượng'
    },
    { 
      title: 'Quản lý tri thức với WiseBase', 
      icon: <BookMarked size={38} className="text-green-500" />,
      description: 'Tổ chức và lưu trữ thông tin hiệu quả với WiseBase'
    },
  ];

  const faqItems = [
    { 
      question: 'SuperAI có những tính năng chính nào?',
      answer: 'SuperAI cung cấp nhiều tính năng tích hợp trí tuệ nhân tạo, bao gồm chat thông minh, công cụ sáng tạo tạo hình ảnh và văn bản, trình duyệt web tích hợp AI, và hệ thống quản lý tri thức WiseBase. Tất cả đều được thiết kế để tăng cường năng suất và sáng tạo của bạn.'
    },
    { 
      question: 'Làm thế nào để sử dụng chat với AI hiệu quả nhất?',
      answer: 'Để sử dụng chat hiệu quả, bạn nên cung cấp yêu cầu rõ ràng và chi tiết. Chia nhỏ các vấn đề phức tạp thành những câu hỏi cụ thể, và sử dụng tính năng theo dõi cuộc trò chuyện để AI hiểu ngữ cảnh. Bạn cũng có thể điều chỉnh các tham số như mô hình AI và mức độ sáng tạo trong phần cài đặt chat.'
    },
    { 
      question: 'Dữ liệu của tôi có an toàn khi sử dụng SuperAI không?',
      answer: 'SuperAI cam kết bảo vệ dữ liệu của người dùng. Chúng tôi sử dụng biện pháp mã hóa tiên tiến, không lưu trữ cuộc trò chuyện lâu dài trừ khi bạn chọn lưu, và tuân thủ các quy định bảo vệ dữ liệu. Bạn có thể tìm hiểu thêm trong chính sách bảo mật của chúng tôi.'
    },
    { 
      question: 'SuperAI có hỗ trợ nhiều ngôn ngữ không?',
      answer: 'Có, SuperAI hỗ trợ nhiều ngôn ngữ bao gồm tiếng Việt, tiếng Anh, và nhiều ngôn ngữ phổ biến khác. Hệ thống có thể tự động nhận diện ngôn ngữ bạn đang sử dụng và phản hồi bằng cùng ngôn ngữ đó.'
    },
    { 
      question: 'Làm thế nào để lưu trữ và quản lý tài liệu trong WiseBase?',
      answer: 'Để lưu trữ tài liệu trong WiseBase, bạn có thể tạo thư mục và phân loại theo chủ đề. Hệ thống cho phép bạn thêm thẻ (tags), tìm kiếm nhanh chóng, và tổ chức thông tin một cách hiệu quả. Bạn cũng có thể đồng bộ dữ liệu giữa các thiết bị và chia sẻ với người khác khi cần.'
    },
    { 
      question: 'Làm thế nào để sử dụng công cụ sáng tạo để tạo hình ảnh?',
      answer: 'Để tạo hình ảnh, hãy truy cập trang Sáng tạo, chọn tính năng "Hình ảnh" và nhập mô tả chi tiết về hình ảnh bạn muốn tạo. Bạn có thể chỉ định tỷ lệ khung hình, phong cách và các tham số khác. Hệ thống sẽ xử lý yêu cầu và tạo hình ảnh phù hợp với mô tả của bạn.'
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary font-medium text-sm mb-2">
            <BookOpen size={16} /> Trung tâm trợ giúp
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
            <span className="text-gradient bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Bạn cần hỗ trợ với điều gì?</span>
          </h1>
          
          <div className="max-w-2xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input 
              className="pl-10 pr-4 h-12 text-lg" 
              placeholder="Tìm kiếm hướng dẫn, câu hỏi, tài liệu..."
            />
          </div>
        </header>
        
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6">Chủ đề phổ biến</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTopics.map((topic, index) => (
              <Card key={index} className="hover:shadow-md transition-all hover:border-primary/50 cursor-pointer">
                <CardHeader>
                  <div className="mb-2">
                    {topic.icon}
                  </div>
                  <CardTitle>{topic.title}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="ghost" className="gap-1 text-primary">
                    Đọc thêm <ChevronRight size={16} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-6">Câu hỏi thường gặp</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-6">Tài nguyên bổ sung</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <FileText size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Tài liệu hướng dẫn</h3>
                      <p className="text-sm text-muted-foreground mb-2">Tài liệu chi tiết về tất cả tính năng</p>
                      <Button variant="link" className="px-0 h-auto text-primary">
                        Xem tài liệu
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Video size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Video hướng dẫn</h3>
                      <p className="text-sm text-muted-foreground mb-2">Học cách sử dụng SuperAI qua video</p>
                      <Button variant="link" className="px-0 h-auto text-primary">
                        Xem thư viện video
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <MessageCircle size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Hỗ trợ trực tiếp</h3>
                      <p className="text-sm text-muted-foreground mb-2">Liên hệ với đội ngũ hỗ trợ của chúng tôi</p>
                      <Button variant="link" className="px-0 h-auto text-primary">
                        Liên hệ hỗ trợ
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="mb-10">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 pb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <HelpCircle size={32} className="text-primary" />
                  <div>
                    <h3 className="text-lg font-medium">Vẫn cần trợ giúp?</h3>
                    <p className="text-muted-foreground">Đội ngũ hỗ trợ của chúng tôi sẵn sàng giúp đỡ bạn</p>
                  </div>
                </div>
                <Button className="gap-2">
                  <MessageCircle size={16} /> Liên hệ hỗ trợ
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default Help;
