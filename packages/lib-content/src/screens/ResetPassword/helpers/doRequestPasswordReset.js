/*
Perform "Request Password Reset" Action

This function asks Panoptes to send a "password my reset" email, for a specified
user account (email address).

How this works:
- TODO

Input: 
- `email`: string, a valid email address.

Output:
- Returns null on success.
- Returns an Error object if something goes wrong.
 */

// import auth from 'panoptes-client/lib/auth'

export default async function doRequestPasswordReset ({ email }) {
  try {
    // TODO
    return null
  } catch (error) {
    console.error(error)
    return error
  }
}
