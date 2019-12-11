import NodeCache from 'node-cache'

class CacheService {
  constructor (ttlSeconds) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false
    })
  }

  get (key, storeFunction) {
    const value = this.cache.get(key)
    if (value) {
      return Promise.resolve(value)
    }

    return storeFunction()
      .then(result => {
        this.cache.set(key, result)
        return result
      })
  }
}


export default CacheService
