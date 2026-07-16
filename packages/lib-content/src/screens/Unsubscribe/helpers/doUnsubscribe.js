/*
Perform "Unsubscribe Email" Action

This function asks Panoptes to unsubscribe an email address from all Zooniverse
newletters.

How this works:
- We send a POST to https://www.zooniverse.org/unsubscribe with the following:
  - Header: Content-Type: application/json, Accept: application/json
  - Body: { email: "example@zooniverse.org" }
- The POST responds with an empty 200 on success, which is *almost always the
  case.* (There's no error for invalid nor non-existent email addresses.)
- See https://zooniverse.github.io/panoptes/#unsubscribe-a-user-from-all-emails

As of the Jul 2026, we're using the existing Panoptes JavaScript Client, which
conveniently has its own unsubscribeEmail function, but for some reason supplies
an (unnecessary?) `authenticity_token` alongside the `email` address. 🤷

Input: 
- `email`: string, a valid email address.

Output:
- true on success, false on error.
 */

import auth from 'panoptes-client/lib/auth'

export default async function doUnsubscribe ({ email }) {
  try {
    await auth.unsubscribeEmail({ email })
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}
