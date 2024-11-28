import hash from 'hash.js'

const storage = window.sessionStorage || window.localStorage

const sessionUtils = {
  fiveMinutesFromNow () {
    const d = new Date()
    d.setMinutes(d.getMinutes() + 5)
    return d
  },

  generateSessionID () {
    const sha2 = hash.sha256()
    const id = sha2.update(`${Math.random() * 10000}${Date.now()}${Math.random() * 1000}`).digest('hex')
    const ttl = this.fiveMinutesFromNow()
    const stored = { id, ttl }
    try {
      storage.setItem('session_id', JSON.stringify(stored))
    } catch (e) {
      console.error(e)
    }
    return stored
  },

  getSessionID () {
    const stored = (storage.getItem('session_id')) ? JSON.parse(storage.getItem('session_id')) : this.generateSessionID()
    let { id, ttl } = stored
    console.log(stored)

    if (ttl < Date.now()) {
      id = this.generateSessionID()
    } else {
      ttl = this.fiveMinutesFromNow()
    }
    try {
      storage.setItem('session_id', JSON.stringify({ id, ttl }))
    } catch (e) {
      console.error(e)
    }
    return id
  }
}

export default sessionUtils
