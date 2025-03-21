
import React from 'react';
import { Brain, Flame, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ModelSettingsPanelProps {
  presencePenalty: number;
  setPresencePenalty: (value: number) => void;
  frequencyPenalty: number;
  setFrequencyPenalty: (value: number) => void;
  creativityMode: 'balanced' | 'precise' | 'creative';
  setCreativityMode: (value: 'balanced' | 'precise' | 'creative') => void;
  streamingEnabled: boolean;
  setStreamingEnabled: (value: boolean) => void;
}

const ModelSettingsPanel: React.FC<ModelSettingsPanelProps> = ({
  presencePenalty,
  setPresencePenalty,
  frequencyPenalty,
  setFrequencyPenalty,
  creativityMode,
  setCreativityMode,
  streamingEnabled,
  setStreamingEnabled
}) => {
  return (
    <div className="mt-3 border rounded-lg p-4 bg-background/80 backdrop-blur-sm animate-scale-in">
      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
        <Brain size={16} className="text-primary" />
        Cài đặt mô hình nâng cao
      </h3>
      
      <div className="grid grid-cols-1 gap-6 text-sm">
        <div className="space-y-4">
          <div>
            <Label className="text-sm mb-2 flex items-center gap-1.5">
              <Zap size={16} className="text-primary" />
              Chế độ sáng tạo
            </Label>
            <RadioGroup 
              value={creativityMode} 
              onValueChange={(value) => setCreativityMode(value as 'balanced' | 'precise' | 'creative')}
              className="flex gap-2 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="precise" id="precise" />
                <Label htmlFor="precise" className="text-xs cursor-pointer">Chính xác</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="balanced" id="balanced" />
                <Label htmlFor="balanced" className="text-xs cursor-pointer">Cân bằng</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="creative" id="creative" />
                <Label htmlFor="creative" className="text-xs cursor-pointer">Sáng tạo</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-1.5">
                <Flame size={16} className="text-primary" />
                Presence Penalty ({presencePenalty.toFixed(1)})
              </Label>
            </div>
            <Slider
              value={[presencePenalty]}
              min={-2}
              max={2}
              step={0.1}
              onValueChange={(value) => setPresencePenalty(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Lặp lại</span>
              <span>Đa dạng</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-1.5">
                <Sparkles size={16} className="text-primary" />
                Frequency Penalty ({frequencyPenalty.toFixed(1)})
              </Label>
            </div>
            <Slider
              value={[frequencyPenalty]}
              min={-2}
              max={2}
              step={0.1}
              onValueChange={(value) => setFrequencyPenalty(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Sử dụng từ thông dụng</span>
              <span>Sử dụng từ đa dạng</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="streaming" className="flex items-center gap-1.5 cursor-pointer">
              <Zap size={16} className="text-primary" />
              Phản hồi theo luồng
            </Label>
            <Switch
              id="streaming"
              checked={streamingEnabled}
              onCheckedChange={setStreamingEnabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelSettingsPanel;
