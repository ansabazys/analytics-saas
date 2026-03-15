export interface TrackEvent {
  siteId: string;
  event: string;
  url: string;
  timestamp: number;
  data?: Record<string, unknown>;
}
