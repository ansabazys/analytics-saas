const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

function generateSessionId(): string {
  return `sess_${crypto.randomUUID()}`;
}

export function getSessionId(): string {
  const stored = localStorage.getItem("tracpy_session");

  if (!stored) {
    const sessionId = generateSessionId();
    localStorage.setItem(
      "tracpy_session",
      JSON.stringify({
        id: sessionId,
        lastActivity: Date.now(),
      }),
    );
    return sessionId;
  }

  const session = JSON.parse(stored);

  if (Date.now() - session.lastActivity > SESSION_TIMEOUT) {
    const newSession = generateSessionId();

    localStorage.setItem(
      "tracpy_session",
      JSON.stringify({
        id: newSession,
        lastActivity: Date.now(),
      }),
    );

    return newSession;
  }

  session.lastActivity = Date.now();
  localStorage.setItem("tracpy_session", JSON.stringify(session));

  return session.id;
}
