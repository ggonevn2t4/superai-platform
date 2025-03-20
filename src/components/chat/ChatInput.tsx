import React, { useRef, useEffect, useState } from 'react';
import { Send, Paperclip, Mic, StopCircle, ArrowUp, Image, Volume2 } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { analyzeImage, speechToText, textToSpeech } from '@/services/mediaServices';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  apiKeyError: boolean;
  isRecording: boolean;
  toggleRecording: () => void;
  charCount: number;
  model: string;
  isReadOnly?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  isLoading,
  handleSubmit,
  apiKeyError,
  isRecording,
  toggleRecording,
  charCount,
  model,
  isReadOnly = false
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [audioRecorder, setAudioRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [isProcessingSpeech, setIsProcessingSpeech] = useState(false);
  const [isProcessingTTS, setIsProcessingTTS] = useState(false);
  
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };
  
  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
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
        const newValue = `${input}\n\nNội dung tệp "${file.name}":\n${fileContent}${fileContent.length >= 2000 ? '...' : ''}`;
        setInput(newValue);
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
          
          const imagePrompt = `[Đã tải lên hình ảnh: ${file.name}]\n\nKết quả phân tích:\n${analysis}`;
          setInput(imagePrompt);
          
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
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setAudioRecorder(recorder);
      
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      recorder.onstop = async () => {
        setIsProcessingSpeech(true);
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        
        try {
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          
          reader.onloadend = async () => {
            try {
              const base64Audio = reader.result as string;
              const transcription = await speechToText(base64Audio);
              
              const newInputValue = input + (input ? ' ' : '') + transcription;
              setInput(newInputValue);
              
              toast.success('Đã chuyển giọng nói thành văn bản');
            } catch (error) {
              console.error('Error processing speech:', error);
              toast.error('Lỗi khi xử lý giọng nói. Vui lòng thử lại.');
            } finally {
              setIsProcessingSpeech(false);
              setAudioChunks([]);
            }
          };
        } catch (error) {
          console.error('Error converting audio to base64:', error);
          toast.error('Lỗi khi xử lý âm thanh. Vui lòng thử lại.');
          setIsProcessingSpeech(false);
          setAudioChunks([]);
        }
      };
      
      recorder.start();
      setAudioChunks([]);
      toggleRecording();
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Không thể truy cập micrô. Vui lòng kiểm tra quyền truy cập.');
    }
  };
  
  const stopRecording = () => {
    if (audioRecorder && audioRecorder.state !== 'inactive') {
      audioRecorder.stop();
      
      audioRecorder.stream?.getTracks().forEach(track => track.stop());
      toggleRecording();
    }
  };
  
  const handleRecordingToggle = () => {
    if (isProcessingSpeech) return;
    
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  
  const handleTextToSpeech = async () => {
    if (!input.trim() || isProcessingTTS) return;
    
    setIsProcessingTTS(true);
    const loadingToast = toast.loading('Đang chuyển văn bản thành giọng nói...');
    
    try {
      const audioContent = await textToSpeech(input, 'nova');
      
      const audio = new Audio(audioContent);
      audio.play();
      
      toast.dismiss(loadingToast);
      toast.success('Đang phát giọng nói');
    } catch (error) {
      console.error('Error converting text to speech:', error);
      toast.dismiss(loadingToast);
      toast.error('Lỗi khi chuyển văn bản thành giọng nói. Vui lòng thử lại.');
    } finally {
      setIsProcessingTTS(false);
    }
  };
  
  if (isReadOnly) {
    return (
      <div className="bg-muted/30 rounded-lg p-3 text-center text-muted-foreground">
        Đây là cuộc trò chuyện chỉ xem. Bạn không thể gửi tin nhắn.
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".txt,.md,.csv,.json"
        />
        
        <input
          type="file"
          ref={imageInputRef}
          onChange={handleImageUpload}
          className="hidden"
          accept="image/*"
        />
        
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 rounded-lg border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors hover:shadow-sm"
            title="Tải lên tệp văn bản"
            disabled={isLoading}
          >
            <Paperclip size={20} />
          </button>
          
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="p-3 rounded-lg border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors hover:shadow-sm"
            title="Tải lên hình ảnh để phân tích"
            disabled={isLoading}
          >
            <Image size={20} />
          </button>
        </div>
        
        <div className="flex-1 relative glass">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder={apiKeyError ? "Quota API Gemini đã hết. Vui lòng thử model khác." : "Nhập tin nhắn của bạn..."}
            className="w-full pl-4 pr-28 py-3 h-12 max-h-[200px] rounded-xl border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all"
            disabled={isLoading || isProcessingSpeech}
            rows={1}
          />
          
          <div className="absolute right-36 top-3 text-xs text-muted-foreground font-medium">
            {charCount > 0 && `${charCount} ký tự`}
          </div>
          
          <button 
            type="button" 
            onClick={handleTextToSpeech}
            disabled={isLoading || !input.trim() || isProcessingTTS}
            className={cn(
              "absolute right-26 top-3 p-1 rounded-full transition-colors",
              input.trim() && !isProcessingTTS 
                ? "text-primary hover:bg-primary/10" 
                : "text-muted-foreground",
              isProcessingTTS && "animate-pulse"
            )}
            title="Chuyển văn bản thành giọng nói"
          >
            <Volume2 size={18} />
          </button>
          
          <button 
            type="button" 
            onClick={handleRecordingToggle}
            disabled={isLoading || isProcessingSpeech}
            className={cn(
              "absolute right-14 top-3 p-1 rounded-full transition-colors",
              isRecording 
                ? "bg-red-100 text-red-600 animate-pulse" 
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              isProcessingSpeech && "animate-spin text-primary"
            )}
            title={isRecording ? "Dừng ghi âm" : isProcessingSpeech ? "Đang xử lý..." : "Ghi âm giọng nói"}
          >
            {isRecording ? <StopCircle size={18} /> : <Mic size={18} />}
          </button>
          
          <button
            type="submit"
            disabled={isLoading || !input.trim() || (apiKeyError && model === 'gemini-2') || isProcessingSpeech}
            className={cn(
              "absolute right-3 top-2 p-1.5 rounded-full transition-all",
              input.trim() && !isProcessingSpeech
                ? "bg-primary text-white hover:bg-primary/90" 
                : "bg-muted text-muted-foreground",
              "disabled:bg-muted disabled:text-muted-foreground"
            )}
            title="Gửi tin nhắn"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
      
      {(isLoading || isProcessingSpeech) && (
        <div className="mt-4 flex justify-center">
          <div className="animate-pulse flex gap-2">
            <div className="h-2 w-2 bg-primary rounded-full"></div>
            <div className="h-2 w-2 bg-primary rounded-full animation-delay-200"></div>
            <div className="h-2 w-2 bg-primary rounded-full animation-delay-400"></div>
          </div>
        </div>
      )}
    </form>
  );
};

export default ChatInput;
