
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, Clock, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BlogPost } from '@/types/blogTypes';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, className, featured = false }) => {
  return (
    <Link to={`/blog/${post.slug}`}>
      <Card 
        className={cn(
          "h-full overflow-hidden transition-all duration-300 hover:shadow-md", 
          featured ? "border-primary/10" : "",
          className
        )}
      >
        {post.coverImage && (
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={post.coverImage}
              alt={post.title} 
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        
        <CardHeader className="p-4 pb-0">
          <div className="mb-2">
            <span className="inline-block rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {post.category}
            </span>
          </div>
          <h3 className={cn(
            "line-clamp-2 font-semibold text-foreground hover:text-primary transition-colors",
            featured ? "text-xl" : "text-lg"
          )}>
            {post.title}
          </h3>
        </CardHeader>
        
        <CardContent className="p-4 pt-2">
          <p className="line-clamp-2 text-sm text-muted-foreground mb-2">
            {post.excerpt}
          </p>
          
          <div className="flex items-center text-xs text-muted-foreground gap-3 mt-3">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{post.publishedAt}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 border-t">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm font-medium">
              {post.author}
            </div>
            
            {post.tags.length > 0 && (
              <div className="flex items-center">
                <Tag size={14} className="mr-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {post.tags[0]}{post.tags.length > 1 ? ` +${post.tags.length - 1}` : ''}
                </span>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
