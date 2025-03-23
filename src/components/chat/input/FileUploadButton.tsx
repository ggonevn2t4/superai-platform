
import React, { useRef } from 'react';
import { Paperclip, Globe, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface FileUploadButtonProps {
  onFileContent: (content: string, fileName: string) => void;
  disabled: boolean;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onFileContent, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Tệp quá lớn. Vui lòng tải lên tệp có kích thước dưới 5MB.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const fileContent = event.target.result.toString().slice(0, 2000);
        onFileContent(fileContent, file.name);
        toast.success(`Đã tải lên tệp ${file.name}`);
      }
    };
    reader.onerror = () => {
      toast.error('Không thể đọc tệp. Vui lòng thử lại.');
    };
    
    if (file.type.startsWith('text/')) {
      reader.readAsText(file);
    } else {
      toast.error('Hiện tại chỉ hỗ trợ tệp văn bản.');
    }
  };
  
  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept=".txt,.md,.csv,.json"
      />
      
      <div className="flex gap-2">
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          size="icon"
          variant="ghost"
          className="rounded-full h-10 w-10 flex items-center justify-center"
          title="Tải lên tệp văn bản"
          disabled={disabled}
        >
          <Paperclip size={20} />
        </Button>
        
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="rounded-full h-10 w-10 flex items-center justify-center"
          title="Tìm kiếm web"
          disabled={disabled}
        >
          <Globe size={20} />
        </Button>
        
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="rounded-full h-10 w-10 flex items-center justify-center"
          title="Công cụ nâng cao"
          disabled={disabled}
        >
          <Sparkles size={20} />
        </Button>
      </div>
    </>
  );
};

export default FileUploadButton;
