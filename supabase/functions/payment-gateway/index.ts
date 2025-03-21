
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define payment methods
const paymentMethods = {
  bank: {
    name: "MB Bank",
    accountNumber: "8873333333",
    accountName: "Cao Nhật Quang",
    instructions: "Chuyển khoản với nội dung: SuperAI-[Email của bạn]"
  },
  momo: {
    name: "MoMo",
    phoneNumber: "*******608", // Partially masked phone
    accountName: "Cao Nhật Quang",
    instructions: "Chuyển tiền qua MoMo với nội dung: SuperAI-[Email của bạn]",
    qrCodeUrl: "/lovable-uploads/0be1694a-8607-46e6-b75c-214a50eac0e5.png"
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Set CORS headers for all responses
  const headers = { ...corsHeaders, 'Content-Type': 'application/json' };
  
  try {
    // Parse the request body
    const body = await req.json();
    const { action } = body;
    
    if (req.method === 'GET' || action === 'methods') {
      // Return available payment methods
      return new Response(JSON.stringify(paymentMethods), { headers });
    } else if (req.method === 'POST') {
      if (action === 'initiate') {
        try {
          const { plan, paymentMethod, userEmail, amount } = body;
          
          // Generate a unique payment reference code
          const referenceCode = `SuperAI-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
          
          // In a real implementation, you would:
          // 1. Store the payment request in a database
          // 2. Generate QR codes for easier payment
          // 3. Potentially integrate directly with bank/momo APIs
          
          // For this demo, we'll return payment instructions
          const selectedMethod = paymentMethods[paymentMethod as keyof typeof paymentMethods];
          
          const response = {
            success: true,
            referenceCode,
            paymentDetails: {
              ...selectedMethod,
              amount,
              plan,
              userEmail,
              instructions: selectedMethod.instructions.replace('[Email của bạn]', userEmail)
            }
          };
          
          return new Response(JSON.stringify(response), { headers });
        } catch (error) {
          console.error("Payment initiation error:", error);
          return new Response(
            JSON.stringify({ success: false, error: "Lỗi khi xử lý yêu cầu thanh toán" }),
            { headers, status: 400 }
          );
        }
      } else if (action === 'verify') {
        // In a real implementation, this would verify a payment has been received
        // For demo purposes, we'll simulate a successful verification
        try {
          const { referenceCode } = body;
          
          return new Response(
            JSON.stringify({ 
              success: true, 
              verified: true,
              message: "Thanh toán đã được xác minh" 
            }),
            { headers }
          );
        } catch (error) {
          console.error("Payment verification error:", error);
          return new Response(
            JSON.stringify({ success: false, error: "Lỗi khi xác minh thanh toán" }),
            { headers, status: 400 }
          );
        }
      }
    }
    
    // Default response for unknown routes
    return new Response(
      JSON.stringify({ success: false, error: "Endpoint không hợp lệ" }),
      { headers, status: 404 }
    );
  } catch (error) {
    console.error("Request processing error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Lỗi xử lý yêu cầu" }),
      { headers, status: 500 }
    );
  }
});
