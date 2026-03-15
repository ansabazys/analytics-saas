export interface TrackEvent {
  siteId: string;
  visitorId: string;
  sessionId: string;
  event: string;
  url: string;
  timestamp: number;
  data?: Record<string, unknown>;
}
