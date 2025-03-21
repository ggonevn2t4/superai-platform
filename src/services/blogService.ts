
import { BlogPost, BlogCategory } from '@/types/blogTypes';

// Mock data for blog posts
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Tổng quan về trí tuệ nhân tạo và các ứng dụng hiện đại',
    slug: 'tong-quan-ve-tri-tue-nhan-tao',
    excerpt: 'Tìm hiểu về cách thức hoạt động của trí tuệ nhân tạo và những ứng dụng quan trọng trong đời sống hiện đại.',
    content: `
## Trí tuệ nhân tạo là gì?

Trí tuệ nhân tạo (Artificial Intelligence - AI) là một lĩnh vực của khoa học máy tính tập trung vào việc phát triển các hệ thống có khả năng thực hiện các nhiệm vụ thường đòi hỏi trí tuệ của con người. Các nhiệm vụ này bao gồm nhận dạng hình ảnh, xử lý ngôn ngữ tự nhiên, ra quyết định, và học từ dữ liệu.

### Các loại trí tuệ nhân tạo

- **AI hẹp (Narrow AI)**: Được thiết kế để thực hiện một nhiệm vụ cụ thể, như nhận dạng khuôn mặt hoặc trò chuyện.
- **AI tổng quát (General AI)**: Có khả năng hiểu, học hỏi và áp dụng kiến thức vào nhiều lĩnh vực khác nhau, tương tự như con người.
- **Siêu AI (Superintelligent AI)**: Các hệ thống AI có trí thông minh vượt trội so với con người trong mọi lĩnh vực.

## Ứng dụng của AI trong đời sống hiện đại

### 1. Y tế
- Chẩn đoán bệnh từ hình ảnh y tế
- Dự đoán nguy cơ mắc bệnh
- Phát triển thuốc mới

### 2. Giáo dục
- Cá nhân hóa việc học tập
- Hệ thống chấm điểm tự động
- Trợ giảng ảo

### 3. Tài chính
- Phát hiện gian lận
- Giao dịch tự động
- Tư vấn đầu tư

## Thách thức và triển vọng tương lai

Mặc dù AI mang lại nhiều lợi ích, nhưng cũng đặt ra nhiều thách thức:

- Vấn đề đạo đức và quyền riêng tư
- Mất việc làm do tự động hóa
- Thiên kiến trong các thuật toán

Trong tương lai, AI sẽ tiếp tục phát triển và trở thành một phần không thể thiếu trong cuộc sống của chúng ta, đóng vai trò quan trọng trong việc giải quyết các vấn đề phức tạp như biến đổi khí hậu, y tế và năng lượng.
    `,
    author: 'Nguyễn Văn A',
    publishedAt: '2023-09-15',
    readingTime: '8 phút',
    category: 'Công nghệ',
    tags: ['AI', 'Machine Learning', 'Deep Learning', 'Công nghệ'],
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
  },
  {
    id: '2',
    title: 'Học máy cơ bản: Hướng dẫn cho người mới bắt đầu',
    slug: 'hoc-may-co-ban-huong-dan-cho-nguoi-moi',
    excerpt: 'Bài viết này sẽ giúp bạn hiểu những khái niệm cơ bản về học máy và cách áp dụng vào các bài toán thực tế.',
    content: `
## Học máy là gì?

Học máy (Machine Learning) là một nhánh của trí tuệ nhân tạo tập trung vào việc phát triển các thuật toán và mô hình cho phép máy tính học từ dữ liệu và đưa ra dự đoán hoặc quyết định mà không cần được lập trình cụ thể.

### Các loại học máy

1. **Học có giám sát (Supervised Learning)**
   - Sử dụng dữ liệu đã được gán nhãn
   - Ví dụ: Phân loại email spam/không spam

2. **Học không giám sát (Unsupervised Learning)**
   - Sử dụng dữ liệu không có nhãn
   - Ví dụ: Phân cụm khách hàng dựa trên hành vi mua sắm

3. **Học tăng cường (Reinforcement Learning)**
   - Học từ phản hồi của môi trường
   - Ví dụ: AI chơi cờ vua

## Các thuật toán học máy phổ biến

### 1. Hồi quy tuyến tính (Linear Regression)
Dùng để dự đoán giá trị liên tục dựa trên các biến đầu vào.

### 2. Phân loại (Classification)
- Cây quyết định (Decision Trees)
- Máy vector hỗ trợ (SVM)
- K láng giềng gần nhất (K-Nearest Neighbors)

### 3. Mạng nơ-ron (Neural Networks)
Mô phỏng cách hoạt động của não người, phù hợp với dữ liệu phức tạp như hình ảnh và văn bản.

## Bắt đầu với học máy

1. **Học các khái niệm cơ bản**: Xác suất, thống kê, đại số tuyến tính
2. **Chọn ngôn ngữ lập trình**: Python là phổ biến nhất với các thư viện như scikit-learn, TensorFlow, PyTorch
3. **Thực hành với dữ liệu thực**: Kaggle cung cấp nhiều bộ dữ liệu và cuộc thi
4. **Xây dựng danh mục dự án**: Áp dụng kiến thức vào các dự án thực tế

## Kết luận

Học máy là một lĩnh vực đang phát triển nhanh chóng với nhiều ứng dụng thực tế. Bằng cách nắm vững các khái niệm cơ bản và thực hành thường xuyên, bạn có thể bắt đầu áp dụng học máy vào các bài toán thực tế và đóng góp vào sự phát triển của công nghệ này.
    `,
    author: 'Trần Thị B',
    publishedAt: '2023-10-10',
    readingTime: '10 phút',
    category: 'Học máy',
    tags: ['Machine Learning', 'Python', 'AI', 'Hướng dẫn'],
    coverImage: 'https://images.unsplash.com/photo-1591696331111-ef9586a5b17a'
  },
  {
    id: '3',
    title: 'Xử lý ngôn ngữ tự nhiên và ứng dụng trong chatbot',
    slug: 'xu-ly-ngon-ngu-tu-nhien-va-ung-dung-trong-chatbot',
    excerpt: 'Tìm hiểu về kỹ thuật xử lý ngôn ngữ tự nhiên và cách áp dụng để xây dựng chatbot thông minh.',
    content: `
## Xử lý ngôn ngữ tự nhiên là gì?

Xử lý ngôn ngữ tự nhiên (Natural Language Processing - NLP) là một lĩnh vực kết hợp giữa khoa học máy tính, trí tuệ nhân tạo và ngôn ngữ học, tập trung vào việc cho phép máy tính hiểu, phân tích và tạo ra ngôn ngữ tự nhiên của con người.

## Các kỹ thuật cơ bản trong NLP

### 1. Tiền xử lý văn bản
- Tách từ (Tokenization)
- Loại bỏ stopwords
- Chuẩn hóa văn bản (Normalization)
- Tách gốc từ (Stemming/Lemmatization)

### 2. Biểu diễn văn bản
- Mô hình túi từ (Bag of Words)
- TF-IDF (Term Frequency-Inverse Document Frequency)
- Word Embeddings (Word2Vec, GloVe)

### 3. Mô hình ngôn ngữ
- Mô hình N-gram
- Mô hình ngôn ngữ dựa trên mạng nơ-ron (LSTM, GRU)
- Transformers (BERT, GPT)

## Xây dựng chatbot với NLP

### 1. Các loại chatbot
- Chatbot dựa trên luật (Rule-based)
- Chatbot dựa trên học máy (ML-based)
- Chatbot trí tuệ nhân tạo hội thoại (Conversational AI)

### 2. Quy trình xây dựng chatbot
1. **Thu thập dữ liệu**: Tạo bộ dữ liệu hội thoại
2. **Xử lý dữ liệu**: Áp dụng các kỹ thuật NLP
3. **Huấn luyện mô hình**: Sử dụng thuật toán học máy
4. **Tích hợp và triển khai**: Đưa chatbot vào ứng dụng thực tế
5. **Đánh giá và cải tiến**: Thu thập phản hồi và cải thiện liên tục

### 3. Công cụ và thư viện
- **DialogFlow**: Nền tảng của Google để xây dựng chatbot
- **Rasa**: Framework mã nguồn mở cho chatbot
- **NLTK, SpaCy**: Thư viện Python cho NLP
- **TensorFlow, PyTorch**: Xây dựng mô hình học sâu cho NLP

## Các ứng dụng thực tế

1. **Hỗ trợ khách hàng**: Tự động trả lời câu hỏi thường gặp
2. **Thương mại điện tử**: Gợi ý sản phẩm và hỗ trợ mua hàng
3. **Y tế**: Sàng lọc triệu chứng và đặt lịch khám
4. **Giáo dục**: Trợ giảng ảo và hỗ trợ học tập

## Thách thức trong xây dựng chatbot

- Hiểu ngữ cảnh và ý định người dùng
- Xử lý các câu hỏi ngoài phạm vi
- Duy trì cuộc trò chuyện tự nhiên
- Đa ngôn ngữ và phương ngữ

## Tương lai của NLP và chatbot

Với sự phát triển của các mô hình ngôn ngữ lớn (LLM) như GPT và BERT, chatbot ngày càng trở nên thông minh hơn, có khả năng hiểu và tạo ra văn bản gần với con người. Trong tương lai, chúng ta có thể thấy các chatbot không chỉ trả lời câu hỏi mà còn có thể thảo luận, lập luận và thậm chí thể hiện sự đồng cảm với người dùng.
    `,
    author: 'Lê Minh C',
    publishedAt: '2023-11-20',
    readingTime: '12 phút',
    category: 'NLP',
    tags: ['NLP', 'Chatbot', 'Deep Learning', 'AI'],
    coverImage: 'https://images.unsplash.com/photo-1568952433726-3896e3881c65'
  },
  {
    id: '4',
    title: 'Computer Vision: Từ lý thuyết đến ứng dụng thực tế',
    slug: 'computer-vision-tu-ly-thuyet-den-ung-dung-thuc-te',
    excerpt: 'Khám phá thế giới của Computer Vision và các ứng dụng đột phá trong nhận dạng hình ảnh.',
    content: `
## Computer Vision là gì?

Computer Vision (Thị giác máy tính) là một lĩnh vực của trí tuệ nhân tạo tập trung vào việc cho phép máy tính "nhìn" và hiểu hình ảnh và video như con người. Mục tiêu là trích xuất thông tin có ý nghĩa từ dữ liệu hình ảnh và đưa ra quyết định hoặc đề xuất dựa trên thông tin đó.

## Các kỹ thuật cơ bản trong Computer Vision

### 1. Xử lý hình ảnh
- Lọc nhiễu (Image Filtering)
- Phát hiện cạnh (Edge Detection)
- Phân đoạn hình ảnh (Image Segmentation)
- Trích xuất đặc trưng (Feature Extraction)

### 2. Học sâu cho Computer Vision
- Mạng nơ-ron tích chập (CNN)
- Mạng R-CNN, Fast R-CNN, Faster R-CNN
- YOLO (You Only Look Once)
- Mạng sinh đối kháng (GAN)

### 3. Các bài toán phổ biến
- Phân loại hình ảnh (Image Classification)
- Phát hiện đối tượng (Object Detection)
- Phân đoạn ngữ nghĩa (Semantic Segmentation)
- Nhận dạng khuôn mặt (Face Recognition)

## Ứng dụng thực tế của Computer Vision

### 1. Y tế
- Phân tích hình ảnh X-quang, CT, MRI
- Phát hiện ung thư từ hình ảnh y tế
- Phẫu thuật với sự hỗ trợ của máy tính

### 2. Ô tô tự lái
- Phát hiện làn đường và biển báo
- Nhận diện người đi bộ và phương tiện khác
- Lập bản đồ và định vị (SLAM)

### 3. Nông nghiệp
- Giám sát sức khỏe cây trồng
- Phát hiện dịch bệnh và sâu hại
- Tự động thu hoạch

### 4. An ninh và giám sát
- Nhận dạng khuôn mặt
- Phát hiện hành vi bất thường
- Giám sát giao thông

### 5. Thực tế tăng cường (AR) và thực tế ảo (VR)
- Ứng dụng mua sắm trực tuyến
- Trò chơi tương tác
- Đào tạo và mô phỏng

## Xây dựng ứng dụng Computer Vision

### 1. Công cụ và thư viện
- **OpenCV**: Thư viện mã nguồn mở cho Computer Vision
- **TensorFlow/Keras**: Framework học sâu cho Computer Vision
- **PyTorch**: Framework học sâu linh hoạt
- **Detectron2**: Thư viện phát hiện đối tượng của Facebook

### 2. Quy trình phát triển
1. **Thu thập dữ liệu**: Tạo bộ dữ liệu hình ảnh với nhãn
2. **Tiền xử lý**: Chuẩn hóa và làm sạch dữ liệu
3. **Thiết kế mô hình**: Lựa chọn kiến trúc mạng nơ-ron
4. **Huấn luyện**: Tối ưu hóa tham số mô hình
5. **Đánh giá**: Kiểm tra hiệu suất trên dữ liệu kiểm thử
6. **Triển khai**: Đưa mô hình vào sản phẩm thực tế

## Thách thức và giới hạn

- Nhu cầu dữ liệu lớn
- Tính toán đòi hỏi nhiều tài nguyên
- Thiên kiến trong dữ liệu
- Khả năng thích ứng với điều kiện thay đổi
- Bảo mật và quyền riêng tư

## Tương lai của Computer Vision

Computer Vision đang phát triển nhanh chóng với sự xuất hiện của các mô hình đa phương thức (multimodal) như CLIP, DALL-E, và Imagen, cho phép tích hợp giữa hình ảnh và văn bản. Trong tương lai, chúng ta có thể thấy các hệ thống thị giác máy tính có khả năng hiểu sâu hơn về ngữ cảnh, quan hệ không gian và thậm chí cả cảm xúc con người từ hình ảnh và video.
    `,
    author: 'Phạm Đức D',
    publishedAt: '2023-12-05',
    readingTime: '15 phút',
    category: 'Computer Vision',
    tags: ['Computer Vision', 'Deep Learning', 'CNN', 'Object Detection'],
    coverImage: 'https://images.unsplash.com/photo-1560472355-536de3962603'
  }
];

// Danh sách các danh mục
const blogCategories: BlogCategory[] = [
  { name: 'Tất cả', slug: 'all', count: blogPosts.length },
  { name: 'Công nghệ', slug: 'cong-nghe', count: blogPosts.filter(post => post.category === 'Công nghệ').length },
  { name: 'Học máy', slug: 'hoc-may', count: blogPosts.filter(post => post.category === 'Học máy').length },
  { name: 'NLP', slug: 'nlp', count: blogPosts.filter(post => post.category === 'NLP').length },
  { name: 'Computer Vision', slug: 'computer-vision', count: blogPosts.filter(post => post.category === 'Computer Vision').length }
];

// Lấy tất cả bài viết blog
export const getAllBlogPosts = (): BlogPost[] => {
  return blogPosts;
};

// Lấy bài viết blog theo slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Lấy bài viết blog theo danh mục
export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  if (category === 'all') return blogPosts;
  return blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
};

// Lấy tất cả các danh mục
export const getAllCategories = (): BlogCategory[] => {
  return blogCategories;
};

// Lấy các bài viết liên quan
export const getRelatedPosts = (currentPostId: string, limit: number = 3): BlogPost[] => {
  const currentPost = blogPosts.find(post => post.id === currentPostId);
  if (!currentPost) return [];
  
  return blogPosts
    .filter(post => post.id !== currentPostId && (
      post.category === currentPost.category || 
      post.tags.some(tag => currentPost.tags.includes(tag))
    ))
    .sort(() => 0.5 - Math.random()) // Sắp xếp ngẫu nhiên
    .slice(0, limit);
};

// Tìm kiếm bài viết
export const searchBlogPosts = (query: string): BlogPost[] => {
  const searchTerm = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) || 
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};
