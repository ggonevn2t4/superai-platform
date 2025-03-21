
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getBlogPostBySlug, getRelatedPosts } from '@/services/blogService';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RelatedPosts from '@/components/blog/RelatedPosts';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Tìm bài viết dựa trên slug
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const relatedPosts = post ? getRelatedPosts(post.id, 3) : [];
  
  // Chuyển hướng nếu không tìm thấy bài viết
  useEffect(() => {
    if (!post) {
      navigate('/blog');
    }
  }, [post, navigate]);
  
  if (!post) {
    return null;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-8" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="mr-2" />
          Quay lại
        </Button>
        
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Link 
                to={`/blog/category/${post.category.toLowerCase().replace(' ', '-')}`}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                {post.category}
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{post.publishedAt}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{post.readingTime}</span>
              </div>
            </div>
            
            {post.coverImage && (
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </header>
          
          <div className="prose prose-lg max-w-none">
            {/* Markdown content - in a real app use a markdown parser */}
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
          </div>
          
          <footer className="mt-10 pt-6 border-t">
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <div 
                  key={tag}
                  className="flex items-center gap-1 bg-muted/50 px-3 py-1 rounded-full text-sm text-muted-foreground"
                >
                  <Tag size={14} />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
            
            <RelatedPosts posts={relatedPosts} />
          </footer>
        </article>
      </div>
    </Layout>
  );
};

export default BlogPost;
