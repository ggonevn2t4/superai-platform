
// API key cho Gemini
export const GEMINI_API_KEY = 'AIzaSyADttn9GcTn-zMtzZnl_AM4S3i-xCLJLUc';

// Interface cho request và response
export interface GeminiMessage {
  role: 'user' | 'model';
  parts: {
    text: string;
  }[];
}

export interface GeminiRequest {
  contents: GeminiMessage[];
  generationConfig: {
    temperature: number;
    topP: number;
    topK: number;
    maxOutputTokens: number;
  };
}

export interface GeminiResponse {
  candidates: {
    content: {
      role: string;
      parts: {
        text: string;
      }[];
    };
    finishReason: string;
  }[];
}

/**
 * Gửi tin nhắn đến API Gemini và nhận phản hồi
 */
export const sendMessageToGemini = async (messageContent: string): Promise<string> => {
  try {
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-2.0:generateContent';
    
    const requestBody: GeminiRequest = {
      contents: [
        {
          role: 'user',
          parts: [{ text: messageContent }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048
      }
    };
    
    const response = await fetch(`${apiUrl}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorData}`);
    }
    
    const data: GeminiResponse = await response.json();
    
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Không nhận được phản hồi hợp lệ từ Gemini API');
    }
  } catch (error) {
    console.error('Lỗi khi gọi Gemini API:', error);
    throw error;
  }
};
