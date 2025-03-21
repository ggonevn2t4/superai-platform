
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import BlogCard from '@/components/blog/BlogCard';
import BlogCategoryMenu from '@/components/blog/BlogCategoryMenu';
import BlogSearch from '@/components/blog/BlogSearch';
import { 
  getAllBlogPosts, 
  getAllCategories, 
  getBlogPostsByCategory,
  searchBlogPosts 
} from '@/services/blogService';
import { LightbulbIcon, BookText } from 'lucide-react';

const Blog: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const categories = getAllCategories();
  
  // Lấy bài viết dựa trên danh mục hoặc tìm kiếm
  const fetchPosts = () => {
    if (searchQuery) {
      return searchBlogPosts(searchQuery);
    }
    
    if (category) {
      return getBlogPostsByCategory(category);
    }
    
    return getAllBlogPosts();
  };
  
  const posts = fetchPosts();
  const featuredPost = posts.length > 0 ? posts[0] : null;
  const regularPosts = posts.length > 0 ? posts.slice(1) : [];
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate('/blog');
  };
  
  // Reset search khi thay đổi danh mục
  useEffect(() => {
    setSearchQuery('');
  }, [category]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-4">
            <BookText size={16} />
            <span>Blog</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">SuperAI Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Khám phá những bài viết mới nhất về trí tuệ nhân tạo, học máy, và nhiều chủ đề công nghệ khác.
          </p>
        </div>
        
        <div className="flex justify-between items-center flex-wrap gap-4">
          <BlogCategoryMenu categories={categories} />
          <BlogSearch onSearch={handleSearch} />
        </div>
        
        {searchQuery && (
          <div className="mb-8 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Kết quả tìm kiếm cho "{searchQuery}": {posts.length} bài viết
            </p>
          </div>
        )}
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <LightbulbIcon size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Không tìm thấy bài viết nào</h3>
            <p className="text-muted-foreground">
              Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Featured post */}
            {featuredPost && !searchQuery && (
              <div className="mb-12">
                <BlogCard post={featuredPost} featured={true} />
              </div>
            )}
            
            {/* Regular posts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
