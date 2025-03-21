
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BlogCategory } from '@/types/blogTypes';

interface BlogCategoryMenuProps {
  categories: BlogCategory[];
}

const BlogCategoryMenu: React.FC<BlogCategoryMenuProps> = ({ categories }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      {categories.map((category) => {
        const isActive = 
          (category.slug === 'all' && currentPath === '/blog') || 
          currentPath === `/blog/category/${category.slug}`;
          
        return (
          <Link
            key={category.slug}
            to={category.slug === 'all' ? '/blog' : `/blog/category/${category.slug}`}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              isActive 
                ? "bg-primary text-white" 
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
          >
            {category.name} ({category.count})
          </Link>
        );
      })}
    </div>
  );
};

export default BlogCategoryMenu;
