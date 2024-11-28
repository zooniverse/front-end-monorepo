import hash from 'hash.js'

const storage = window.sessionStorage

const sessionUtils = {
  fiveMinutesFromNow () {
    const d = new Date()
    d.setMinutes(d.getMinutes() + 5)
    return d
  },

  generateSessionID () {
    const sha2 = hash.sha256()
    const id = sha2.update(`${Math.random() * 10000}${Date.now()}${Math.random() * 1000}`).digest('hex')
    return id
  },

  getSessionID () {
    const storedSession = storage.getItem('session_id')
    const stored = storedSession
      ? JSON.parse(storedSession)
      : { id: this.generateSessionID(), ttl: new Date() }
    stored.ttl = new Date(stored.ttl)

    if (stored.ttl < Date.now()) {
      stored.id = this.generateSessionID()
    }
    stored.ttl = this.fiveMinutesFromNow()
    try {
      storage.setItem('session_id', JSON.stringify(stored))
    } catch (e) {
      console.error(e)
    }
    return stored.id
  }
}

export default sessionUtils
