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
