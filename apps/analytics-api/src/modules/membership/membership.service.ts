import { and, db, eq, membership, user } from "@repo/database";

export const getOrganizationMembers = async (organizationId: string) => {
  return db
    .select({
      id: membership.id,
      userId: membership.userId,
      organizationId: membership.organizationId,
      role: membership.role,
      createdAt: membership.createdAt,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
        avatarUrl: user.avatarUrl,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
    .from(membership)
    .innerJoin(user, eq(membership.userId, user.id))
    .where(eq(membership.organizationId, organizationId));
};

export const addMember = async (
  organizationId: string,
  userId: string,
  role: "owner" | "admin" | "member",
) => {
  const [record] = await db
    .insert(membership)
    .values({
      organizationId,
      userId,
      role,
    })
    .returning();

  return record;
};

export const updateMemberRole = async (
  organizationId: string,
  userId: string,
  role: "owner" | "admin" | "member",
) => {
  const [record] = await db
    .update(membership)
    .set({
      role,
    })
    .where(and(eq(membership.userId, userId), eq(membership.organizationId, organizationId)))
    .returning();

  return record;
};

export const removeMember = async (organizationId: string, userId: string) => {
  const [record] = await db
    .delete(membership)
    .where(and(eq(membership.userId, userId), eq(membership.organizationId, organizationId)))
    .returning();

  return record;
};
