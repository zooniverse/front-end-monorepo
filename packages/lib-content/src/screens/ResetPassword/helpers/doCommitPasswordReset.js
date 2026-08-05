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

export default async function doCommitPasswordReset ({ password, confirmation, token }) {
  try {
    await auth.resetPassword({ password, confirmation, token })
    return 0
  } catch (error) {
    let _error = error
    console.error(_error)

    // For some reason, auth.resetPassword() sometimes throws the entire
    // XMLHttpRequest's Response object instead of an Error object. If this
    // happens, we need to adapt it.

    if (_error.req && error.status >= 400 && error.status <= 599) {
      const errorMessage = _error.body?.errors?.[0]?.message || 'Unknown API error'
      _error = new Error(errorMessage)
    }

    return _error
  }
}
