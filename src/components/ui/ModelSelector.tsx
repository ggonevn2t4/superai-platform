
import React, { useState } from 'react';
import { Check, ChevronDown, Bot, Sparkles, Wand, Cpu, Zap, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Model {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon; // Use LucideIcon type from lucide-react
}

interface ModelSelectorProps {
  onChange?: (modelId: string) => void;
  defaultModel?: string;
}

const models: Model[] = [
  { 
    id: 'deepseek-r1', 
    name: 'DeepSeek R1', 
    description: 'Mô hình tiên tiến của DeepSeek',
    icon: Zap
  },
  { 
    id: 'gpt-4o', 
    name: 'GPT-4o', 
    description: 'Mô hình mạnh mẽ nhất của OpenAI',
    icon: Sparkles
  },
  { 
    id: 'gemini-2', 
    name: 'Gemini 1.5 Pro', 
    description: 'Mô hình tiên tiến nhất từ Google',
    icon: Bot
  },
  { 
    id: 'claude-3-7', 
    name: 'Claude 3.7', 
    description: 'Opus - Mô hình tiên tiến của Anthropic',
    icon: Wand
  },
  { 
    id: 'mistral-large', 
    name: 'Mistral Large', 
    description: 'Mô hình hiệu quả từ Mistral AI',
    icon: Cpu
  },
];

const ModelSelector: React.FC<ModelSelectorProps> = ({ onChange, defaultModel = 'deepseek-r1' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model>(
    models.find(model => model.id === defaultModel) || models[0]
  );
  
  const handleSelect = (model: Model) => {
    setSelectedModel(model);
    setIsOpen(false);
    if (onChange) {
      onChange(model.id);
    }
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-background/80 hover:bg-accent transition-all duration-200 hover:shadow-sm backdrop-blur-sm"
        type="button"
      >
        <span className="bg-primary/10 p-1 rounded text-primary">
          {/* Render the icon component with proper typing */}
          {React.createElement(selectedModel.icon, { size: 16 })}
        </span>
        <span className="text-sm font-medium">{selectedModel.name}</span>
        <ChevronDown size={14} className={cn("transition-transform duration-200 text-muted-foreground", isOpen && "rotate-180")} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 z-50 mt-2 w-[280px] rounded-lg border bg-popover shadow-lg animate-fade-in">
            <div className="py-2">
              {models.map((model) => (
                <button
                  key={model.id}
                  className={cn(
                    "flex items-center w-full px-3 py-2 text-sm hover:bg-accent/50 transition-colors duration-200",
                    model.id === selectedModel.id && "bg-accent"
                  )}
                  onClick={() => handleSelect(model)}
                >
                  <div className={cn(
                    "mr-2 h-8 w-8 rounded-full flex items-center justify-center",
                    model.id === selectedModel.id ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}>
                    {/* Render the icon component with proper typing */}
                    {React.createElement(model.icon, { size: 16 })}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{model.name}</span>
                    <span className="text-xs text-muted-foreground">{model.description}</span>
                  </div>
                  {model.id === selectedModel.id && <Check size={16} className="ml-auto text-primary" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ModelSelector;
