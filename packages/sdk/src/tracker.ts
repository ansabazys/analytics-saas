import type { TrackEvent, TrackerConfig } from "./types";

let queue: TrackEvent[] = [];
let config: TrackerConfig;

export function initTracker(cfg: TrackerConfig) {
  config = {
    batchSize: 5,
    flushInterval: 5000,
    ...cfg,
  };

  setInterval(flushQueue, config.flushInterval);

  // Flush when page unloads
  window.addEventListener("beforeunload", flushQueue);
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      flushQueue();
    }
  });
}

export function enqueueEvent(event: TrackEvent) {
  queue.push(event);

  if (queue.length >= (config.batchSize ?? 5)) {
    flushQueue();
  }
}

function flushQueue() {
  if (queue.length === 0) return;

  const events = [...queue];
  queue = [];

  try {
    const payload = JSON.stringify(events);

    // Use sendBeacon if available
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon(config.endpoint, blob);
    } else {
      fetch(config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
        keepalive: true,
      });
    }
  } catch (error) {
    console.error("Tracpy send failed", error);
    queue.unshift(...events);
  }
}
