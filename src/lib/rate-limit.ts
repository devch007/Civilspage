/**
 * In-memory sliding window rate limiter for Next.js API Routes and Server Actions.
 * Protects against brute-force attacks, DDoS, and credential stuffing.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up stale entries every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetAt) {
        rateLimitStore.delete(key);
      }
    }
  }, 10 * 60 * 1000);
}

export interface RateLimitOptions {
  intervalMs: number; // Time window in milliseconds
  maxRequests: number; // Max allowed requests in this window
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { intervalMs: 60 * 1000, maxRequests: 30 }
): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetAt) {
    // New or expired window
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + options.intervalMs,
    });
    return {
      success: true,
      limit: options.maxRequests,
      remaining: options.maxRequests - 1,
      reset: Math.ceil(options.intervalMs / 1000),
    };
  }

  if (record.count >= options.maxRequests) {
    // Rate limit exceeded
    return {
      success: false,
      limit: options.maxRequests,
      remaining: 0,
      reset: Math.ceil((record.resetAt - now) / 1000),
    };
  }

  record.count += 1;
  return {
    success: true,
    limit: options.maxRequests,
    remaining: options.maxRequests - record.count,
    reset: Math.ceil((record.resetAt - now) / 1000),
  };
}
