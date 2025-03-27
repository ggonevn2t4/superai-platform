
import React, { useRef, useState } from 'react';
import { Image, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';
import { analyzeImage, detectObjectsInImage } from '@/services/mediaServices';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface ImageUploadButtonProps {
  onImageAnalysis: (analysis: string, fileName: string) => void;
  disabled: boolean;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ onImageAnalysis, disabled }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isObjectDetectionOpen, setIsObjectDetectionOpen] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState<Array<{ label: string; confidence: number }>>([]);
  const [objectSummary, setObjectSummary] = useState('');
  const [currentFile, setCurrentFile] = useState<{ name: string, base64: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
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
    
    setIsLoading(true);
    const loadingToast = toast.loading('Đang xử lý hình ảnh...');
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async (event) => {
        if (event.target?.result) {
          const imageDataUrl = event.target.result.toString();
          const base64Content = imageDataUrl.split(',')[1];
          
          setCurrentFile({
            name: file.name,
            base64: base64Content
          });
          
          // Perform object detection first
          try {
            const detectionResult = await detectObjectsInImage(base64Content);
            setDetectedObjects(detectionResult.objects);
            setObjectSummary(detectionResult.summary);
            setIsObjectDetectionOpen(true);
          } catch (detectionError) {
            console.error('Object detection failed:', detectionError);
            // Fall back to regular analysis if object detection fails
            performRegularAnalysis(base64Content, file.name);
          }
          
          toast.dismiss(loadingToast);
          setIsLoading(false);
        }
      };
      
      reader.onerror = () => {
        toast.dismiss(loadingToast);
        setIsLoading(false);
        toast.error('Không thể đọc hình ảnh. Vui lòng thử lại.');
      };
    } catch (error) {
      toast.dismiss(loadingToast);
      setIsLoading(false);
      toast.error('Lỗi khi xử lý hình ảnh. Vui lòng thử lại.');
      console.error('Error processing image:', error);
    }
  };
  
  const performRegularAnalysis = async (base64Content: string, fileName: string) => {
    const loadingToast = toast.loading('Đang phân tích hình ảnh...');
    try {
      const analysis = await analyzeImage(base64Content);
      onImageAnalysis(analysis, fileName);
      toast.dismiss(loadingToast);
      toast.success('Đã phân tích hình ảnh thành công');
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Lỗi khi phân tích hình ảnh. Vui lòng thử lại.');
      console.error('Error analyzing image:', error);
    }
  };
  
  const handleUseDetectionResult = () => {
    if (currentFile) {
      const result = `Các đối tượng được phát hiện: 
${detectedObjects.map(obj => `- ${obj.label} (${Math.round(obj.confidence * 100)}%)`).join('\n')}

Tóm tắt: ${objectSummary}`;
      
      onImageAnalysis(result, currentFile.name);
      setIsObjectDetectionOpen(false);
    }
  };
  
  const handlePerformFullAnalysis = () => {
    if (currentFile) {
      performRegularAnalysis(currentFile.base64, currentFile.name);
      setIsObjectDetectionOpen(false);
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
        className="p-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transition-all duration-300 relative flex items-center justify-center hover:scale-105 active:scale-95"
        title="Tải lên hình ảnh để phân tích"
        disabled={disabled || isLoading}
      >
        <ImagePlus size={24} className="text-white" />
        {isLoading && (
          <span className="absolute -top-1 -right-1 w-3 h-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
        )}
      </button>
      
      <Dialog open={isObjectDetectionOpen} onOpenChange={setIsObjectDetectionOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Kết quả nhận dạng đối tượng</DialogTitle>
            <DialogDescription>
              Hình ảnh của bạn chứa các đối tượng sau:
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-60 overflow-y-auto p-4 border rounded-lg mb-4">
            <h4 className="font-medium mb-2">Đối tượng được phát hiện:</h4>
            <ul className="space-y-1">
              {detectedObjects.map((obj, index) => (
                <li key={index} className="flex justify-between">
                  <span>{obj.label}</span>
                  <span className="text-muted-foreground">{Math.round(obj.confidence * 100)}%</span>
                </li>
              ))}
            </ul>
            
            {objectSummary && (
              <div className="mt-4 pt-2 border-t">
                <h4 className="font-medium mb-2">Tóm tắt:</h4>
                <p className="text-sm text-muted-foreground">{objectSummary}</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-between gap-4">
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={handlePerformFullAnalysis}
            >
              Phân tích chi tiết
            </Button>
            <Button 
              className="flex-1"
              onClick={handleUseDetectionResult}
            >
              Sử dụng kết quả này
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageUploadButton;
