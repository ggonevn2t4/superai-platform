
import React, { useState, useCallback, useEffect, memo } from 'react';
import ChatInput from './ChatInput';
import QuickPrompts from './QuickPrompts';
import { ImageUploadButton } from './input';

interface ChatFormProps {
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  apiKeyError: boolean;
  model: string;
  isReadOnly?: boolean;
  showAdvancedOptions: boolean;
  temperature: number;
  setTemperature: (value: number) => void;
  maxTokens: number;
  setMaxTokens: (value: number) => void;
  filterResult: boolean;
  setFilterResult: (value: boolean) => void;
}

const ChatForm: React.FC<ChatFormProps> = memo(({
  isLoading,
  handleSubmit,
  apiKeyError,
  model,
  isReadOnly = false,
  showAdvancedOptions,
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  filterResult,
  setFilterResult
}) => {
  const [input, setInput] = useState('');
  const [showQuickPrompts, setShowQuickPrompts] = useState(false);
  
  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSubmit(e);
      setInput('');
      setShowQuickPrompts(false);
    }
  }, [input, handleSubmit]);
  
  const handleSelectPrompt = useCallback((prompt: string) => {
    setInput(prompt);
    setShowQuickPrompts(false);
    // Focus vào input sau khi chọn prompt
    requestAnimationFrame(() => {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.focus();
      }
    });
  }, []);
  
  // Handle image upload result to be included in prompt
  const handleImageAnalysis = useCallback((analysis: string, fileName: string) => {
    const imagePrompt = `[Đã tải lên hình ảnh: ${fileName}]\n\nKết quả phân tích:\n${analysis}`;
    setInput(imagePrompt);
  }, []);
  
  const charCount = input.length;
  
  // Hiển thị menu khi người dùng nhấp vào nút hoặc khi input trống
  const toggleQuickPrompts = useCallback(() => {
    setShowQuickPrompts(prev => !prev);
  }, []);
  
  // Tự động ẩn gợi ý khi người dùng nhập nội dung
  useEffect(() => {
    if (input.trim() && showQuickPrompts) {
      setShowQuickPrompts(false);
    }
  }, [input, showQuickPrompts]);
  
  return (
    <div className="p-4 border-t">
      {showQuickPrompts && (
        <QuickPrompts onSelectPrompt={handleSelectPrompt} />
      )}
      
      {!isReadOnly && (
        <div className="mb-4 flex justify-center">
          <div className="bg-accent/30 rounded-full p-1.5 backdrop-blur-sm shadow-sm">
            <ImageUploadButton
              onImageAnalysis={handleImageAnalysis}
              disabled={isLoading}
            />
          </div>
        </div>
      )}
      
      <ChatInput
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        handleSubmit={handleFormSubmit}
        apiKeyError={apiKeyError}
        charCount={charCount}
        model={model}
        isReadOnly={isReadOnly}
        showAdvancedOptions={showAdvancedOptions}
        toggleAdvancedOptions={toggleQuickPrompts}
      />
    </div>
  );
});

ChatForm.displayName = 'ChatForm';

export default ChatForm;
