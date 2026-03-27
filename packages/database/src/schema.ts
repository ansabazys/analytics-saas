import { randomUUID } from "node:crypto";
import { boolean, index, pgEnum, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("Role", ["owner", "admin", "member"]);

export const user = pgTable(
  "User",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    name: text("name"),
    email: text("email").notNull(),
    passwordHash: text("passwordHash").notNull(),
    avatarUrl: text("avatarUrl"),
    emailVerified: boolean("emailVerified").notNull().default(false),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 }).notNull(),
  },
  (table) => ({
    emailKey: unique("User_email_key").on(table.email),
  }),
);

export const organization = pgTable(
  "Organization",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    ownerId: text("ownerId")
      .notNull()
      .references(() => user.id),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 }).notNull(),
  },
  (table) => ({
    slugKey: unique("Organization_slug_key").on(table.slug),
  }),
);

export const membership = pgTable(
  "Membership",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    userId: text("userId")
      .notNull()
      .references(() => user.id),
    organizationId: text("organizationId")
      .notNull()
      .references(() => organization.id),
    role: roleEnum("role").notNull().default("member"),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 }).notNull().defaultNow(),
  },
  (table) => ({
    userOrganizationKey: unique("Membership_userId_organizationId_key").on(
      table.userId,
      table.organizationId,
    ),
  }),
);

export const website = pgTable(
  "Website",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    name: text("name").notNull(),
    domain: text("domain").notNull(),
    organizationId: text("organizationId")
      .notNull()
      .references(() => organization.id),
    publicKey: text("publicKey").notNull(),
    secretKey: text("secretKey").notNull(),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 }).notNull(),
  },
  (table) => ({
    publicKeyKey: unique("Website_publicKey_key").on(table.publicKey),
    secretKeyKey: unique("Website_secretKey_key").on(table.secretKey),
    organizationDomainKey: unique("Website_organizationId_domain_key").on(
      table.organizationId,
      table.domain,
    ),
  }),
);

export const event = pgTable(
  "Event",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    websiteId: text("websiteId")
      .notNull()
      .references(() => website.id),
    visitorId: text("visitorId").notNull(),
    sessionId: text("sessionId").notNull(),
    event: text("event").notNull(),
    path: text("path").notNull(),
    referrer: text("referrer"),
    country: text("country"),
    device: text("device"),
    browser: text("browser"),
    os: text("os"),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 }).notNull().defaultNow(),
  },
  (table) => ({
    websiteIdx: index("Event_websiteId_idx").on(table.websiteId),
    createdAtIdx: index("Event_createdAt_idx").on(table.createdAt),
  }),
);

export const session = pgTable(
  "Session",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    refreshToken: text("refreshToken").notNull(),
    expiresAt: timestamp("expiresAt", { mode: "date", precision: 3 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 }).notNull().defaultNow(),
  },
  (table) => ({
    refreshTokenKey: unique("Session_refreshToken_key").on(table.refreshToken),
  }),
);

export const emailVerificationToken = pgTable(
  "EmailVerificationToken",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    token: text("token").notNull(),
    expiresAt: timestamp("expiresAt", { mode: "date", precision: 3 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 }).notNull().defaultNow(),
  },
  (table) => ({
    tokenKey: unique("EmailVerificationToken_token_key").on(table.token),
  }),
);

export const passwordResetToken = pgTable(
  "PasswordResetToken",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    token: text("token").notNull(),
    expiresAt: timestamp("expiresAt", { mode: "date", precision: 3 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 }).notNull().defaultNow(),
  },
  (table) => ({
    tokenKey: unique("PasswordResetToken_token_key").on(table.token),
    userIdIdx: index("PasswordResetToken_userId_idx").on(table.userId),
  }),
);

export type Role = (typeof roleEnum.enumValues)[number];
