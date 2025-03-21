
import React, { useMemo } from 'react';
import { LightbulbIcon, BookTextIcon, SparklesIcon, MessagesSquareIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface QuickPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const QuickPrompts: React.FC<QuickPromptsProps> = React.memo(({ onSelectPrompt }) => {
  
  // Memoize the prompt arrays to prevent unnecessary recreations
  const generalPrompts = useMemo(() => [
    "Giải thích X như thể tôi 5 tuổi",
    "Viết một email chuyên nghiệp về",
    "Tóm tắt văn bản này",
    "Đề xuất ý tưởng cho",
    "Phân tích dữ liệu này",
    "Tạo kế hoạch cho",
    "So sánh A và B"
  ], []);
  
  const creativePrompts = useMemo(() => [
    "Viết một bài thơ ngắn về",
    "Kể một câu chuyện về",
    "Tạo một trò chơi với chủ đề",
    "Thiết kế một nhân vật cho",
    "Viết một kịch bản hội thoại về"
  ], []);
  
  const professionalPrompts = useMemo(() => [
    "Tạo bản tóm tắt báo cáo về",
    "Phân tích SWOT cho",
    "Viết mô tả sản phẩm cho",
    "Tạo kế hoạch tiếp thị cho",
    "Soạn bài thuyết trình về"
  ], []);
  
  // Memoize the rendering of prompt buttons to prevent unnecessary re-renders
  const renderPromptButtons = useMemo(() => (
    prompts: string[]
  ) => (
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="text-xs bg-background/50 hover:bg-background"
          onClick={() => onSelectPrompt(prompt)}
        >
          {prompt}
        </Button>
      ))}
    </div>
  ), [onSelectPrompt]);
  
  // Optimize tab rendering with memoization
  const generalTabContent = useMemo(() => renderPromptButtons(generalPrompts), [renderPromptButtons, generalPrompts]);
  const creativeTabContent = useMemo(() => renderPromptButtons(creativePrompts), [renderPromptButtons, creativePrompts]);
  const professionalTabContent = useMemo(() => renderPromptButtons(professionalPrompts), [renderPromptButtons, professionalPrompts]);
  
  return (
    <div className="my-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <LightbulbIcon size={16} className="text-primary" />
        <h3 className="text-sm font-medium">Gợi ý nhanh</h3>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-3 mb-3 h-8">
          <TabsTrigger value="general" className="text-xs flex items-center gap-1">
            <MessagesSquareIcon size={12} />
            Chung
          </TabsTrigger>
          <TabsTrigger value="creative" className="text-xs flex items-center gap-1">
            <SparklesIcon size={12} />
            Sáng tạo
          </TabsTrigger>
          <TabsTrigger value="professional" className="text-xs flex items-center gap-1">
            <BookTextIcon size={12} />
            Chuyên nghiệp
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-0">
          {generalTabContent}
        </TabsContent>
        
        <TabsContent value="creative" className="mt-0">
          {creativeTabContent}
        </TabsContent>
        
        <TabsContent value="professional" className="mt-0">
          {professionalTabContent}
        </TabsContent>
      </Tabs>
      
      <div className="flex flex-wrap gap-2 mt-3">
        <Button
          variant="secondary"
          size="sm"
          className="text-xs w-full"
          onClick={() => onSelectPrompt("Hãy giúp tôi viết một đoạn văn miêu tả cảm xúc về một kỷ niệm đáng nhớ trong cuộc sống.")}
        >
          ✨ Viết đoạn văn miêu tả cảm xúc
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="text-xs w-full"
          onClick={() => onSelectPrompt("Làm thế nào để giải quyết vấn đề [mô tả vấn đề] một cách hiệu quả?")}
        >
          🧩 Giải quyết vấn đề
        </Button>
      </div>
    </div>
  );
});

QuickPrompts.displayName = 'QuickPrompts';

export default QuickPrompts;
