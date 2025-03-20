
import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import { Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="py-6 px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Bot size={24} className="text-primary" />
          <span className="font-semibold text-xl">SuperAI</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
            Chat
          </Link>
          <Link to="/tools" className="text-muted-foreground hover:text-foreground transition-colors">
            Công cụ
          </Link>
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Tính năng
          </a>
        </nav>
        
        <Link
          to="/chat"
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-sm hover:shadow-md transition-all button-effect"
        >
          Bắt đầu <ArrowRight size={16} />
        </Link>
      </header>
      
      <main>
        <Hero />
        
        <div id="features">
          <Features />
        </div>
        
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Bắt đầu trải nghiệm ngay hôm nay</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
              SuperAI kết hợp các công nghệ AI tiên tiến nhất để mang đến trải nghiệm toàn diện nhất cho bạn.
            </p>
            
            <Link
              to="/chat"
              className="bg-primary text-white px-8 py-4 rounded-lg font-medium inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all button-effect"
            >
              Bắt đầu trò chuyện với SuperAI <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Bot size={24} className="text-primary" />
              <span className="font-semibold text-xl">SuperAI</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SuperAI. Nền tảng AI toàn diện.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
