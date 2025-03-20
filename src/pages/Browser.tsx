
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Search, Globe, BookmarkIcon, Clock, History } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Browser: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [iframeUrl, setIframeUrl] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<{title: string, url: string}[]>([
    {title: 'Google', url: 'https://www.google.com'},
    {title: 'Wikipedia', url: 'https://www.wikipedia.org'},
    {title: 'YouTube', url: 'https://www.youtube.com'},
  ]);

  const handleSearch = () => {
    let processedUrl = url;
    
    // Add https:// if missing
    if (!/^https?:\/\//i.test(processedUrl)) {
      processedUrl = 'https://' + processedUrl;
    }
    
    setIframeUrl(processedUrl);
    
    // Add to history if not already there
    if (!searchHistory.includes(processedUrl)) {
      setSearchHistory(prev => [processedUrl, ...prev].slice(0, 10));
    }
  };

  const addBookmark = () => {
    const title = prompt('Nhập tên trang web:');
    if (title && iframeUrl) {
      setBookmarks(prev => [...prev, {title, url: iframeUrl}]);
      toast.success('Đã thêm vào bookmarks');
    }
  };

  const navigateTo = (selectedUrl: string) => {
    setUrl(selectedUrl);
    setIframeUrl(selectedUrl);
    
    // Add to history if not already there
    if (!searchHistory.includes(selectedUrl)) {
      setSearchHistory(prev => [selectedUrl, ...prev].slice(0, 10));
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <header className="mb-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary font-medium text-sm mb-2">
            <Globe size={16} /> Web Browser
          </div>
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <span className="text-gradient bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Trình duyệt web thông minh</span>
          </h1>
          <p className="text-muted-foreground">
            Duyệt web ngay trong ứng dụng SuperAI và sử dụng các công cụ AI tích hợp
          </p>
        </header>
        
        <div className="mb-6 flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              className="pl-10 pr-4"
              placeholder="Nhập URL hoặc tìm kiếm..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch}>Truy cập</Button>
          {iframeUrl && (
            <Button variant="outline" onClick={addBookmark}>
              <BookmarkIcon size={18} />
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Tabs defaultValue="bookmarks">
              <TabsList className="w-full">
                <TabsTrigger value="bookmarks" className="flex-1">
                  <BookmarkIcon size={16} className="mr-2" /> Bookmarks
                </TabsTrigger>
                <TabsTrigger value="history" className="flex-1">
                  <History size={16} className="mr-2" /> Lịch sử
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="bookmarks" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Trang đã lưu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {bookmarks.map((bookmark, index) => (
                        <div 
                          key={index} 
                          className="flex items-center p-2 rounded-md hover:bg-accent cursor-pointer"
                          onClick={() => navigateTo(bookmark.url)}
                        >
                          <Globe size={16} className="mr-2 text-muted-foreground" />
                          <span className="text-sm">{bookmark.title}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Lịch sử duyệt web</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {searchHistory.length > 0 ? (
                        searchHistory.map((item, index) => (
                          <div 
                            key={index} 
                            className="flex items-center p-2 rounded-md hover:bg-accent cursor-pointer"
                            onClick={() => navigateTo(item)}
                          >
                            <Clock size={16} className="mr-2 text-muted-foreground" />
                            <span className="text-sm truncate">{item}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">Chưa có lịch sử duyệt web</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="md:col-span-3 h-[600px] rounded-lg border overflow-hidden bg-white dark:bg-slate-950">
            {iframeUrl ? (
              <iframe 
                src={iframeUrl} 
                className="w-full h-full"
                title="Browser"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted/30">
                <div className="text-center">
                  <Globe size={48} className="mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-medium mb-2">Nhập URL để bắt đầu duyệt web</h3>
                  <p className="text-sm text-muted-foreground">
                    Bạn có thể truy cập bất kỳ trang web nào trực tiếp từ SuperAI
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Browser;
