
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, BrainCircuit, ArrowRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 -z-10" />
      
      {/* Background decorations */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute top-1/2 -left-12 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-40" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-12 animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-primary p-3 rounded-2xl">
              <Bot size={28} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              SuperAI
            </h1>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-balance">
            Nền Tảng AI <span className="text-gradient">Toàn Diện</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mb-8 text-balance">
            Kết hợp chat với các mô hình AI tiên tiến, công cụ sáng tạo, và bộ công cụ chuyên nghiệp trong một nền tảng thống nhất.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              to="/chat"
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all button-effect"
            >
              Bắt đầu trò chuyện <ArrowRight size={18} />
            </Link>
            
            <Link
              to="/tools"
              className="bg-white text-foreground border px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all button-effect"
            >
              Khám phá công cụ <BrainCircuit size={18} />
            </Link>
          </div>
        </div>
        
        {/* Preview Image */}
        <div className="relative mx-auto max-w-5xl animate-fade-in">
          <div className="glass rounded-2xl overflow-hidden shadow-xl border border-white/20">
            <div className="bg-sidebar border-b p-4 flex items-center gap-3">
              <Bot size={20} className="text-primary" />
              <span className="font-medium">SuperAI Chat Interface</span>
            </div>
            <div className="bg-white p-8">
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="bg-primary h-8 w-8 rounded-md flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium">SuperAI</p>
                    <p className="text-sm">Chào mừng đến với SuperAI! Tôi có thể giúp bạn nghiên cứu, tóm tắt thông tin, tạo nội dung, và nhiều hơn nữa.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="bg-secondary h-8 w-8 rounded-md flex items-center justify-center flex-shrink-0">
                    <Sparkles size={16} />
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium">SuperAI trang bị đa năng</p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">Nghiên cứu sâu</span>
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs">Tóm tắt thông tin</span>
                      <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs">Tạo nội dung</span>
                      <span className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">Phân tích dữ liệu</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full rounded-2xl bg-gradient-to-r from-blue-200 to-indigo-200 blur-md opacity-30" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
