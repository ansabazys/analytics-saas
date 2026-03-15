import { db } from "@repo/database";

export const getPageViews = async (websiteId: string) => {
  const total = await db.event.count({
    where: {
      websiteId,
      event: "page_view",
    },
  });

  return { total };
};

export const getPageViewsByPage = async (websiteId: string) => {
  const pages = await db.event.groupBy({
    by: ["path"],
    where: {
      websiteId,
      event: "page_view",
    },
    _count: {
      path: true,
    },
    orderBy: {
      _count: {
        path: "desc",
      },
    },
  });

  return pages.map((p) => ({
    path: p.path,
    views: p._count.path,
  }));
};

export const getUniqueVisitors = async (websiteId: string) => {
  const visitors = await db.event.findMany({
    where: {
      websiteId,
      event: "page_view",
    },
    distinct: ["visitorId"],
    select: {
      visitorId: true,
    },
  });

  return {
    visitors: visitors.length,
  };
};

export const getTrafficSources = async (websiteId: string) => {
  const result = await db.$queryRaw<{ source: string; visits: number }[]>`
    SELECT
      COALESCE(referrer, 'direct') as source,
      COUNT(*) as visits
    FROM "Event"
    WHERE "websiteId" = ${websiteId}
      AND event = 'pageview'
    GROUP BY source
    ORDER BY visits DESC
  `;

  return result;
};

export const getDeviceAnalytics = async (websiteId: string) => {
  const result = await db.$queryRaw<{ device: string; count: number }[]>`
    SELECT
      COALESCE(device, 'unknown') as device,
      COUNT(*) as count
    FROM "Event"
    WHERE "websiteId" = ${websiteId}
      AND event = 'pageview'
    GROUP BY device
    ORDER BY count DESC
  `;

  return result;
};

export const getBrowserAnalytics = async (websiteId: string) => {
  const result = await db.$queryRaw<{ browser: string; count: number }[]>`
    SELECT
      COALESCE(browser, 'unknown') as browser,
      COUNT(*) as count
    FROM "Event"
    WHERE "websiteId" = ${websiteId}
      AND event = 'pageview'
    GROUP BY browser
    ORDER BY count DESC
  `;

  return result;
};


export const getCountryAnalytics = async (websiteId: string) => {
  const result = await db.$queryRaw<
    { country: string; count: number }[]
  >`
    SELECT
      COALESCE(country, 'unknown') as country,
      COUNT(*) as count
    FROM "Event"
    WHERE "websiteId" = ${websiteId}
      AND event = 'pageview'
    GROUP BY country
    ORDER BY count DESC
  `;

  return result;
};