import { and, db, desc, eq, event, sql } from "@repo/database";

export const getPageViews = async (websiteId: string) => {
  const [result] = await db
    .select({
      total: sql<number>`count(*)::int`,
    })
    .from(event)
    .where(and(eq(event.websiteId, websiteId), eq(event.event, "pageview")));

  return { total: result?.total ?? 0 };
};

export const getPageViewsByPage = async (websiteId: string) => {
  const viewCount = sql<number>`count(*)::int`;

  return db
    .select({
      path: event.path,
      views: viewCount,
    })
    .from(event)
    .where(and(eq(event.websiteId, websiteId), eq(event.event, "pageview")))
    .groupBy(event.path)
    .orderBy(desc(viewCount));
};

export const getUniqueVisitors = async (websiteId: string) => {
  const visitors = await db
    .selectDistinct({
      visitorId: event.visitorId,
    })
    .from(event)
    .where(and(eq(event.websiteId, websiteId), eq(event.event, "pageview")));

  return {
    visitors: visitors.length,
  };
};

export const getTrafficSources = async (websiteId: string) => {
  const source = sql<string>`COALESCE(${event.referrer}, 'direct')`;
  const visits = sql<number>`count(*)::int`;

  return db
    .select({
      source,
      visits,
    })
    .from(event)
    .where(and(eq(event.websiteId, websiteId), eq(event.event, "pageview")))
    .groupBy(source)
    .orderBy(desc(visits));
};

export const getDeviceAnalytics = async (websiteId: string) => {
  const deviceName = sql<string>`COALESCE(${event.device}, 'unknown')`;
  const count = sql<number>`count(*)::int`;

  return db
    .select({
      device: deviceName,
      count,
    })
    .from(event)
    .where(and(eq(event.websiteId, websiteId), eq(event.event, "pageview")))
    .groupBy(deviceName)
    .orderBy(desc(count));
};

export const getBrowserAnalytics = async (websiteId: string) => {
  const browserName = sql<string>`COALESCE(${event.browser}, 'unknown')`;
  const count = sql<number>`count(*)::int`;

  return db
    .select({
      browser: browserName,
      count,
    })
    .from(event)
    .where(and(eq(event.websiteId, websiteId), eq(event.event, "pageview")))
    .groupBy(browserName)
    .orderBy(desc(count));
};

export const getCountryAnalytics = async (websiteId: string) => {
  const countryName = sql<string>`COALESCE(${event.country}, 'unknown')`;
  const count = sql<number>`count(*)::int`;

  return db
    .select({
      country: countryName,
      count,
    })
    .from(event)
    .where(and(eq(event.websiteId, websiteId), eq(event.event, "pageview")))
    .groupBy(countryName)
    .orderBy(desc(count));
};
