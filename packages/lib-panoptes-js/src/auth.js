const { importSPKI, jwtVerify } = require('jose')

const { env } = require('./config')
const { productionKey, stagingKey } = require('./publicKeys')

async function verify(token) {
  let data = null
  let error = null
  try {
    const pemKey = env === 'production' ? productionKey : stagingKey
    const publicKey = await importSPKI(pemKey, 'RS512')
    const { payload } = await jwtVerify(token, publicKey)
    data = payload.data
  } catch (e) {
    error = e
  }
  return { data, error }
}

module.exports = {
  verify
}
