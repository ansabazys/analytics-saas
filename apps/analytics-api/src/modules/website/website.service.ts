import { db, desc, eq, website } from "@repo/database";
import { generatePublicKey, generateSecretKey } from "../../utils/generateApiKey";

export const createWebsite = async (organizationId: string, name: string, domain: string) => {
  const publicKey = generatePublicKey();
  const secretKey = generateSecretKey();

  const [createdWebsite] = await db
    .insert(website)
    .values({
      name,
      domain,
      organizationId,
      publicKey,
      secretKey,
      updatedAt: new Date(),
    })
    .returning();

  return createdWebsite;
};

export const getWebsites = async (organizationId: string) => {
  return db
    .select()
    .from(website)
    .where(eq(website.organizationId, organizationId))
    .orderBy(desc(website.createdAt));
};

export const getWebsiteById = async (id: string) => {
  const [record] = await db.select().from(website).where(eq(website.id, id)).limit(1);

  return record;
};

export const updateWebsite = async (id: string, data: { name?: string; domain?: string }) => {
  const [record] = await db
    .update(website)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(website.id, id))
    .returning();

  return record;
};

export const deleteWebsite = async (id: string) => {
  const [record] = await db.delete(website).where(eq(website.id, id)).returning();

  return record;
};

export const regenerateWebsiteKeys = async (id: string) => {
  const publicKey = generatePublicKey();
  const secretKey = generateSecretKey();

  const [record] = await db
    .update(website)
    .set({
      publicKey,
      secretKey,
      updatedAt: new Date(),
    })
    .where(eq(website.id, id))
    .returning();

  return record;
};
