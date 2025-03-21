
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, Globe, ArrowRight } from "lucide-react";

const WebBrowser: React.FC = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<null | any>(null);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error("Vui lòng nhập URL hoặc từ khóa tìm kiếm");
      return;
    }
    
    setIsLoading(true);
    setSearchResults(null);
    
    try {
      // Integrate with Supabase functions for web browsing
      const { data, error } = await fetch('/api/web-browse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: url })
      }).then(res => res.json());
      
      if (error) throw new Error(error);
      
      toast.success("Đã tìm kiếm thành công");
      setSearchResults(data);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      toast.error("Lỗi khi tìm kiếm. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-lg bg-primary/10">
            <Globe className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <CardTitle className="mt-4">Trình duyệt web</CardTitle>
        <CardDescription>Truy cập và phân tích thông tin từ web với trợ lý AI</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Nhập URL hoặc từ khóa tìm kiếm..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !url.trim()}
              className="flex items-center gap-1"
            >
              <Search size={16} />
              {isLoading ? "Đang tìm..." : "Tìm kiếm"}
            </Button>
          </div>
          
          {searchResults && (
            <div className="mt-4 space-y-4">
              <h4 className="text-sm font-medium">Kết quả</h4>
              <div className="rounded-md border p-4 bg-muted/50">
                <div className="prose prose-sm dark:prose-invert">
                  <p>Chức năng này sẽ hiển thị kết quả phân tích trang web tại đây.</p>
                  <p>Để triển khai đầy đủ, cần cấu hình Edge Function với Supabase.</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Lưu ý: Chức năng này yêu cầu cấu hình edge function trong Supabase
              </p>
            </div>
          )}
        </form>
      </CardContent>
      
      <CardFooter>
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => window.open("/browser", "_blank")}
        >
          <span>Đến trình duyệt web nâng cao</span>
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WebBrowser;
