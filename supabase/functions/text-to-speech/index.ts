
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voice = 'alloy' } = await req.json();
    
    if (!text) {
      throw new Error('Text is required');
    }
    
    // Calculate a hash of the text and voice parameters for cache validation
    const contentHash = await crypto.subtle.digest(
      "SHA-1",
      new TextEncoder().encode(`${text}-${voice}`)
    );
    const etag = Array.from(new Uint8Array(contentHash))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
      
    // Check if the request includes a matching ETag
    const clientETag = req.headers.get("If-None-Match");
    if (clientETag === `"${etag}"`) {
      return new Response(null, { 
        status: 304, 
        headers: { 
          ...corsHeaders, 
          'ETag': `"${etag}"`,
          'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        } 
      });
    }
    
    // Generate speech using OpenAI TTS API
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        input: text,
        voice: voice,
        response_format: 'mp3',
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate speech');
    }
    
    // Convert audio buffer to base64
    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    );
    
    return new Response(
      JSON.stringify({ 
        audioContent: `data:audio/mp3;base64,${base64Audio}` 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'ETag': `"${etag}"`,
          'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        } 
      }
    );
  } catch (error) {
    console.error('Error converting text to speech:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
