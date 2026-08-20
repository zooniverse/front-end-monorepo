/*
Is New Password Valid?
Honestly, this just checks if two strings match and aren't empty. Other "is new
password valid?" checks are performed elsewhere, e.g. Minimum length is checked
via <input pattern=".{8,}" />

Input: 
- `password`: string, a new password.
- `confirmation`: string, the new password again.

Output:
- Returns true on success, false on error.
 */

export default function isNewPasswordValid (password, confirmation) {
  if (!password || !confirmation) return false
  return (password === confirmation)
}
