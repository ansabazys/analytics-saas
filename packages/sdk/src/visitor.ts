function generateId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`
}

export function getVisitorId(): string {
  let visitorId = localStorage.getItem("tracpy_visitor_id")

  if (!visitorId) {
    visitorId = generateId("vis")
    localStorage.setItem("tracpy_visitor_id", visitorId)
  }

  return visitorId
}