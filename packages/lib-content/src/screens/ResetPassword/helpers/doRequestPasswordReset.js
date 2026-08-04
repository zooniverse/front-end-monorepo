/*
Perform "Request Password Reset" Action

This function asks Panoptes to send a "password my reset" email, for a specified
user account (email address).

How this works:
- Resetting an account's password occurs in four steps.
- Step one, user submits their email address to Panoptes's Request Reset
  Password service (via a form on our website).
- Step two, Panoptes sends the user an email with a "reset password token".
- Step three, user clicks on the link to our website with the token.
- Step four, user submits their new password (alongside the token) to Panoptes
  (via a form on our website).
- This function addresses Step ONE.

Input: 
- `email`: string, a valid email address.

Output:
- Returns 0 on success.
- Returns an Error object if something goes wrong during the API call.
 */

import auth from 'panoptes-client/lib/auth'

export default async function doRequestPasswordReset ({ email }) {
  try {
    await auth.requestPasswordReset({ email })
    return 0
  } catch (error) {
    console.error(error)
    return error
  }
}
