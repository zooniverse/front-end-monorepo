import CacheService from '../shared/CacheService'

const ttl = 60 * 60 * 1 // cache for 1 hour
const cache = new CacheService(ttl)

export default cache
