const SESSION_TIMEOUT = 30 * 60 * 1000;

interface SessionData {
  id: string;
  lastActivity: number;
}

function generateSessionId(): string {
  return `sess_${crypto.randomUUID()}`;
}

export function getSessionId(): string {
  const stored = localStorage.getItem("tracpy_session");

  if (!stored) {
    const sessionId = generateSessionId();

    const data: SessionData = {
      id: sessionId,
      lastActivity: Date.now(),
    };

    localStorage.setItem("tracpy_session", JSON.stringify(data));

    return sessionId;
  }

  const session: SessionData = JSON.parse(stored);

  if (Date.now() - session.lastActivity > SESSION_TIMEOUT) {
    const newSession = generateSessionId();

    const data: SessionData = {
      id: newSession,
      lastActivity: Date.now(),
    };

    localStorage.setItem("tracpy_session", JSON.stringify(data));

    return newSession;
  }

  session.lastActivity = Date.now();

  localStorage.setItem("tracpy_session", JSON.stringify(session));

  return session.id;
}
