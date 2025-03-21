
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Copy } from 'lucide-react';

interface CopyableFieldProps {
  value: string;
  label?: string;
  field: string;
  description?: string;
  className?: string;
}

const CopyableField: React.FC<CopyableFieldProps> = ({ 
  value, 
  label, 
  field, 
  description,
  className 
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };
  
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="flex gap-2">
        <Input value={value} readOnly className="bg-muted" />
        <Button
          size="icon"
          variant="outline"
          onClick={handleCopy}
          title={`Sao chép ${field}`}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </Button>
      </div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  );
};

export default CopyableField;
