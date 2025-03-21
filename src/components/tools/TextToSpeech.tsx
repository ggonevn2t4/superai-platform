
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Volume2, Pause, Play } from "lucide-react";

interface VoiceOption {
  id: string;
  name: string;
}

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState("alloy");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const voices: VoiceOption[] = [
    { id: "alloy", name: "Alloy (Cân bằng)" },
    { id: "echo", name: "Echo (Nữ trẻ)" },
    { id: "fable", name: "Fable (Nam trẻ)" },
    { id: "onyx", name: "Onyx (Nam trầm)" },
    { id: "nova", name: "Nova (Nữ trưởng thành)" },
    { id: "shimmer", name: "Shimmer (Nữ trong trẻo)" }
  ];
  
  const handleGenerateSpeech = async () => {
    if (!text.trim()) {
      toast.error("Vui lòng nhập nội dung văn bản");
      return;
    }
    
    setIsGenerating(true);
    setAudioSrc(null);
    
    try {
      const { data, error } = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: selectedVoice })
      }).then(res => res.json());
      
      if (error) throw new Error(error);
      
      setAudioSrc(data.audioContent);
      toast.success("Đã tạo giọng nói thành công");
    } catch (error) {
      console.error('Lỗi khi tạo giọng nói:', error);
      toast.error("Lỗi khi tạo giọng nói. Vui lòng thử lại sau.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };
  
  const handleVoiceChange = (value: string) => {
    setSelectedVoice(value);
    // Reset audio if voice changes
    setAudioSrc(null);
  };
  
  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-lg bg-primary/10">
            <Volume2 className="h-8 w-8 text-cyan-500" />
          </div>
        </div>
        <CardTitle className="mt-4">Chuyển văn bản thành giọng nói</CardTitle>
        <CardDescription>Chuyển đổi văn bản thành giọng nói với nhiều tùy chọn giọng đọc khác nhau</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Chọn giọng đọc</label>
          <Select value={selectedVoice} onValueChange={handleVoiceChange}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn giọng đọc" />
            </SelectTrigger>
            <SelectContent>
              {voices.map(voice => (
                <SelectItem key={voice.id} value={voice.id}>
                  {voice.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Nội dung văn bản</label>
          <Textarea 
            placeholder="Nhập nội dung văn bản bạn muốn chuyển thành giọng nói..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px]"
          />
        </div>
        
        {audioSrc && (
          <div className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Kết quả</h4>
              <Button 
                size="sm" 
                variant="outline"
                onClick={togglePlayPause}
                className="flex items-center gap-1"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                {isPlaying ? "Tạm dừng" : "Phát"}
              </Button>
            </div>
            
            <audio 
              ref={audioRef} 
              src={audioSrc} 
              onEnded={handleAudioEnded} 
              className="w-full" 
              controls 
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleGenerateSpeech} 
          disabled={isGenerating || !text.trim()}
          className="w-full justify-between group-hover:bg-primary/90 transition-colors"
        >
          {isGenerating ? "Đang tạo giọng nói..." : "Tạo giọng nói"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TextToSpeech;
