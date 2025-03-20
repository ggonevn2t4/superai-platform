
import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import { Bot, ArrowRight, Sparkles, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="py-6 px-8 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-all duration-300">
            <Bot size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">SuperAI</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/chat" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Chat
          </Link>
          <Link to="/tools" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Công cụ
          </Link>
          <a href="#features" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Tính năng
          </a>
        </nav>
        
        <Link
          to="/chat"
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-sm hover:shadow-md transition-all button-effect group"
        >
          Bắt đầu <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </header>
      
      <main>
        <Hero />
        
        <div id="features">
          <Features />
        </div>
        
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-blue-700 font-medium text-sm mb-6">
              <Sparkles size={16} className="text-blue-500" /> Trải nghiệm ngay hôm nay
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Bắt đầu trải nghiệm <span className="text-gradient">SuperAI</span> ngay</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
              SuperAI kết hợp các công nghệ AI tiên tiến nhất để mang đến trải nghiệm toàn diện nhất cho bạn.
            </p>
            
            <Link
              to="/chat"
              className="bg-primary text-white px-8 py-4 rounded-lg font-medium inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all button-effect group"
            >
              Bắt đầu trò chuyện với SuperAI <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0 group">
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-all duration-300">
                <Bot size={20} className="text-primary" />
              </div>
              <span className="font-bold text-xl">SuperAI</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
            
            <div className="text-sm text-muted-foreground mt-6 md:mt-0">
              &copy; {new Date().getFullYear()} SuperAI. Nền tảng AI toàn diện.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
