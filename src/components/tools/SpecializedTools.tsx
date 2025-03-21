
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Bot, Code, FileText, Brain, Image, Search, ArrowRight, Globe, Volume2 } from 'lucide-react';
import TextToSpeech from './TextToSpeech';
import WebBrowser from './WebBrowser';

interface AITool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  context: string;
  comingSoon?: boolean;
}

const SpecializedTools: React.FC = () => {
  const navigate = useNavigate();

  const tools: AITool[] = [
    {
      id: 'code_advisor',
      title: 'Lập trình và phát triển',
      description: 'Trợ lý AI chuyên về lập trình, phát triển phần mềm và giải quyết vấn đề kỹ thuật',
      icon: <Code className="h-8 w-8 text-blue-500" />,
      context: 'code_advisor'
    },
    {
      id: 'content_creation',
      title: 'Tạo nội dung',
      description: 'Tạo văn bản, blog, quảng cáo và nội dung sáng tạo với trợ lý AI',
      icon: <FileText className="h-8 w-8 text-green-500" />,
      context: 'content_creation'
    },
    {
      id: 'data_analysis',
      title: 'Phân tích dữ liệu',
      description: 'Phân tích, trực quan hóa dữ liệu và đưa ra các insights từ dữ liệu của bạn',
      icon: <Brain className="h-8 w-8 text-violet-500" />,
      context: 'data_analysis'
    },
    {
      id: 'image_analysis',
      title: 'Phân tích hình ảnh',
      description: 'Upload và phân tích hình ảnh để trích xuất thông tin và hiểu nội dung',
      icon: <Image className="h-8 w-8 text-amber-500" />,
      context: 'image_analysis'
    },
    {
      id: 'market_intelligence',
      title: 'Phân tích thị trường',
      description: 'Hiểu thị trường, phân tích đối thủ và đưa ra các strategies kinh doanh',
      icon: <Search className="h-8 w-8 text-red-500" />,
      context: 'market_intelligence'
    },
    {
      id: 'custom_chat',
      title: 'Trò chuyện tùy chỉnh',
      description: 'Trò chuyện thông minh với AI trợ lý đa năng',
      icon: <Bot className="h-8 w-8 text-primary" />,
      context: null
    }
  ];

  const handleSelectTool = (tool: AITool) => {
    if (tool.comingSoon) return;
    
    if (tool.context) {
      // Store the context in localStorage for the chat page to pick up
      localStorage.setItem('chatContext', tool.context);
    }
    
    // Navigate to the chat page
    navigate('/chat');
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Công cụ AI chuyên biệt</h2>
        <p className="text-muted-foreground mt-1">Chọn công cụ phù hợp cho từng nhiệm vụ cụ thể của bạn</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Card 
            key={tool.id} 
            className={`group overflow-hidden transition-all ${tool.comingSoon ? 'opacity-70' : 'hover:shadow-md'}`}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-primary/10">
                  {tool.icon}
                </div>
                {tool.comingSoon && (
                  <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                    Sắp ra mắt
                  </div>
                )}
              </div>
              <CardTitle className="mt-4">{tool.title}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                onClick={() => handleSelectTool(tool)} 
                disabled={tool.comingSoon}
                className="w-full justify-between group-hover:bg-primary/90 transition-colors"
              >
                <span>{tool.comingSoon ? 'Đang phát triển' : 'Bắt đầu ngay'}</span>
                <ArrowRight size={16} className="opacity-70 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-10 mb-6">
        <h2 className="text-2xl font-bold">Công cụ bổ sung</h2>
        <p className="text-muted-foreground mt-1">Các tiện ích AI hữu ích khác</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextToSpeech />
        <WebBrowser />
      </div>
    </div>
  );
};

export default SpecializedTools;
