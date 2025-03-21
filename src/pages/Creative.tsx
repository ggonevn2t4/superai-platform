
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Sparkles, Image, FileText, Music, Video, Code, Wand2, CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

const Creative: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error('Vui lòng nhập mô tả để tạo nội dung');
      return;
    }
    
    setIsGenerating(true);
    toast.info('Đang xử lý yêu cầu của bạn...');
    
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Đã tạo nội dung thành công!');
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <header className="mb-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary font-medium text-sm mb-2">
            <Sparkles size={16} /> Sáng tạo
          </div>
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <span className="text-gradient bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Công cụ sáng tạo AI</span>
          </h1>
          <p className="text-muted-foreground">
            Tạo nội dung, hình ảnh, văn bản và nhiều hơn nữa với sự hỗ trợ của AI tiên tiến
          </p>
        </header>

        <Tabs defaultValue="image" className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl mb-8">
            <TabsTrigger value="image" className="flex gap-2 items-center">
              <Image size={16} /> Hình ảnh
            </TabsTrigger>
            <TabsTrigger value="text" className="flex gap-2 items-center">
              <FileText size={16} /> Văn bản
            </TabsTrigger>
            <TabsTrigger value="music" className="flex gap-2 items-center">
              <Music size={16} /> Âm nhạc
            </TabsTrigger>
            <TabsTrigger value="video" className="flex gap-2 items-center">
              <Video size={16} /> Video
            </TabsTrigger>
            <TabsTrigger value="code" className="flex gap-2 items-center">
              <Code size={16} /> Code
            </TabsTrigger>
          </TabsList>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <TabsContent value="image" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Tạo hình ảnh AI</CardTitle>
                    <CardDescription>
                      Tạo hình ảnh chất lượng cao với mô tả của bạn
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="prompt">Mô tả chi tiết</Label>
                        <Textarea
                          id="prompt"
                          placeholder="Mô tả chi tiết hình ảnh bạn muốn tạo..."
                          className="min-h-32"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Tỷ lệ khung hình</Label>
                        <RadioGroup defaultValue="square" className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="square" id="square" />
                            <Label htmlFor="square">1:1</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="portrait" id="portrait" />
                            <Label htmlFor="portrait">9:16</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="landscape" id="landscape" />
                            <Label htmlFor="landscape">16:9</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="wide" id="wide" />
                            <Label htmlFor="wide">21:9</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Phong cách</Label>
                        <RadioGroup defaultValue="photo" className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="photo" id="photo" />
                            <Label htmlFor="photo">Hình ảnh thực tế</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="anime" id="anime" />
                            <Label htmlFor="anime">Anime</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="digital" id="digital" />
                            <Label htmlFor="digital">Digital Art</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="3d" id="3d" />
                            <Label htmlFor="3d">3D Render</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>Đang tạo... <Wand2 className="ml-2 animate-spin" size={16} /></>
                      ) : (
                        <>Tạo hình ảnh <Wand2 className="ml-2" size={16} /></>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="text" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Tạo nội dung văn bản</CardTitle>
                    <CardDescription>
                      Tạo nội dung văn bản chất lượng cao với AI
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="text-type">Loại nội dung</Label>
                        <RadioGroup defaultValue="article" className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="article" id="article" />
                            <Label htmlFor="article">Bài viết</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="story" id="story" />
                            <Label htmlFor="story">Truyện ngắn</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="email" />
                            <Label htmlFor="email">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="poem" id="poem" />
                            <Label htmlFor="poem">Thơ</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="text-prompt">Chủ đề và yêu cầu</Label>
                        <Textarea
                          id="text-prompt"
                          placeholder="Mô tả chi tiết nội dung bạn muốn tạo..."
                          className="min-h-32"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>Đang tạo... <FileText className="ml-2 animate-spin" size={16} /></>
                      ) : (
                        <>Tạo nội dung <FileText className="ml-2" size={16} /></>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="music" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Tạo nhạc với AI</CardTitle>
                    <CardDescription>
                      Sáng tạo giai điệu và âm nhạc theo yêu cầu
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="music-style">Thể loại</Label>
                        <RadioGroup defaultValue="pop" className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pop" id="pop" />
                            <Label htmlFor="pop">Pop</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ambient" id="ambient" />
                            <Label htmlFor="ambient">Ambient</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="electronic" id="electronic" />
                            <Label htmlFor="electronic">Electronic</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="classical" id="classical" />
                            <Label htmlFor="classical">Classical</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="music-prompt">Mô tả âm nhạc</Label>
                        <Textarea
                          id="music-prompt"
                          placeholder="Mô tả loại nhạc bạn muốn tạo..."
                          className="min-h-32"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Độ dài</Label>
                        <RadioGroup defaultValue="30s" className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="30s" id="30s" />
                            <Label htmlFor="30s">30 giây</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1m" id="1m" />
                            <Label htmlFor="1m">1 phút</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="2m" id="2m" />
                            <Label htmlFor="2m">2 phút</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>Đang tạo... <Music className="ml-2 animate-spin" size={16} /></>
                      ) : (
                        <>Tạo âm nhạc <Music className="ml-2" size={16} /></>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="video" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Tạo video với AI</CardTitle>
                    <CardDescription>
                      Chuyển ý tưởng của bạn thành video chuyên nghiệp
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="video-prompt">Mô tả video</Label>
                        <Textarea
                          id="video-prompt"
                          placeholder="Mô tả chi tiết video bạn muốn tạo..."
                          className="min-h-32"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Độ dài</Label>
                        <RadioGroup defaultValue="15s" className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="15s" id="v15s" />
                            <Label htmlFor="v15s">15 giây</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="30s" id="v30s" />
                            <Label htmlFor="v30s">30 giây</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="60s" id="v60s" />
                            <Label htmlFor="v60s">60 giây</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Phong cách</Label>
                        <RadioGroup defaultValue="cinematic" className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cinematic" id="cinematic" />
                            <Label htmlFor="cinematic">Điện ảnh</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="animation" id="animation" />
                            <Label htmlFor="animation">Hoạt hình</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="abstract" id="abstract" />
                            <Label htmlFor="abstract">Trừu tượng</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>Đang tạo... <Video className="ml-2 animate-spin" size={16} /></>
                      ) : (
                        <>Tạo video <Video className="ml-2" size={16} /></>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="code" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Tạo mã code thông minh</CardTitle>
                    <CardDescription>
                      Tạo mã code giải quyết vấn đề của bạn
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="code-language">Ngôn ngữ lập trình</Label>
                        <RadioGroup defaultValue="javascript" className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="javascript" id="javascript" />
                            <Label htmlFor="javascript">JavaScript</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="python" id="python" />
                            <Label htmlFor="python">Python</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="java" id="java" />
                            <Label htmlFor="java">Java</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="csharp" id="csharp" />
                            <Label htmlFor="csharp">C#</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="code-prompt">Mô tả yêu cầu</Label>
                        <Textarea
                          id="code-prompt"
                          placeholder="Mô tả chi tiết chức năng và yêu cầu của đoạn code..."
                          className="min-h-32"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>Đang tạo... <Code className="ml-2 animate-spin" size={16} /></>
                      ) : (
                        <>Tạo code <Code className="ml-2" size={16} /></>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
            
            <div className="md:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Tính năng sáng tạo</CardTitle>
                  <CardDescription>
                    Các công cụ sáng tạo AI có sẵn
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-2">
                      <CheckIcon size={18} className="text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Tạo hình ảnh chất lượng cao</h3>
                        <p className="text-sm text-muted-foreground">Hình ảnh sắc nét với mọi phong cách</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <CheckIcon size={18} className="text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Sáng tạo nội dung văn bản</h3>
                        <p className="text-sm text-muted-foreground">Bài viết, truyện, email chuyên nghiệp</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <CheckIcon size={18} className="text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Tạo nhạc với AI</h3>
                        <p className="text-sm text-muted-foreground">Nhạc nền, giai điệu theo phong cách</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <CheckIcon size={18} className="text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Sản xuất video AI</h3>
                        <p className="text-sm text-muted-foreground">Video từ văn bản, hình ảnh thành video</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <CheckIcon size={18} className="text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Tạo mã code thông minh</h3>
                        <p className="text-sm text-muted-foreground">Giải quyết vấn đề với code AI</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Creative;
