import { UAParser } from "ua-parser-js";

export function detectDevice(userAgent?: string) {
  const parser = new UAParser(userAgent);

  const deviceType = parser.getDevice().type || "desktop";
  const browser = parser.getBrowser().name || null;
  const os = parser.getOS().name || null;

  return {
    device: deviceType,
    browser,
    os,
  };
}
