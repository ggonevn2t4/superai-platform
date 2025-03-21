
import React from 'react';
import { BlogPost } from '@/types/blogTypes';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface RelatedPostsProps {
  posts: BlogPost[];
  className?: string;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts, className }) => {
  if (posts.length === 0) return null;
  
  return (
    <div className={cn("mt-8", className)}>
      <h3 className="text-xl font-semibold mb-4">Bài viết liên quan</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link 
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group"
          >
            <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
              {post.coverImage && (
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-4">
                <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
