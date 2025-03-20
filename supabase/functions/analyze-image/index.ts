
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Cache-Control': 'public, max-age=1800', // Cache for 30 minutes
  'Vary': 'Origin'
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    
    if (!imageBase64) {
      throw new Error('No image data provided');
    }
    
    // Calculate a simple hash of the image data for cache validation
    const imageHashBuffer = await crypto.subtle.digest(
      "SHA-1",
      new TextEncoder().encode(imageBase64.substring(0, 1000))
    );
    const imageHash = Array.from(new Uint8Array(imageHashBuffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
      
    // Check if the request includes a matching ETag
    const clientETag = req.headers.get("If-None-Match");
    if (clientETag === `"${imageHash}"`) {
      return new Response(null, { 
        status: 304, 
        headers: { 
          ...corsHeaders, 
          'ETag': `"${imageHash}"` 
        } 
      });
    }
    
    // Call OpenAI API for image analysis
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Phân tích hình ảnh này chi tiết bằng tiếng Việt.' },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
      }),
    });
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    const analysis = data.choices[0].message.content;
    
    return new Response(
      JSON.stringify({ analysis }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'ETag': `"${imageHash}"` 
        } 
      }
    );
  } catch (error) {
    console.error('Error analyzing image:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
