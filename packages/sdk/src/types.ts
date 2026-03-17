export interface TrackEvent {
  siteId: string;
  visitorId: string;
  sessionId: string;
  event: string;
  url: string;
  referrer: string;
  screen: string;
  language: string;
  userAgent: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

export interface TrackerConfig {
  endpoint: string;
  batchSize?: number;
  flushInterval?: number;
}
