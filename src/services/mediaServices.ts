
import { supabase } from "@/integrations/supabase/client";

// Image analysis
export const analyzeImage = async (imageBase64: string): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('analyze-image', {
      body: { imageBase64 },
    });

    if (error) throw new Error(error.message);
    return data.analysis;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

// Text to speech
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

// Speech to text
export const speechToText = async (audioBase64: string): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('speech-to-text', {
      body: { audio: audioBase64 },
    });

    if (error) throw new Error(error.message);
    return data.text;
  } catch (error) {
    console.error('Error converting speech to text:', error);
    throw error;
  }
};
