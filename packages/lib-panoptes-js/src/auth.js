import { importSPKI, jwtVerify } from 'jose'

import { env } from './config.js'
import { productionKey, stagingKey } from './publicKeys.js'

export async function verify(token) {
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

export async function decodeJWT(token) {
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
