
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Layers, Search, FolderPlus, Plus, Tags, Edit2, Grid, List, BookOpen, FolderOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const WiseBase: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const folders = [
    { id: 1, name: 'Lập trình', documentsCount: 12, tags: ['Công nghệ', 'Học tập'] },
    { id: 2, name: 'Marketing', documentsCount: 8, tags: ['Kinh doanh', 'Chiến lược'] },
    { id: 3, name: 'Dự án cá nhân', documentsCount: 5, tags: ['Cá nhân', 'Quản lý'] },
    { id: 4, name: 'Tài liệu học tập', documentsCount: 15, tags: ['Học tập', 'Nghiên cứu'] },
    { id: 5, name: 'Ý tưởng kinh doanh', documentsCount: 7, tags: ['Kinh doanh', 'Sáng tạo'] },
    { id: 6, name: 'Sách đã đọc', documentsCount: 20, tags: ['Đọc sách', 'Tóm tắt'] },
  ];
  
  const documents = [
    { id: 1, name: 'Hướng dẫn sử dụng React', folder: 'Lập trình', date: '15/05/2023', tags: ['React', 'Frontend'] },
    { id: 2, name: 'Chiến lược tiếp thị kỹ thuật số', folder: 'Marketing', date: '23/06/2023', tags: ['Digital', 'Strategy'] },
    { id: 3, name: 'Kế hoạch phát triển cá nhân', folder: 'Dự án cá nhân', date: '05/07/2023', tags: ['Mục tiêu', 'Cá nhân'] },
    { id: 4, name: 'Ghi chú về Machine Learning', folder: 'Lập trình', date: '12/08/2023', tags: ['AI', 'ML'] },
    { id: 5, name: 'Nghiên cứu thị trường', folder: 'Marketing', date: '28/08/2023', tags: ['Market', 'Analysis'] },
    { id: 6, name: 'Tóm tắt sách Atomic Habits', folder: 'Sách đã đọc', date: '10/09/2023', tags: ['Self-help', 'Productivity'] },
    { id: 7, name: 'Kiến trúc phần mềm hiện đại', folder: 'Lập trình', date: '17/09/2023', tags: ['Architecture', 'Design'] },
    { id: 8, name: 'Tóm tắt khóa học AI', folder: 'Tài liệu học tập', date: '03/10/2023', tags: ['AI', 'Course'] },
  ];

  const createNewDocument = () => {
    toast.success('Đã tạo tài liệu mới');
  };

  const createNewFolder = () => {
    toast.success('Đã tạo thư mục mới');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <header className="mb-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary font-medium text-sm mb-2">
            <Layers size={16} /> WiseBase
          </div>
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <span className="text-gradient bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Hệ thống quản lý tri thức</span>
          </h1>
          <p className="text-muted-foreground">
            Lưu trữ, tổ chức và chia sẻ kiến thức của bạn với WiseBase
          </p>
        </header>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Thư mục</h2>
                  <Button variant="ghost" size="icon" onClick={createNewFolder}>
                    <FolderPlus size={18} />
                  </Button>
                </div>
                
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">
                    <BookOpen size={16} className="mr-2" /> Tất cả tài liệu
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <FileText size={16} className="mr-2" /> Gần đây
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-primary">
                    <FolderOpen size={16} className="mr-2" /> Lập trình
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <FolderOpen size={16} className="mr-2" /> Marketing
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <FolderOpen size={16} className="mr-2" /> Dự án cá nhân
                  </Button>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium mb-4">Thẻ phổ biến</h2>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Tags size={14} className="mr-1" /> AI
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Tags size={14} className="mr-1" /> Marketing
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Tags size={14} className="mr-1" /> Web
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Tags size={14} className="mr-1" /> React
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Tags size={14} className="mr-1" /> Productivity
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-card rounded-lg border p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input 
                    className="pl-9 bg-background"
                    placeholder="Tìm kiếm tài liệu, thư mục, hoặc thẻ..."
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-accent' : ''}>
                    <Grid size={16} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-accent' : ''}>
                    <List size={16} />
                  </Button>
                  <Button onClick={createNewDocument}>
                    <Plus size={16} className="mr-2" /> Tài liệu mới
                  </Button>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="documents">
              <TabsList className="mb-6">
                <TabsTrigger value="documents">Tài liệu</TabsTrigger>
                <TabsTrigger value="folders">Thư mục</TabsTrigger>
              </TabsList>
              
              <TabsContent value="documents">
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.map((doc) => (
                      <Card key={doc.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex justify-between items-start">
                            <span className="line-clamp-1">{doc.name}</span>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Edit2 size={14} />
                            </Button>
                          </CardTitle>
                          <p className="text-xs text-muted-foreground">Thư mục: {doc.folder} • {doc.date}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1">
                            {doc.tags.map((tag, idx) => (
                              <span key={idx} className="text-xs bg-accent px-2 py-0.5 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText size={18} className="text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">{doc.name}</h3>
                            <p className="text-xs text-muted-foreground">Thư mục: {doc.folder} • {doc.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {doc.tags.map((tag, idx) => (
                              <span key={idx} className="text-xs bg-accent px-2 py-0.5 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Button variant="ghost" size="icon">
                            <Edit2 size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="folders">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {folders.map((folder) => (
                    <Card key={folder.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <FolderOpen size={18} className="text-primary" />
                          {folder.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">{folder.documentsCount} tài liệu</p>
                        <div className="flex flex-wrap gap-1">
                          {folder.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs bg-accent px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WiseBase;
