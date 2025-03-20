
/**
 * Simple caching service to reduce API calls
 */

interface CacheItem<T> {
  value: T;
  timestamp: number;
  expiresIn: number; // milliseconds
}

class CacheService {
  private cache: Map<string, CacheItem<any>> = new Map();
  
  // Set an item in the cache with an expiration time
  set<T>(key: string, value: T, expiresIn: number = 5 * 60 * 1000): void {
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
}

// Export a singleton instance
export const cacheService = new CacheService();
