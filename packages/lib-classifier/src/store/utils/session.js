import hash from 'hash.js'

const storage = window?.sessionStorage

const sessionUtils = {
  generateSessionID () {
    const sha2 = hash.sha256()
    const id = sha2.update(`${Math.random() * 10000}${Date.now()}${Math.random() * 1000}`).digest('hex')
    const stored = { id }
    try {
      storage?.setItem('session_id', JSON.stringify(stored))
    } catch (e) {
      console.error(e)
    }
    return stored
  },

  getSessionID () {
    const stored = (storage?.getItem('session_id')) ? JSON.parse(storage?.getItem('session_id')) : this.generateSessionID()
    const { id } = stored
    return id
  }
}

export default sessionUtils
