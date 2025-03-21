
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  tags: string[];
  coverImage?: string;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}
