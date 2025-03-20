
import React from 'react';
import { 
  MessageSquare, 
  SearchCode, 
  FileEdit, 
  Globe, 
  Sparkles, 
  Bot, 
  BrainCircuit, 
  Database, 
  FileText, 
  Headphones, 
  BarChart4, 
  Code, 
  Megaphone, 
  GraduationCap 
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <MessageSquare size={24} />,
    title: 'Giao Diện Chat AI Nâng Cao',
    description: 'Tích hợp với các mô hình AI tiên tiến, nghiên cứu sâu và tóm tắt thông tin.'
  },
  {
    icon: <SearchCode size={24} />,
    title: 'Tiện Ích Trình Duyệt Toàn Diện',
    description: 'Hỗ trợ giải thích văn bản, dịch trang web, và tóm tắt nội dung trực tiếp.'
  },
  {
    icon: <FileEdit size={24} />,
    title: 'Công Cụ Tạo và Chỉnh Sửa Nội Dung',
    description: 'Tạo, chỉnh sửa, và cải thiện nội dung với hơn 80 mẫu sẵn có.'
  },
  {
    icon: <Globe size={24} />,
    title: 'Tìm Kiếm và Tương Tác Web',
    description: 'Tìm kiếm web thông minh với khả năng truy cập thời gian thực và dịch thuật.'
  },
  {
    icon: <Sparkles size={24} />,
    title: 'Công Cụ Sáng Tạo',
    description: 'Tính năng tạo hình ảnh AI để hỗ trợ các dự án sáng tạo của bạn.'
  },
  {
    icon: <Bot size={24} />,
    title: 'Nền Tảng Bot và Tự Động Hóa',
    description: 'Tạo bot và tự động hóa nhiệm vụ bằng cách tích hợp AI với nội dung web.'
  },
  {
    icon: <BrainCircuit size={24} />,
    title: 'Bộ Công Cụ Chuyên Nghiệp',
    description: 'Các công cụ dành cho nhiều vai trò chuyên môn khác nhau.'
  },
  {
    icon: <Database size={24} />,
    title: 'Hệ Thống Quản Lý Tri Thức',
    description: 'Lưu trữ, tổ chức và tương tác với báo cáo nghiên cứu và tài liệu web.'
  },
  {
    icon: <FileText size={24} />,
    title: 'Tóm Tắt và Giải Thích',
    description: 'Tóm tắt nội dung phức tạp từ web, video hoặc văn bản.'
  },
  {
    icon: <Headphones size={24} />,
    title: 'Hỗ Trợ Giao Tiếp và Dịch Vụ Khách Hàng',
    description: 'Phân tích email và tạo phản hồi thông minh cho khách hàng.'
  },
  {
    icon: <BarChart4 size={24} />,
    title: 'Phân Tích Dữ Liệu và Trực Quan Hóa',
    description: 'Công cụ phân tích dữ liệu, tạo biểu đồ và báo cáo thông minh.'
  },
  {
    icon: <Code size={24} />,
    title: 'Hỗ Trợ Phát Triển và Lập Trình',
    description: 'Hỗ trợ viết mã, gỡ lỗi và cung cấp gợi ý lập trình.'
  },
  {
    icon: <Megaphone size={24} />,
    title: 'Hỗ Trợ Marketing và Chiến Lược',
    description: 'Phân tích thị trường, tạo chiến lược marketing, và tạo nội dung quảng cáo.'
  },
  {
    icon: <GraduationCap size={24} />,
    title: 'Hỗ Trợ Nghiên Cứu và Học Thuật',
    description: 'Hỗ trợ tìm kiếm tài liệu, tạo trích dẫn và viết lách học thuật.'
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in-bottom">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Các Tính Năng Chính</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            SuperAI tích hợp đầy đủ các công cụ AI tiên tiến trong một nền tảng thống nhất, giúp bạn làm việc hiệu quả hơn.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="superai-card p-6 hover:translate-y-[-4px] animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex gap-4 items-start">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
