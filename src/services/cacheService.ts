
/**
 * Enhanced caching service with improved memory management and cache invalidation
 */

interface CacheItem<T> {
  value: T;
  timestamp: number;
  expiresIn: number; // milliseconds
}

class CacheService {
  private cache: Map<string, CacheItem<any>> = new Map();
  private maxSize: number = 100; // Maximum number of items to store in cache
  
  // Set an item in the cache with an expiration time
  set<T>(key: string, value: T, expiresIn: number = 5 * 60 * 1000): void {
    // If cache is at capacity, remove oldest items
    if (this.cache.size >= this.maxSize) {
      this.removeOldestItems(Math.floor(this.maxSize * 0.2)); // Remove 20% oldest items
    }
    
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      expiresIn
    });
  }
  
  // Get an item from the cache, return null if expired or not found
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    const isExpired = Date.now() > item.timestamp + item.expiresIn;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value as T;
  }
  
  // Check if an item exists in the cache and is not expired
  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;
    
    const isExpired = Date.now() > item.timestamp + item.expiresIn;
    if (isExpired) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }
  
  // Delete an item from the cache
  delete(key: string): void {
    this.cache.delete(key);
  }
  
  // Clear all items from the cache
  clear(): void {
    this.cache.clear();
  }
  
  // Generate a cache key for API requests
  generateCacheKey(endpoint: string, params: any): string {
    const paramsString = JSON.stringify(params);
    return `${endpoint}:${paramsString}`;
  }
  
  // Remove expired items from the cache
  cleanExpired(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.timestamp + item.expiresIn) {
        this.cache.delete(key);
      }
    }
  }
  
  // Remove oldest items when cache is full
  private removeOldestItems(count: number): void {
    const items = Array.from(this.cache.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp);
    
    for (let i = 0; i < Math.min(count, items.length); i++) {
      this.cache.delete(items[i][0]);
    }
  }
  
  // Set maximum cache size
  setMaxSize(size: number): void {
    this.maxSize = size;
    if (this.cache.size > this.maxSize) {
      this.removeOldestItems(this.cache.size - this.maxSize);
    }
  }
}

// Export a singleton instance
export const cacheService = new CacheService();
