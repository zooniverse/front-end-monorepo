const { importSPKI, jwtVerify } = require('jose')

const { env } = require('./config')
const { productionKey, stagingKey } = require('./publicKeys')

async function verify(token) {
  let data = null
  let error = null
  try {
    const pemKey = env === 'production' ? productionKey : stagingKey
    const publicKey = await importSPKI(pemKey, 'RS512')
    const { payload } = await jwtVerify(token.replace('Bearer ', ''), publicKey)
    data = payload.data
  } catch (e) {
    error = e
  }
  return { data, error }
}

async function decodeJWT(token) {
  let user = null
  const { data, error } = await verify(token)
  if (data) {
    user = {
      id: data.id.toString(),
      login: data.login,
      display_name: data.dname,
      admin: data.admin
    }
  }
  return { user, error }
}

module.exports = {
  decodeJWT,
  verify
}
