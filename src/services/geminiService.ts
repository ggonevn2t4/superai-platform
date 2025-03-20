
// List of backup API keys for Gemini
export const GEMINI_API_KEYS = [
  'AIzaSyCehIeceHVA3z9EeQcwaK2GfaELT1LeG2Q', // Current key
  'AIzaSyBhtyNlHyr_lFfkgj0QL-IDwHQMOUWRHgQ', // Backup key 1
  'AIzaSyA7_OmfZP8vDjd6svbToQPG1P8zYDBqOeg', // Backup key 2
  'AIzaSyB7iHCZvj9qCUGt0KzIFkPYHXcTyHAJDZ0'  // Backup key 3
];

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

export interface GeminiConfig {
  temperature?: number;
  topP?: number;
  topK?: number;
  maxOutputTokens?: number;
}

export interface GeminiError {
  isError: true;
  code: number;
  message: string;
  status?: string;
}

// Cơ chế luân chuyển API key
let currentKeyIndex = 0;

const getNextApiKey = () => {
  currentKeyIndex = (currentKeyIndex + 1) % GEMINI_API_KEYS.length;
  return GEMINI_API_KEYS[currentKeyIndex];
};

/**
 * Gửi tin nhắn đến API Gemini và nhận phản hồi với cơ chế thử các API key khác nhau
 */
export const sendMessageToGemini = async (
  messageContent: string, 
  config: GeminiConfig = {}
): Promise<string | GeminiError> => {
  // Thử lần lượt từng API key
  let lastError: GeminiError | null = null;
  
  // Thử với mỗi API key trong danh sách
  for (let attempt = 0; attempt < GEMINI_API_KEYS.length; attempt++) {
    try {
      const apiKey = GEMINI_API_KEYS[currentKeyIndex];
      const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
      
      const requestBody: GeminiRequest = {
        contents: [
          {
            role: 'user',
            parts: [{ text: messageContent }]
          }
        ],
        generationConfig: {
          temperature: config.temperature ?? 0.7,
          topP: config.topP ?? 0.95,
          topK: config.topK ?? 40,
          maxOutputTokens: config.maxOutputTokens ?? 2048
        }
      };
      
      const response = await fetch(`${apiUrl}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        // Fix: Ensure errorCode is always a number
        const errorCode: number = typeof errorData?.error?.code === 'string' 
          ? parseInt(errorData.error.code, 10) 
          : (errorData?.error?.code || response.status);
          
        const errorMsg = errorData?.error?.message || 'Lỗi không xác định';
        const errorStatus = errorData?.error?.status;
        
        // Nếu lỗi quota, thử API key tiếp theo
        if (errorCode === 429) {
          currentKeyIndex = getNextApiKey();
          lastError = {
            isError: true,
            code: 429,
            message: `API key ${currentKeyIndex + 1}/${GEMINI_API_KEYS.length} đã hết quota. Đang thử key tiếp theo...`,
            status: errorStatus
          };
          continue; // Thử với API key tiếp theo
        }
        
        return {
          isError: true,
          code: errorCode,
          message: errorMsg,
          status: errorStatus
        };
      }
      
      const data: GeminiResponse = await response.json();
      
      if (data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts.length > 0) {
        return data.candidates[0].content.parts[0].text;
      } else {
        return {
          isError: true,
          code: 0,
          message: 'Không nhận được phản hồi hợp lệ từ Gemini API'
        };
      }
    } catch (error) {
      console.error('Lỗi khi gọi Gemini API:', error);
      currentKeyIndex = getNextApiKey();
      lastError = {
        isError: true,
        code: 500,
        message: error instanceof Error ? error.message : 'Lỗi không xác định khi gọi API'
      };
    }
  }
  
  // Nếu đã thử tất cả các API key mà vẫn thất bại
  return lastError || {
    isError: true,
    code: 429,
    message: 'Tất cả API key Gemini đều đã hết quota. Vui lòng thử lại sau hoặc sử dụng một model khác.',
  };
};

// Function to help provide system instructions to Gemini
export const sendMessageWithSystemInstructions = async (
  messageContent: string,
  systemInstructions: string,
  config: GeminiConfig = {}
): Promise<string | GeminiError> => {
  // Thử lần lượt từng API key
  let lastError: GeminiError | null = null;
  
  // Thử với mỗi API key trong danh sách
  for (let attempt = 0; attempt < GEMINI_API_KEYS.length; attempt++) {
    try {
      const apiKey = GEMINI_API_KEYS[currentKeyIndex];
      const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
      
      const requestBody: GeminiRequest = {
        contents: [
          {
            role: 'user',
            parts: [{ text: systemInstructions }]
          },
          {
            role: 'model',
            parts: [{ text: 'Tôi sẽ tuân theo những hướng dẫn trên.' }]
          },
          {
            role: 'user',
            parts: [{ text: messageContent }]
          }
        ],
        generationConfig: {
          temperature: config.temperature ?? 0.7,
          topP: config.topP ?? 0.95,
          topK: config.topK ?? 40,
          maxOutputTokens: config.maxOutputTokens ?? 2048
        }
      };
      
      const response = await fetch(`${apiUrl}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        // Fix: Ensure errorCode is always a number using the same approach
        const errorCode: number = typeof errorData?.error?.code === 'string' 
          ? parseInt(errorData.error.code, 10) 
          : (errorData?.error?.code || response.status);
          
        const errorMsg = errorData?.error?.message || 'Lỗi không xác định';
        const errorStatus = errorData?.error?.status;
        
        // Nếu lỗi quota, thử API key tiếp theo
        if (errorCode === 429) {
          currentKeyIndex = getNextApiKey();
          lastError = {
            isError: true,
            code: 429,
            message: `API key ${currentKeyIndex + 1}/${GEMINI_API_KEYS.length} đã hết quota. Đang thử key tiếp theo...`,
            status: errorStatus
          };
          continue; // Thử với API key tiếp theo
        }
        
        return {
          isError: true,
          code: errorCode,
          message: errorMsg,
          status: errorStatus
        };
      }
      
      const data: GeminiResponse = await response.json();
      
      if (data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts.length > 0) {
        return data.candidates[0].content.parts[0].text;
      } else {
        return {
          isError: true,
          code: 0,
          message: 'Không nhận được phản hồi hợp lệ từ Gemini API'
        };
      }
    } catch (error) {
      console.error('Lỗi khi gọi Gemini API với system instructions:', error);
      currentKeyIndex = getNextApiKey();
      lastError = {
        isError: true,
        code: 500,
        message: error instanceof Error ? error.message : 'Lỗi không xác định khi gọi API'
      };
    }
  }
  
  // Nếu đã thử tất cả các API key mà vẫn thất bại
  return lastError || {
    isError: true,
    code: 429,
    message: 'Tất cả API key Gemini đều đã hết quota. Vui lòng thử lại sau hoặc sử dụng một model khác.',
  };
};
