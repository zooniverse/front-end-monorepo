# Reset Password Page

The Reset Password Page is where users go to when they want to reset their passwords. Note that there are _two distinct modes/super-states_ that this page can exist in; see Behaviours below.

Zooniverse URL: https://www.zooniverse.org/reset-password

Behaviours:

- There are two distinct modes/super-states this page can exist in.
- **Mode 1: Request Reset**
  - Entry point: user clicks "Forgot Password" on a Login Form, and is directed to this Reset Password Page. (Or they access the URL directly.)
  - If a user accesses the page URL _with no unsubscribe token,_ (i.e. just https://www.zooniverse.org/reset-password), they will be shown a form that asks for their email address.
  - ...UNLESS that user is already logged in, in which case they're blocked with the message _"You are currently logged in. Please log out if you would like to reset your password."_
  - The form will perform basic HTML checks for email validity.
  - When the user submits a valid email address, the form transitions from an initial "ready" state to the following states:
    - "busy" state: request is being sent to Panoptes. "Loader" (busy indicator) is shown. Form is disabled.
    - "success" state: request has successfully been processed. Success message is show. Form should remain disabled?
    - "error" state: request has failed (API error). Error message is shown. Form is re-enabled.
- **Mode 3: Commit Reset**
  - Entry point: user receives a password reset email, and clicks on the link in that email. They're taken to this Reset Password Page _with a token._
  - If a user accesses the page URL _with an unsubscribe token,_ (e.g. https://www.zooniverse.org/reset-password?reset_password_token=1234567890), they will be a shown a form that asks for their new password + password confirmation.
  - The form will perform custom checks to see if their new password + password confirmation match; and if the new password meets minimum password standards.
    - ❓ DEV QUESTION: TODO: what's the minimum password standard?
  - When the user submits a valid password, the form transitions from an initial "ready" state to the following states:
    - "busy" state: request is being sent to Panoptes. "Loader" (busy indicator) is shown. Form is disabled.
    - "success" state: request has successfully been processed. Success message is show. Form remains disabled.
    - "error" state: request has failed (API error). Error message is shown. Form is re-enabled.

Security:

- We do NOT confirm whether or not an email exists in our database.
- Rate limiting is performed on the Panoptes API side, I think? (❗️ TODO: confirm) Attempting to request too many resets in a short period of time should trigger an API error.

DEV TODO

- Document minimum password standards.
- Confirm that Panoptes API performs rate limiting