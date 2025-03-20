
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
    <div className="w-full bg-sidebar border-b border-sidebar-border fixed top-0 left-0 z-10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <Link to="/" className="flex items-center gap-2 mr-8">
            <Bot size={24} className="text-primary" />
            <span className="font-semibold text-xl">SuperAI</span>
          </Link>
          
          <nav className="flex items-center space-x-1 overflow-x-auto scrollbar-none">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
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
          
          <div className="ml-auto hidden md:flex items-center">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                <span className="text-sm font-medium">S</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
