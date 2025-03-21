
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Index from './pages/Index';
import Chat from './pages/Chat';
import Auth from './pages/Auth';
import Browser from './pages/Browser';
import Creative from './pages/Creative';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Pricing from './pages/Pricing';
import PaymentDetails from './pages/PaymentDetails';
import WiseBase from './pages/WiseBase';
import Admin from './pages/Admin';
import Documentation from './pages/Documentation';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import SharedChat from './pages/SharedChat';
import Tools from './pages/Tools';
import Tutorials from './pages/Tutorials';
import Help from './pages/Help';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/payment/verify" element={<PaymentDetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/shared/:id" element={<SharedChat />} />
            <Route path="/help" element={<Help />} />
            
            <Route path="/chat" element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } />
            <Route path="/browser" element={
              <ProtectedRoute>
                <Browser />
              </ProtectedRoute>
            } />
            <Route path="/creative" element={
              <ProtectedRoute>
                <Creative />
              </ProtectedRoute>
            } />
            <Route path="/wisebase" element={
              <ProtectedRoute>
                <WiseBase />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/docs" element={
              <ProtectedRoute>
                <Documentation />
              </ProtectedRoute>
            } />
            <Route path="/tools" element={
              <ProtectedRoute>
                <Tools />
              </ProtectedRoute>
            } />
            <Route path="/tutorials" element={
              <ProtectedRoute>
                <Tutorials />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
