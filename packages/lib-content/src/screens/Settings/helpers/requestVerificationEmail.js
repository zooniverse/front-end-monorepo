/*
requestVerificationEmail() asks Panoptes to send a verification email to the
user's registered email address.

Input:
- `email`: user's email address.

Output: 
- `true` on successful request.

Potentially throws:
- API errors from Panoptes.
 */

import { config } from '@zooniverse/panoptes-js'

export default async function requestVerificationEmail (email) {

  try {
    // Unfortunately, we can't use panoptes.post('/users/confirmation'), since
    // we need to hit www.zooniverse.org/users/confirmation instead of
    // www.zooniverse.org/api/users/confirmation.

    const hostWithoutApi = config.host.replace(/\/api$/, '')
    const url = `${hostWithoutApi}/users/confirmation`

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'charset': 'utf-8',
      },
      body: `user%5Bemail%5D=${encodeURIComponent(email)}`
    })

    if (response?.status === 200) {
      return true
    } else {
      throw new Error('Unknown error')
    }
    
  } catch (error) {
    console.error(error)
    throw error
  }
}