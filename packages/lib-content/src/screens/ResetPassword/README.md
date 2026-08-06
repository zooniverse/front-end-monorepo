# Reset Password Page

The Reset Password Page is where users go to when they want to reset their passwords. Note that there are _three distinct modes/super-states_ that this page can exist in; see Behaviours below.

Zooniverse URL: https://www.zooniverse.org/reset-password

Behaviours:

- There are three distinct modes/super-states this page can exist in.
- **Mode 1: No Access**
  - If user is logged in, they're blocked with the message _"You are currently logged in. Please log out if you would like to reset your password."_
- **Mode 2: Request Reset**
  - Entry point: user clicks "Forgot Password" on a Login Form, and is directed to this Reset Password Page. (Or they access the URL directly.)
  - If a user accesses the page URL _with no reset password token,_ (i.e. just https://www.zooniverse.org/reset-password), they will be shown a form that asks for their email address.
  - The form will perform basic HTML checks for email validity.
  - When the user submits a valid email address, the form transitions from an initial "ready" state to the following states:
    - "busy" state: request is being sent to Panoptes. "Loader" (busy indicator) is shown. Form is disabled.
    - "success" state: request has successfully been processed. Success message is show. Form should remain disabled?
    - "error" state: request has failed (API error). Error message is shown. Form is re-enabled.
- **Mode 3: Commit Reset**
  - Entry point: user receives a password reset email, and clicks on the link in that email. They're taken to this Reset Password Page _with a token._
  - If a user accesses the page URL _with a reset password token,_ (e.g. https://www.zooniverse.org/reset-password?reset_password_token=1234567890), they will be a shown a form that asks for their new password + password confirmation.
  - The form will perform custom checks to see if their new password + password confirmation match; and if the new password meets minimum password standards. (See Dev Notes)
  - When the user submits a valid password, the form transitions from an initial "ready" state to the following states:
    - "busy" state: request is being sent to Panoptes. "Loader" (busy indicator) is shown. Form is disabled.
    - "success" state: request has successfully been processed. Success message is show. Form remains disabled.
    - "error" state: request has failed (API error). Error message is shown. Form is re-enabled.
  - 🚧 TODO: after a successful reset, user should be redirected to a sign in page.

Security:

- We do NOT confirm whether or not an email exists in our database.
- Rate limiting is performed on the Panoptes API side. Attempting to request too many resets in a short period of time should trigger an API error.

### Dev Notes

**Regarding the "No Access if you're logged in" rule**

Future devs: for your own sanity, keep this logic. If you want to allow users to apply password reset while they're still logged in, you'll need to manage transition states between logged in/logged out (especially since successfully resetting the password should prompt the user to login with the new password), and manage what happens when the logged-in user is different from the user being reset.

Previously, in PFE, the "No Access if you're logged in" rule _only_ applied if the user doesn't have an unsubscribe token, which caused havoc to the UX if there was already a logged-in user. 😬

**Minimum Password Standards**

Password requires a minimum length of 8 characters. ...that's it.

This is based on previous PFE logic, and what Panoptes accepts.
