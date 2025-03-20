
import React from 'react';
import Layout from '../components/layout/Layout';
import { 
  BrainCircuit, 
  Code, 
  BarChart4, 
  FileText, 
  Megaphone, 
  GraduationCap, 
  Headphones, 
  Search 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Tool {
  icon: React.ReactNode;
  title: string;
  description: string;
  comingSoon?: boolean;
  path?: string;
  onClick?: () => void;
}

const Tools: React.FC = () => {
  const navigate = useNavigate();

  const professionalTools: Tool[] = [
    {
      icon: <BrainCircuit size={24} />,
      title: 'Market Intelligence Navigator',
      description: 'Phân tích thị trường và chiến lược kinh doanh',
      path: '/chat',
      onClick: () => {
        toast.success('Khởi động Market Intelligence Navigator');
        localStorage.setItem('chatContext', 'market_intelligence');
      }
    },
    {
      icon: <BarChart4 size={24} />,
      title: 'Data Analysis Accelerator',
      description: 'Phân tích dữ liệu và tạo báo cáo thông minh',
      path: '/chat',
      onClick: () => {
        toast.success('Khởi động Data Analysis Accelerator');
        localStorage.setItem('chatContext', 'data_analysis');
      }
    },
    {
      icon: <Code size={24} />,
      title: 'Intelligent Code Advisor',
      description: 'Hỗ trợ lập trình và phát triển mã',
      path: '/chat',
      onClick: () => {
        toast.success('Khởi động Intelligent Code Advisor');
        localStorage.setItem('chatContext', 'code_advisor');
      }
    },
    {
      icon: <Megaphone size={24} />,
      title: 'Marketing Strategy Architect',
      description: 'Hỗ trợ marketing và tạo nội dung quảng cáo',
      comingSoon: true,
    },
    {
      icon: <GraduationCap size={24} />,
      title: 'Academic Writing Companion',
      description: 'Hỗ trợ nghiên cứu học thuật và viết lách',
      comingSoon: true,
    },
    {
      icon: <FileText size={24} />,
      title: 'Content Creation Suite',
      description: 'Tạo và chỉnh sửa nội dung chuyên nghiệp',
      path: '/chat',
      onClick: () => {
        toast.success('Khởi động Content Creation Suite');
        localStorage.setItem('chatContext', 'content_creation');
      }
    },
    {
      icon: <Headphones size={24} />,
      title: 'Customer Support Expert',
      description: 'Hỗ trợ dịch vụ khách hàng và giao tiếp',
      comingSoon: true,
    },
    {
      icon: <Search size={24} />,
      title: 'Literature Research Navigator',
      description: 'Tìm kiếm và tổng hợp tài liệu học thuật',
      comingSoon: true,
    },
  ];

  const handleToolClick = (tool: Tool) => {
    if (tool.comingSoon) {
      toast.info('Tính năng này sẽ sớm ra mắt!');
      return;
    }
    
    if (tool.onClick) {
      tool.onClick();
    }
    
    if (tool.path) {
      navigate(tool.path);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Bộ Công Cụ Chuyên Nghiệp</h1>
          <p className="text-muted-foreground max-w-3xl">
            SuperAI cung cấp các công cụ chuyên nghiệp được thiết kế cho nhiều vai trò chuyên môn khác nhau, 
            từ phân tích kinh doanh đến lập trình và nghiên cứu học thuật.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {professionalTools.map((tool, index) => (
            <div
              key={index}
              onClick={() => handleToolClick(tool)}
              className={`superai-card p-6 relative overflow-hidden ${
                tool.comingSoon ? 'opacity-80 cursor-default' : 'cursor-pointer hover:bg-accent/50 transition-all duration-200'
              }`}
            >
              {tool.comingSoon && (
                <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  Sắp ra mắt
                </div>
              )}
              
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                {tool.icon}
              </div>
              
              <h3 className="font-medium text-lg mb-2">{tool.title}</h3>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-muted rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Cần công cụ tùy chỉnh?</h2>
              <p className="text-muted-foreground mb-6">
                SuperAI có thể được tùy chỉnh để phù hợp với nhu cầu cụ thể của bạn hoặc tổ chức của bạn.
                Chúng tôi có thể xây dựng các công cụ chuyên biệt dựa trên dữ liệu và yêu cầu của bạn.
              </p>
              
              <button 
                className="bg-primary text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all button-effect"
                onClick={() => toast.success('Cảm ơn bạn đã quan tâm! Chúng tôi sẽ liên hệ sớm.')}
              >
                Liên hệ với chúng tôi
              </button>
            </div>
            
            <div className="flex-1 flex justify-center">
              <div className="glass h-48 w-48 rounded-full flex items-center justify-center">
                <BrainCircuit size={64} className="text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tools;
