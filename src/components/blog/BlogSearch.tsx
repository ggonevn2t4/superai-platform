
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface BlogSearchProps {
  onSearch: (query: string) => void;
}

const BlogSearch: React.FC<BlogSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full max-w-md mb-8">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Tìm kiếm bài viết..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
        <Button 
          type="submit" 
          size="icon" 
          variant="ghost" 
          className="absolute right-0 top-0"
        >
          <Search size={18} />
        </Button>
      </div>
    </form>
  );
};

export default BlogSearch;
