import { db } from "@repo/database";

export const createOrganization = async (
  name: string,
  slug: string,
  ownerId: string
) => {
  const organization = await db.organization.create({
    data: {
      name,
      slug,
      ownerId,
    },
  });

  return organization;
};