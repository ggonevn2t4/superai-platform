
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
    phoneNumber: "8873333333", // Usually same as bank account number
    accountName: "Cao Nhật Quang",
    instructions: "Chuyển tiền qua MoMo với nội dung: SuperAI-[Email của bạn]"
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Set CORS headers for all responses
  const headers = { ...corsHeaders, 'Content-Type': 'application/json' };
  
  // Route handling
  const url = new URL(req.url);
  const path = url.pathname.split('/').pop();
  
  if (req.method === 'GET') {
    if (path === 'methods') {
      // Return available payment methods
      return new Response(JSON.stringify(paymentMethods), { headers });
    }
  } else if (req.method === 'POST') {
    if (path === 'initiate') {
      try {
        const { plan, paymentMethod, userEmail, amount } = await req.json();
        
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
    } else if (path === 'verify') {
      // In a real implementation, this would verify a payment has been received
      // For demo purposes, we'll simulate a successful verification
      try {
        const { referenceCode } = await req.json();
        
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
});
