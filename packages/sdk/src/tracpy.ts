import { sendEvent } from "./tracker"
import { getVisitorId } from "./visitor"
import { getSessionId } from "./session"
import type { TrackEvent } from "./types"

export class Tracpy {
  private siteId: string

  constructor(siteId: string) {
    this.siteId = siteId
  }

  track(event: string, data?: Record<string, unknown>) {
    const payload: TrackEvent = {
      siteId: this.siteId,
      visitorId: getVisitorId(),
      sessionId: getSessionId(),
      event,
      url: window.location.href,
      timestamp: Date.now(),
      data
    }

    sendEvent(payload)
  }
}