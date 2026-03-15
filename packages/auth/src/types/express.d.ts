import { AuthPayload } from "./auth.types";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;

      membership?: {
        userId: string;
        organizationId: string;
        role: "owner" | "admin" | "member";
      };
    }
  }
}

export {};