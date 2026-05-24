/* Tiny sliding-window IP rate limiter. Per-process, in-memory — same caveat
   as the OTP/order stores: fine for one dev/server, swap for Redis when we
   go multi-instance. */

type Bucket = { hits: number[]; };

declare global {
  // eslint-disable-next-line no-var
  var __emmaLabRateBuckets: Map<string, Bucket> | undefined;
}

const buckets: Map<string, Bucket> =
  globalThis.__emmaLabRateBuckets ??
  (globalThis.__emmaLabRateBuckets = new Map());

export type LimitConfig = {
  /** Window size in ms. */
  windowMs: number;
  /** Max requests per IP in the window. */
  max: number;
};

export type LimitResult =
  | { ok: true }
  | { ok: false; retryAfterSec: number };

export function rateLimit(
  key: string,
  ip: string,
  cfg: LimitConfig,
): LimitResult {
  const now = Date.now();
  const bucketKey = `${key}:${ip}`;
  const bucket = buckets.get(bucketKey) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < cfg.windowMs);
  if (bucket.hits.length >= cfg.max) {
    const oldest = bucket.hits[0];
    return {
      ok: false,
      retryAfterSec: Math.ceil((cfg.windowMs - (now - oldest)) / 1000),
    };
  }
  bucket.hits.push(now);
  buckets.set(bucketKey, bucket);
  return { ok: true };
}

export function clientIp(req: Request): string {
  /* Prefer the standard forwarded-for chain, fall back to a constant so the
     limiter still functions for purely local requests. */
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "127.0.0.1";
}
