
import React from 'react';
import { Filter } from 'lucide-react';

interface ChatSettingsProps {
  showAdvancedOptions: boolean;
  temperature: number;
  setTemperature: (value: number) => void;
  maxTokens: number;
  setMaxTokens: (value: number) => void;
  filterResult: boolean;
  setFilterResult: (value: boolean) => void;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({
  showAdvancedOptions,
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  filterResult,
  setFilterResult
}) => {
  if (!showAdvancedOptions) return null;
  
  return (
    <div className="mb-4 border rounded-lg p-3 bg-background/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
      <div>
        <label className="block text-muted-foreground mb-1">Temperature</label>
        <div className="flex items-center gap-2">
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="flex-1"
          />
          <span>{temperature}</span>
        </div>
      </div>
      
      <div>
        <label className="block text-muted-foreground mb-1">Max Tokens</label>
        <div className="flex items-center gap-2">
          <input 
            type="range" 
            min="256" 
            max="4096" 
            step="256"
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
            className="flex-1"
          />
          <span>{maxTokens}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox"
            checked={filterResult}
            onChange={() => setFilterResult(!filterResult)}
            className="rounded border-gray-300"
          />
          <span className="flex items-center gap-1">
            <Filter size={16} />
            Lọc nội dung
          </span>
        </label>
      </div>
    </div>
  );
};

export default ChatSettings;
