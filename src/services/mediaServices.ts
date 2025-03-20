
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

// Text to speech - We don't cache this because it returns audio data
export const textToSpeech = async (text: string, voice: string = 'alloy'): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('text-to-speech', {
      body: { text, voice },
    });

    if (error) throw new Error(error.message);
    return data.audioContent;
  } catch (error) {
    console.error('Error converting text to speech:', error);
    throw error;
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
