# User Settings Page

The User Settings Page lets users edit their account information. Of course, this settings page can only be accessed if the user is logged in to a Zooniverse account.

The User Settings "Page" actually consists of three distinct sub-pages:

- Account Information: lets users change their display name, password, etc.
- Customize Profile: lets users change their avatar and/or profile header images.
- Email: lets users change their account's email address, and change their email subscription preferences. (Not to be confused with the [Unsubscribe Page](../Unsubscribe/).)

Zooniverse URLs:
- Account Information sub-page (also default User Settings page): https://www.zooniverse.org/settings
- Customize Profile sub-page: https://www.zooniverse.org/settings/profile
- Email sub-page: https://www.zooniverse.org/settings/email

## Behaviours

General:

- When a user isn't logged in to a Zooniverse account, these pages _should_ blocked with a "please log in" message. 
  - (In practice, this is enforced by `<AuthenticatedUsersPageContainer>` in app-root, not in this component.)
