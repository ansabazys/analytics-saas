export interface TrackEvent {
  siteId: string;
  event: string;
  url: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

export interface EnrichedEvent extends TrackEvent {
  ip?: string;
  userAgent?: string;
  referrer?: string;
  device: "mobile" | "tablet" | "desktop";
  receivedAt: number;
}
