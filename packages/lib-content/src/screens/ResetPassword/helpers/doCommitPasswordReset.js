/*
Perform "Commit Password Reset" Action

This function tells Panoptes to reset the password of an account.

How this works:
- Resetting an account's password occurs in four steps.
- Step one, user submits their email address to Panoptes's Request Reset
  Password service (via a form on our website).
- Step two, Panoptes sends the user an email with a "reset password token".
- Step three, user clicks on the link to our website with the token.
- Step four, user submits their new password (alongside the token) to Panoptes
  (via a form on our website).
- This function addresses Step FOUR.

Input: 
- `password`: string, a new password.
- `confirmation`: string, the new password again.
- `token`: password_reset_token provided by the Reset Password Email sent by
  Panoptes. This identifies an account, and confirms the legitimacy of the
  request.

Output:
- Returns 0 on success.
- Returns an Error object if something goes wrong during the API call.
 */

import auth from 'panoptes-client/lib/auth'

export default async function doRequestPasswordReset ({ password, confirmation, token }) {
  try {
    await auth.requestPasswordReset({ password, confirmation, token })
    return 0
  } catch (error) {
    console.error(error)
    return error
  }
}
