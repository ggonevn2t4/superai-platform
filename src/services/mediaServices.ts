
import { supabase } from "@/integrations/supabase/client";
import { cacheService } from "./cacheService";

// Image analysis with caching
export const analyzeImage = async (imageBase64: string): Promise<string> => {
  try {
    // Create a hash of the image data for caching
    // We only use the first 100 chars of the base64 string for the key to avoid extremely long keys
    const imageHash = imageBase64.substring(0, 100);
    const cacheKey = cacheService.generateCacheKey('image-analysis', { imageHash });
    
    // Check cache first
    const cachedAnalysis = cacheService.get<string>(cacheKey);
    if (cachedAnalysis) {
      console.log('Using cached image analysis');
      return cachedAnalysis;
    }
    
    const { data, error } = await supabase.functions.invoke('analyze-image', {
      body: { imageBase64 },
    });

    if (error) throw new Error(error.message);
    
    // Cache the result for 30 minutes
    cacheService.set(cacheKey, data.analysis, 30 * 60 * 1000);
    
    return data.analysis;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

// Specific object detection in images
export const detectObjectsInImage = async (imageBase64: string): Promise<{ 
  objects: Array<{ label: string; confidence: number }>; 
  summary: string;
}> => {
  try {
    // Create a hash of the image data for caching
    const imageHash = imageBase64.substring(0, 100);
    const cacheKey = cacheService.generateCacheKey('object-detection', { imageHash });
    
    // Check cache first
    const cachedDetection = cacheService.get<{ 
      objects: Array<{ label: string; confidence: number }>; 
      summary: string;
    }>(cacheKey);
    
    if (cachedDetection) {
      console.log('Using cached object detection result');
      return cachedDetection;
    }
    
    const { data, error } = await supabase.functions.invoke('detect-objects', {
      body: { imageBase64 },
    });

    if (error) throw new Error(error.message);
    
    // Cache the result for 30 minutes
    cacheService.set(cacheKey, data, 30 * 60 * 1000);
    
    return data;
  } catch (error) {
    console.error('Error detecting objects in image:', error);
    throw new Error('Không thể nhận dạng đối tượng trong hình ảnh. Vui lòng thử lại sau.');
  }
};

// Speech to text with caching
export const speechToText = async (audioBase64: string): Promise<string> => {
  try {
    // Create a hash of the audio data for caching
    // We only use the first 100 chars of the base64 string for the key to avoid extremely long keys
    const audioHash = audioBase64.substring(0, 100);
    const cacheKey = cacheService.generateCacheKey('speech-to-text', { audioHash });
    
    // Check cache first
    const cachedText = cacheService.get<string>(cacheKey);
    if (cachedText) {
      console.log('Using cached speech-to-text result');
      return cachedText;
    }
    
    const { data, error } = await supabase.functions.invoke('speech-to-text', {
      body: { audio: audioBase64 },
    });

    if (error) throw new Error(error.message);
    
    // Cache the result for 30 minutes
    cacheService.set(cacheKey, data.text, 30 * 60 * 1000);
    
    return data.text;
  } catch (error) {
    console.error('Error converting speech to text:', error);
    throw error;
  }
};
