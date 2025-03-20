
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot, SearchCode, Sparkles, Layers, BookOpen, BrainCircuit, MessageSquare } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: <MessageSquare size={20} />, label: 'Chat', path: '/chat' },
    { icon: <BrainCircuit size={20} />, label: 'Tools', path: '/tools' },
    { icon: <SearchCode size={20} />, label: 'Trình duyệt', path: '/browser' },
    { icon: <Sparkles size={20} />, label: 'Sáng tạo', path: '/creative' },
    { icon: <Layers size={20} />, label: 'Wisebase', path: '/wisebase' },
    { icon: <BookOpen size={20} />, label: 'Trợ giúp', path: '/help' },
  ];
  
  return (
    <div className="w-[280px] h-screen overflow-y-auto border-r bg-sidebar border-sidebar-border fixed left-0 top-0 z-10 shadow-sm animate-slide-in-left">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <Bot size={24} className="text-primary" />
            <span className="font-semibold text-xl">SuperAI</span>
          </Link>
          
          <nav className="space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-sidebar-accent text-sidebar-primary font-medium'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6">
          <div className="glass rounded-xl p-4 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
              <span className="text-sm font-medium">S</span>
            </div>
            <div>
              <p className="text-sm font-medium">SuperAI</p>
              <p className="text-xs text-muted-foreground">Nền tảng AI toàn diện</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
