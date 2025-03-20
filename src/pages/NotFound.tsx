
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Bot, Home, ArrowLeft } from "lucide-react";

const NotFound: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-gray-50">
      <div className="glass text-center p-10 rounded-2xl max-w-md w-full animate-fade-in">
        <div className="mb-6 mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot size={40} className="text-primary" />
        </div>
        
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Không tìm thấy trang này
        </p>
        
        <p className="text-muted-foreground mb-8">
          Đường dẫn <code className="bg-muted px-2 py-1 rounded text-sm">{location.pathname}</code> không tồn tại trong hệ thống SuperAI.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-input hover:bg-accent transition-all button-effect"
          >
            <Home size={18} /> Trang chủ
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all button-effect"
          >
            <ArrowLeft size={18} /> Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
