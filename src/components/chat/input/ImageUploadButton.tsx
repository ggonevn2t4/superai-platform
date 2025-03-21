
import React, { useRef } from 'react';
import { Image } from 'lucide-react';
import { toast } from 'sonner';
import { analyzeImage } from '@/services/mediaServices';

interface ImageUploadButtonProps {
  onImageAnalysis: (analysis: string, fileName: string) => void;
  disabled: boolean;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ onImageAnalysis, disabled }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Hình ảnh quá lớn. Vui lòng tải lên hình ảnh có kích thước dưới 10MB.');
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      toast.error('Vui lòng tải lên tệp hình ảnh.');
      return;
    }
    
    const loadingToast = toast.loading('Đang phân tích hình ảnh...');
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async (event) => {
        if (event.target?.result) {
          const imageDataUrl = event.target.result.toString();
          const base64Content = imageDataUrl.split(',')[1];
          
          const analysis = await analyzeImage(base64Content);
          
          onImageAnalysis(analysis, file.name);
          
          toast.dismiss(loadingToast);
          toast.success('Đã phân tích hình ảnh thành công');
        }
      };
      
      reader.onerror = () => {
        toast.dismiss(loadingToast);
        toast.error('Không thể đọc hình ảnh. Vui lòng thử lại.');
      };
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Lỗi khi phân tích hình ảnh. Vui lòng thử lại.');
      console.error('Error analyzing image:', error);
    }
  };
  
  return (
    <>
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageUpload}
        className="hidden"
        accept="image/*"
      />
      
      <button
        type="button"
        onClick={() => imageInputRef.current?.click()}
        className="p-3 rounded-lg border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors hover:shadow-sm"
        title="Tải lên hình ảnh để phân tích"
        disabled={disabled}
      >
        <Image size={20} />
      </button>
    </>
  );
};

export default ImageUploadButton;
