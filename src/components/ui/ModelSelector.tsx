
import React, { useState } from 'react';
import { Check, ChevronDown, Bot, Sparkles, Wand, Cpu, Zap, LucideIcon, Diamond, Flame, Orbit, Brain, Flower, Infinity, Layers, Gem, Router } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Model {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon; // Use LucideIcon type from lucide-react
  providerTag?: string; // Optional tag to show provider
}

interface ModelSelectorProps {
  onChange?: (modelId: string) => void;
  defaultModel?: string;
  disabled?: boolean; // Added disabled prop
}

const models: Model[] = [
  { 
    id: 'deepseek-r1', 
    name: 'DeepSeek R1', 
    description: 'Mô hình tiên tiến của DeepSeek',
    icon: Zap
  },
  { 
    id: 'deepseek-v3', 
    name: 'DeepSeek V3', 
    description: 'Phiên bản mới nhất của DeepSeek',
    icon: Zap
  },
  { 
    id: 'gpt-4o', 
    name: 'GPT-4o', 
    description: 'Mô hình mạnh mẽ nhất của OpenAI',
    icon: Sparkles,
    providerTag: 'OpenRouter'
  },
  { 
    id: 'gpt-4o-mini', 
    name: 'GPT-4o Mini', 
    description: 'Phiên bản nhỏ hơn, nhanh hơn của GPT-4o',
    icon: Sparkles,
    providerTag: 'OpenRouter'
  },
  { 
    id: 'gemini-2', 
    name: 'Gemini 1.5 Pro', 
    description: 'Mô hình tiên tiến nhất từ Google',
    icon: Bot,
    providerTag: 'OpenRouter'
  },
  {
    id: 'gemini-2-flash',
    name: 'Gemini 2.0 Flash',
    description: 'Phiên bản nhanh hơn của mô hình Gemini',
    icon: Flame,
    providerTag: 'OpenRouter'
  },
  { 
    id: 'claude-3-7', 
    name: 'Claude 3.7', 
    description: 'Opus - Mô hình tiên tiến của Anthropic',
    icon: Wand,
    providerTag: 'OpenRouter'
  },
  {
    id: 'claude-3-5-haiku',
    name: 'Claude 3.5 Haiku',
    description: 'Mô hình nhỏ gọn, nhanh chóng của Anthropic',
    icon: Flower,
    providerTag: 'OpenRouter'
  },
  { 
    id: 'mistral-large', 
    name: 'Mistral Large', 
    description: 'Mô hình hiệu quả từ Mistral AI',
    icon: Cpu,
    providerTag: 'OpenRouter'
  },
  {
    id: 'llama-3-70b',
    name: 'Llama 3.3 70B',
    description: 'Mô hình hiệu suất cao của Meta AI',
    icon: Infinity,
    providerTag: 'OpenRouter'
  },
  {
    id: 'nemotron-70b',
    name: 'Nemotron 70B',
    description: 'Mô hình mạnh mẽ với khả năng học sâu',
    icon: Brain,
    providerTag: 'OpenRouter'
  },
  {
    id: 'qwen-72b',
    name: 'Qwen2.5 72B',
    description: 'Mô hình tiên tiến với hiệu suất cao',
    icon: Layers
  },
  {
    id: 'gemini-1-5-flash',
    name: 'Gemini 1.5 Flash-8B',
    description: 'Phiên bản nhỏ gọn, siêu nhanh của Gemini',
    icon: Gem
  },
];

const ModelSelector: React.FC<ModelSelectorProps> = ({ onChange, defaultModel = 'deepseek-r1', disabled = false }) => {
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
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg border bg-background/80 hover:bg-accent transition-all duration-200 hover:shadow-sm backdrop-blur-sm",
          disabled && "opacity-50 cursor-not-allowed hover:bg-background/80"
        )}
        type="button"
        disabled={disabled}
      >
        <span className="bg-primary/10 p-1 rounded text-primary">
          {React.createElement(selectedModel.icon, { size: 16 })}
        </span>
        <span className="text-sm font-medium">{selectedModel.name}</span>
        {selectedModel.providerTag && (
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 flex items-center">
            <Router className="w-3 h-3 mr-0.5" />
            {selectedModel.providerTag}
          </span>
        )}
        <ChevronDown size={14} className={cn("transition-transform duration-200 text-muted-foreground", isOpen && "rotate-180")} />
      </button>
      
      {isOpen && !disabled && (
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
                    {React.createElement(model.icon, { size: 16 })}
                  </div>
                  <div className="flex flex-col items-start flex-1">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{model.name}</span>
                      {model.providerTag && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 flex items-center">
                          <Router className="w-3 h-3 mr-0.5" />
                          {model.providerTag}
                        </span>
                      )}
                    </div>
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
