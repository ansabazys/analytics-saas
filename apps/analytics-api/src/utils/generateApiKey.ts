import crypto from "crypto";

export function generatePublicKey() {
  return "trk_" + crypto.randomBytes(16).toString("hex");
}

export function generateSecretKey() {
  return "trk_sk_" + crypto.randomBytes(32).toString("hex");
}