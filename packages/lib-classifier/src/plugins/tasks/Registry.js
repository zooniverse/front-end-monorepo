class Registry {
  constructor () {
    this.register = {}
  }

  get (key) {
    return this.register[key] || {}
  }

  add (key, value) {
    if (this.register[key]) {
      throw new Error(`Registry error: key ${key} is already registered.`)
    }
    this.register[key] = value
  }

  remove (key) {
    delete this.register[key]
  }

  values (propKey) {
    if (propKey) {
      return Object.values(this.register).map(value => value[propKey])
    }
    return Object.values(this.register)
  }
}

export default Registry
