
import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Model {
  id: string;
  name: string;
  description: string;
}

interface ModelSelectorProps {
  onChange?: (modelId: string) => void;
}

const models: Model[] = [
  { 
    id: 'gpt-4o', 
    name: 'GPT-4o', 
    description: 'Mô hình mạnh mẽ nhất của OpenAI' 
  },
  { 
    id: 'claude-3-7', 
    name: 'Claude 3.7', 
    description: 'Opus - Mô hình tiên tiến của Anthropic' 
  },
  { 
    id: 'gemini-2', 
    name: 'Gemini 2.0', 
    description: 'Mô hình mới nhất từ Google' 
  },
  { 
    id: 'mistral-large', 
    name: 'Mistral Large', 
    description: 'Mô hình hiệu quả từ Mistral AI' 
  },
];

const ModelSelector: React.FC<ModelSelectorProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model>(models[0]);
  
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
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors duration-200"
      >
        <span className="text-sm font-medium">{selectedModel.name}</span>
        <ChevronDown size={16} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 mt-2 w-[250px] rounded-lg border bg-popover shadow-md animate-scale-in">
          <div className="py-2">
            {models.map((model) => (
              <button
                key={model.id}
                className="flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-accent/50 transition-colors duration-200"
                onClick={() => handleSelect(model)}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{model.name}</span>
                  <span className="text-xs text-muted-foreground">{model.description}</span>
                </div>
                {model.id === selectedModel.id && <Check size={16} className="text-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
