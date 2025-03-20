
// API key cho Gemini
export const GEMINI_API_KEY = 'AIzaSyCehIeceHVA3z9EeQcwaK2GfaELT1LeG2Q';

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

/**
 * Chuyển đổi mã lỗi từ bất kỳ kiểu dữ liệu nào sang kiểu number
 */
const ensureErrorCodeIsNumber = (errorCode: any): number => {
  if (typeof errorCode === 'number') {
    return errorCode;
  }
  
  if (typeof errorCode === 'string') {
    const parsed = parseInt(errorCode, 10);
    return isNaN(parsed) ? 500 : parsed;
  }
  
  return 500; // Mã lỗi mặc định nếu không xác định được
};

/**
 * Gửi tin nhắn đến API Gemini và nhận phản hồi
 */
export const sendMessageToGemini = async (
  messageContent: string, 
  config: GeminiConfig = {}
): Promise<string | GeminiError> => {
  try {
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
    
    const response = await fetch(`${apiUrl}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      const errorCode = ensureErrorCodeIsNumber(errorData?.error?.code || response.status);
      const errorMsg = errorData?.error?.message || 'Lỗi không xác định';
      const errorStatus = errorData?.error?.status;
      
      // Xử lý lỗi quota vượt quá
      if (errorCode === 429) {
        return {
          isError: true,
          code: errorCode,
          message: 'Quota API của Gemini đã hết. Vui lòng thử lại sau hoặc sử dụng một API key khác.',
          status: errorStatus
        };
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
    return {
      isError: true,
      code: 500,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi gọi API'
    };
  }
};

// Function to help provide system instructions to Gemini
export const sendMessageWithSystemInstructions = async (
  messageContent: string,
  systemInstructions: string,
  config: GeminiConfig = {}
): Promise<string | GeminiError> => {
  try {
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
    
    const response = await fetch(`${apiUrl}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      const errorCode = ensureErrorCodeIsNumber(errorData?.error?.code || response.status);
      const errorMsg = errorData?.error?.message || 'Lỗi không xác định';
      const errorStatus = errorData?.error?.status;
      
      // Xử lý lỗi quota vượt quá
      if (errorCode === 429) {
        return {
          isError: true,
          code: errorCode,
          message: 'Quota API của Gemini đã hết. Vui lòng thử lại sau hoặc sử dụng một API key khác.',
          status: errorStatus
        };
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
    return {
      isError: true,
      code: 500,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi gọi API'
    };
  }
};
