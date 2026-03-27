import { db, eq, membership, organization } from "@repo/database";

export const createOrganization = async (name: string, slug: string, ownerId: string) => {
  return db.transaction(async (tx) => {
    const [createdOrganization] = await tx
      .insert(organization)
      .values({
        name,
        slug,
        ownerId,
        updatedAt: new Date(),
      })
      .returning();

    await tx.insert(membership).values({
      organizationId: createdOrganization.id,
      userId: ownerId,
      role: "owner",
    });

    return createdOrganization;
  });
};

export const getOrganizations = async (userId: string) => {
  const memberships = await db
    .select({
      organization,
    })
    .from(membership)
    .innerJoin(organization, eq(membership.organizationId, organization.id))
    .where(eq(membership.userId, userId));

  return memberships.map((item) => item.organization);
};

export const getOrganizationById = async (id: string) => {
  const [record] = await db.select().from(organization).where(eq(organization.id, id)).limit(1);

  return record;
};

export const updateOrganization = async (id: string, data: { name?: string; slug?: string }) => {
  const [record] = await db
    .update(organization)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(organization.id, id))
    .returning();

  return record;
};

export const deleteOrganization = async (id: string) => {
  const [record] = await db.delete(organization).where(eq(organization.id, id)).returning();

  return record;
};
