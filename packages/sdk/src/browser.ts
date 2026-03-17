import { Tracpy } from "./tracpy";

declare global {
  interface Window {
    tracpy?: Tracpy;
  }
}

(function () {
  const script = document.currentScript as HTMLScriptElement | null;

  if (!script) {
    console.error("Tracpy: unable to find script tag");
    return;
  }

  const siteId = script.getAttribute("data-site");

  if (!siteId) {
    console.error("Tracpy: data-site attribute missing");
    return;
  }

  const endpoint = script.getAttribute("data-endpoint") ?? "http://localhost:4000/events/collect";

  window.tracpy = new Tracpy(siteId, { endpoint });
})();
