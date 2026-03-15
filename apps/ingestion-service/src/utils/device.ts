export function detectDevice(userAgent?: string): "mobile" | "tablet" | "desktop" {
  if (!userAgent) return "desktop";

  const ua = userAgent.toLowerCase();

  if (ua.includes("mobile")) return "mobile";
  if (ua.includes("tablet")) return "tablet";

  return "desktop";
}
