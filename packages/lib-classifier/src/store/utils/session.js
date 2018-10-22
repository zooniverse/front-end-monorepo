import hash from 'hash.js'

const storage = window.sessionStorage || window.localStorage

function fiveMinutesFromNow() {
  const d = new Date()
  d.setMinutes(d.getMinutes() + 5)
  return d
}

export function generateSessionID () {
  const sha2 = hash.sha256()
  const id = sha2.update(`${Math.random() * 10000 }${Date.now()}${Math.random() * 1000}`).digest('hex')
  const ttl = fiveMinutesFromNow()
  const stored = { id, ttl }
  try {
    storage.setItem('session_id', JSON.stringify(stored))
  } catch (e) {
    console.error(e)
  }
  return stored
}

export function getSessionID () {
  const stored = storage.getItem('session_id') || generateSessionID()
  let { id, ttl } = JSON.parse(stored)

  if (ttl < Date.now()) {
    id = generateSessionID()
  } else {
    ttl = fiveMinutesFromNow()
  }
  try {
    storage.setItem('session_id', JSON.stringify({ id, ttl }))
  } catch (e) {
    console.error(e)
  }
  return id
}
