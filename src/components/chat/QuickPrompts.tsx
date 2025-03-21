
import React from 'react';
import { LightbulbIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const QuickPrompts: React.FC<QuickPromptsProps> = ({ onSelectPrompt }) => {
  const prompts = [
    "Giải thích X như thể tôi 5 tuổi",
    "Viết một email chuyên nghiệp về",
    "Tóm tắt văn bản này",
    "Đề xuất ý tưởng cho",
    "Phân tích dữ liệu này",
    "Tạo kế hoạch cho",
    "So sánh A và B"
  ];
  
  return (
    <div className="my-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <LightbulbIcon size={16} className="text-primary" />
        <h3 className="text-sm font-medium">Gợi ý nhanh</h3>
      </div>
      
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
    </div>
  );
};

export default QuickPrompts;
