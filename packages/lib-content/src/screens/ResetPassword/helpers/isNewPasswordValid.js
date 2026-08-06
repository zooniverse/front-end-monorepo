/*
Is New Password Valid?

Input: 
- `password`: string, a new password.
- `confirmation`: string, the new password again.
- `t`: the translation function from i18n.

Output:
- Returns 0 on success.
- Returns an Error object if something goes wrong.
 */

export default function isNewPasswordValid (password, confirmation, t) {
  // If you see this message, a dev didn't code something correctly.
  if (!t) { throw new Error('Missing translation function.') }

  // Minimum length is checked via <input pattern=".{8,}" />

  // Users shouldn't see this message since the browser should check for minimum length, and prevent a form submit.
  if (!password || !confirmation) { return new Error(t('ResetPassword.CommitResetForm.status.errorInvalidInput')) }

  // This is the most likely message a user would see.
  if (!(password === confirmation)) { return new Error(t('ResetPassword.CommitResetForm.status.errorPasswordsDoNotMatch')) }

  return 0
}
