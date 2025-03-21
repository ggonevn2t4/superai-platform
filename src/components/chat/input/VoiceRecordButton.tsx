
import React, { useState, useEffect } from 'react';
import { Mic, StopCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { speechToText } from '@/services/mediaServices';

interface VoiceRecordButtonProps {
  onTranscription: (text: string) => void;
  disabled: boolean;
}

const VoiceRecordButton: React.FC<VoiceRecordButtonProps> = ({ onTranscription, disabled }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingSpeech, setIsProcessingSpeech] = useState(false);
  const [audioRecorder, setAudioRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  
  useEffect(() => {
    return () => {
      // Clean up audio recorder on unmount
      if (audioRecorder && audioRecorder.state !== 'inactive') {
        audioRecorder.stop();
        audioRecorder.stream?.getTracks().forEach(track => track.stop());
      }
    };
  }, [audioRecorder]);
  
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
              
              onTranscription(transcription);
              
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
      setIsRecording(true);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Không thể truy cập micrô. Vui lòng kiểm tra quyền truy cập.');
    }
  };
  
  const stopRecording = () => {
    if (audioRecorder && audioRecorder.state !== 'inactive') {
      audioRecorder.stop();
      
      audioRecorder.stream?.getTracks().forEach(track => track.stop());
      setIsRecording(false);
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
  
  return (
    <button 
      type="button" 
      onClick={handleRecordingToggle}
      disabled={disabled || isProcessingSpeech}
      className={cn(
        "absolute right-14 top-3 p-1 rounded-full transition-colors mobile-touch-target",
        isRecording 
          ? "bg-red-100 text-red-600 animate-pulse" 
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
        isProcessingSpeech && "animate-spin text-primary"
      )}
      title={isRecording ? "Dừng ghi âm" : isProcessingSpeech ? "Đang xử lý..." : "Ghi âm giọng nói"}
      aria-label={isRecording ? "Dừng ghi âm" : "Ghi âm giọng nói"}
    >
      {isRecording ? <StopCircle size={18} /> : <Mic size={18} />}
    </button>
  );
};

export default VoiceRecordButton;
