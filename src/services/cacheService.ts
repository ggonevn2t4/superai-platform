
/**
 * Enhanced caching service with improved memory management and cache invalidation
 */

interface CacheItem<T> {
  value: T;
  timestamp: number;
  expiresIn: number; // milliseconds
  lastAccessed: number; // For LRU implementation
}

class CacheService {
  private cache: Map<string, CacheItem<any>> = new Map();
  private maxSize: number = 100; // Maximum number of items to store in cache
  private cleanupInterval: number | null = null;
  
  constructor() {
    // Set up automatic cleanup interval (every 5 minutes)
    if (typeof window !== 'undefined') {
      this.cleanupInterval = window.setInterval(() => this.cleanExpired(), 5 * 60 * 1000);
    }
  }
  
  // Set an item in the cache with an expiration time
  set<T>(key: string, value: T, expiresIn: number = 5 * 60 * 1000): void {
    // If cache is at capacity, remove oldest items
    if (this.cache.size >= this.maxSize) {
      this.removeLeastRecentlyUsed(Math.floor(this.maxSize * 0.2)); // Remove 20% least used items
    }
    
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      expiresIn,
      lastAccessed: Date.now()
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
    
    // Update last accessed time for LRU implementation
    item.lastAccessed = Date.now();
    
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
    
    // Update last accessed time for LRU implementation
    item.lastAccessed = Date.now();
    
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
    try {
      const paramsString = JSON.stringify(params);
      return `${endpoint}:${paramsString}`;
    } catch (error) {
      // If JSON.stringify fails (e.g., circular references), use a fallback
      console.warn('Failed to generate cache key with JSON.stringify', error);
      return `${endpoint}:${Date.now()}`;
    }
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
  
  // Remove least recently used items when cache is full (LRU algorithm)
  private removeLeastRecentlyUsed(count: number): void {
    const items = Array.from(this.cache.entries())
      .sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
    
    for (let i = 0; i < Math.min(count, items.length); i++) {
      this.cache.delete(items[i][0]);
    }
  }
  
  // Set maximum cache size
  setMaxSize(size: number): void {
    this.maxSize = size;
    if (this.cache.size > this.maxSize) {
      this.removeLeastRecentlyUsed(this.cache.size - this.maxSize);
    }
  }
  
  // Clean up resources when no longer needed
  destroy(): void {
    if (this.cleanupInterval !== null && typeof window !== 'undefined') {
      window.clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.cache.clear();
  }
}

// Export a singleton instance
export const cacheService = new CacheService();
