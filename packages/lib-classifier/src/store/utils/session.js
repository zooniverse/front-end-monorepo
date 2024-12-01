import hash from 'hash.js'

const storage = window.sessionStorage

function storedSession() {
  const storedSession = storage.getItem('session_id')
  if (storedSession) {
    const session = JSON.parse(storedSession)
    session.ttl = new Date(session.ttl)
    return session
  }
  return null
}

function newSession() {
  return {
    id: generateSessionID(),
    ttl: fiveMinutesFromNow()
  }
}

export function fiveMinutesFromNow() {
  const d = new Date()
  d.setMinutes(d.getMinutes() + 5)
  return d
}

export function generateSessionID() {
  const sha2 = hash.sha256()
  const id = sha2.update(`${Math.random() * 10000}${Date.now()}${Math.random() * 1000}`).digest('hex')
  return id
}

export function getSessionID() {
  const stored = storedSession() || newSession()

  if (stored.ttl < Date.now()) {
    stored.id = generateSessionID()
  }
  stored.ttl = fiveMinutesFromNow()
  try {
    storage.setItem('session_id', JSON.stringify(stored))
  } catch (e) {
    console.error(e)
  }
  return stored.id
}
