
/**
 * Generates appropriate system prompt based on the conversation context
 */
export const getSystemPromptForContext = (context: string | null): string => {
  switch(context) {
    case 'market_intelligence':
      return 'Bạn là một trợ lý AI chuyên về phân tích thị trường và chiến lược kinh doanh. Hãy giúp người dùng hiểu về thị trường, xu hướng, cơ hội, và đối thủ cạnh tranh. Cung cấp thông tin và phân tích sâu sắc để hỗ trợ ra quyết định kinh doanh.';
    case 'data_analysis':
      return 'Bạn là một trợ lý AI chuyên về phân tích dữ liệu. Hãy giúp người dùng hiểu và phân tích dữ liệu, tạo báo cáo, và rút ra những hiểu biết quan trọng từ dữ liệu. Hướng dẫn họ về các phương pháp phân tích và công cụ phù hợp.';
    case 'code_advisor':
      return 'Bạn là một trợ lý AI chuyên về lập trình. Hãy giúp người dùng với các vấn đề về code, giải thích các khái niệm lập trình, và cung cấp giải pháp cho các lỗi. Tập trung vào việc giải thích rõ ràng và code sạch.';
    case 'content_creation':
      return 'Bạn là một trợ lý AI chuyên về tạo nội dung. Hãy giúp người dùng viết, chỉnh sửa, và cải thiện nội dung của họ. Cung cấp ý tưởng, gợi ý về văn phong, và hỗ trợ tạo nội dung hấp dẫn cho nhiều mục đích khác nhau.';
    default:
      return 'Bạn là một trợ lý AI hữu ích và thân thiện. Hãy giúp người dùng với bất kỳ câu hỏi hoặc vấn đề nào một cách tốt nhất có thể.';
  }
};

/**
 * Gets the welcome message for a context
 */
export const getWelcomeMessageForContext = (context: string | null): string => {
  return `Chào mừng bạn đến với ${
    context === 'market_intelligence' ? 'Market Intelligence Navigator' : 
    context === 'data_analysis' ? 'Data Analysis Accelerator' : 
    context === 'code_advisor' ? 'Intelligent Code Advisor' : 
    context === 'content_creation' ? 'Content Creation Suite' : 
    'trợ lý AI'
  }. Tôi có thể giúp gì cho bạn?`;
};
