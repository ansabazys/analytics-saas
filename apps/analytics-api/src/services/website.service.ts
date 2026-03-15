import { db } from "@repo/database";
import { generatePublicKey, generateSecretKey } from "../utils/generateApiKey";

export const createWebsite = async (
  organizationId: string,
  name: string,
  domain: string
) => {
  const publicKey = generatePublicKey();
  const secretKey = generateSecretKey();

  const website = await db.website.create({
    data: {
      name,
      domain,
      organizationId,
      publicKey,
      secretKey,
    },
  });

  return website;
};

export const getWebsites = async (organizationId: string) => {
  return db.website.findMany({
    where: {
      organizationId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getWebsiteById = async (id: string) => {
  return db.website.findUnique({
    where: { id },
  });
};

export const updateWebsite = async (
  id: string,
  data: { name?: string; domain?: string }
) => {
  return db.website.update({
    where: { id },
    data,
  });
};

export const deleteWebsite = async (id: string) => {
  return db.website.delete({
    where: { id },
  });
};

export const regenerateWebsiteKeys = async (id: string) => {
  const publicKey = generatePublicKey();
  const secretKey = generateSecretKey();

  return db.website.update({
    where: { id },
    data: {
      publicKey,
      secretKey,
    },
  });
};