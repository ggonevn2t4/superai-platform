
import React, { useState } from 'react';
import { Filter, Thermometer, Hash, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import ModelSettingsPanel from './ModelSettingsPanel';

interface AdvancedModelOptionsProps {
  temperature: number;
  setTemperature: (value: number) => void;
  maxTokens: number;
  setMaxTokens: (value: number) => void;
  filterResult: boolean;
  setFilterResult: (value: boolean) => void;
  model: string;
}

const AdvancedModelOptions: React.FC<AdvancedModelOptionsProps> = ({
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  filterResult,
  setFilterResult,
  model
}) => {
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [presencePenalty, setPresencePenalty] = useState(0);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [creativityMode, setCreativityMode] = useState<'balanced' | 'precise' | 'creative'>('balanced');
  const [streamingEnabled, setStreamingEnabled] = useState(true);

  // Áp dụng chế độ sáng tạo
  const applyCreativityMode = (mode: 'balanced' | 'precise' | 'creative') => {
    setCreativityMode(mode);
    
    switch(mode) {
      case 'precise':
        setTemperature(0.2);
        setPresencePenalty(-0.5);
        setFrequencyPenalty(-0.5);
        break;
      case 'balanced':
        setTemperature(0.7);
        setPresencePenalty(0);
        setFrequencyPenalty(0);
        break;
      case 'creative':
        setTemperature(1.0);
        setPresencePenalty(0.7);
        setFrequencyPenalty(0.7);
        break;
    }
  };

  return (
    <div className="mb-4 border rounded-lg p-4 bg-background/80 backdrop-blur-sm animate-scale-in">
      <h3 className="text-sm font-medium mb-3">Cài đặt trò chuyện</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-1.5">
              <Thermometer size={16} className="text-primary" />
              Temperature
            </Label>
            <span className="font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
              {temperature}
            </span>
          </div>
          <div className="pt-1">
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Chính xác</span>
              <span>Sáng tạo</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-1.5">
              <Hash size={16} className="text-primary" />
              Max Tokens
            </Label>
            <span className="font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
              {maxTokens}
            </span>
          </div>
          <div className="pt-1">
            <input 
              type="range" 
              min="256" 
              max="4096" 
              step="256"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>256</span>
              <span>4096</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="filter-content" className="flex items-center gap-1.5 cursor-pointer">
              <Filter size={16} className="text-primary" />
              Lọc nội dung
            </Label>
            <Switch
              id="filter-content"
              checked={filterResult}
              onCheckedChange={setFilterResult}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-3 flex justify-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs flex items-center gap-1 text-muted-foreground"
          onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
        >
          {showAdvancedSettings ? (
            <>
              <ChevronUp size={14} />
              Ẩn cài đặt nâng cao
            </>
          ) : (
            <>
              <ChevronDown size={14} />
              Hiển thị cài đặt nâng cao
            </>
          )}
        </Button>
      </div>
      
      {showAdvancedSettings && (
        <ModelSettingsPanel 
          presencePenalty={presencePenalty}
          setPresencePenalty={setPresencePenalty}
          frequencyPenalty={frequencyPenalty}
          setFrequencyPenalty={setFrequencyPenalty}
          creativityMode={creativityMode}
          setCreativityMode={applyCreativityMode}
          streamingEnabled={streamingEnabled}
          setStreamingEnabled={setStreamingEnabled}
        />
      )}
    </div>
  );
};

export default AdvancedModelOptions;
