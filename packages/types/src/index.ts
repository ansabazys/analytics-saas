export interface AnalyticsEvent {
  siteId: string;
  event: string;
  page?: string;
  timestamp: number;
}
