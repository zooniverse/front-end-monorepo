# User Settings Page

The User Settings Page lets users edit their account information. Of course, this settings page can only be accessed if the user is logged in to a Zooniverse account.

The User Settings "Page" actually consists of three distinct sub-pages:

- Account Settings: lets users change their display name, password, etc.
- Customize Profile: lets users change their avatar and/or profile header images.
- Email: lets users change their account's email address, and change their email subscription preferences. (Not to be confused with the [Unsubscribe Page](../Unsubscribe/).)

Zooniverse URLs:
- Account Settings sub-page (also default User Settings page): https://www.zooniverse.org/settings
- Customize Profile sub-page: https://www.zooniverse.org/settings/profile
- Email sub-page: https://www.zooniverse.org/settings/email

## Behaviours

General:

- When a user isn't logged in to a Zooniverse account, these pages _should_ blocked with a "please log in" message. 
  - (In practice, this is enforced by `<AuthenticatedUsersPageContainer>` in app-root, not in this component.)
- When logged in, the User Settings page will show details of the logged in user. (Of course.)

Account Setting pages, "Account Name" form:

- The "Account Name" form displays, and allows users to edit, their Display Name and their Credited Name.
  - There are two text input fields: Display Name (for `user.display_name`), and Credited Name (for `user.credited_name`).
  - There is a Save/Submit button (which might be labelled "Change"), that's only visible when there are unsaved changes.
  - There is a status message component, that's only visible when there's a success message, or error message. 
  - There is a loader component, that's only visible when loading data (in practice, only seen when data is revalidating) and when saving data.
- Clicking on Save/Submit will send a PUT request to Panoptes, put the form into a "busy" state.
  - All input fields and submit buttons are disabled when loading/saving data.
  - On success, a success message will appear, and the Save/Submit button will disappear.
  - On error, an error message will appear.
  - Data validation is primarily performed on the Panoptes API side, with relevant error messages returned from the API.
- Notable input rules:
  - Display name cannot be empty. (Returns an error message from API.)
  - Strangely, the display name can have spaces before and after.
  - Display name and credited name can include Unicode characters.
  - e.g. `"    "` and `""` are invalid, but `"    zootester 1 (例子 😜)   "` is legit.

🛠️ TODO: Account Settings page, "Change Password" form":

- The "Change Password" form allows users to edit their password.
  - There are three password input fields: Current Password, New Password, Confirm Password.
  - There is a Save/Submit button (which is labelled "Change")
- Clicking on Save/Submit will send a PUT request to Panoptes, put the form into a "busy" state.
  - All input fields and submit buttons are disabled when loading/saving data.
  - On success, a success message will appear, and the Save/Submit button will disappear.
    - ⚠️ NOTE: successfully changing the password will change the logged-in state of the user. (Underlying auth cookies are changed.)
    - 🛠️ TODO: should user be prompted to login again? Or should user be automatically re-logged in with the new password?
  - On error, an error message will appear.
- Notable input rules:
  - New Password and Confirm Password must match. (This must be enforced BEFORE submitting to API.)
  - Current Password and New Password can't be blank.
  - New Password requires a minimum of 8 characters.

Accounts Settings page, misc:

- ⚠️ Note that this page does NOT display the user's login/username, i.e. `user.login`. 🤷 We may want to revise this in the future, maybe, perhaps.
