
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  amount: number;
  reference: string;
  paymentMethod: 'bank_transfer' | 'momo';
  planType: string;
}

// Mock function to generate a MoMo QR code
// In a production environment, this would call the actual MoMo API
function generateMomoQrCode(amount: number, reference: string): string {
  // This is a placeholder URL
  // In a real implementation, you would generate an actual QR code using MoMo's API
  // For demonstration, we're using a static QR image
  return "/momo-qr.jpg";
}

const handler = async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      status: 204,
    });
  }

  try {
    const { amount, reference, paymentMethod, planType } = await req.json() as PaymentRequest;

    console.log(`Processing ${paymentMethod} payment for ${amount} VND, reference: ${reference}, plan: ${planType}`);

    let responseData;

    if (paymentMethod === 'momo') {
      const qrCodeUrl = generateMomoQrCode(amount, reference);
      responseData = {
        qrCodeUrl,
        reference,
        amount,
        status: "pending",
      };
    } else {
      // For bank transfers we don't need to generate anything
      responseData = {
        reference,
        amount,
        status: "pending",
      };
    }

    return new Response(JSON.stringify(responseData), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Payment Gateway Error:", error.message);
    return new Response(
      JSON.stringify({
        error: error.message || "Unknown error occurred",
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
};

serve(handler);
