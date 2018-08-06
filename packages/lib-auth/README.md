# @zooniverse/auth

## OAuth (Implicit Grant)

Use this for custom projects, and anything else not running on the zooniverse.org domain.

### How to Use

```
import { createOAuthClient } from '@zooniverse/auth'

const auth = createOAuthClient({
  clientId: '1234567890', // Your client ID from Doorkeeper
  env: 'staging', // Can be `staging` or `production`. You can also specify `authorizationUri` instead if you prefer
  redirectUri: 'http://foobar.com/oauth' // The URI you want the user redirected to on completion
})

// Start the login process
auth.startLogin()

// Complete the login process after being redirected back
auth.completeLogin()

// Get the current token details
auth.getToken()

// Logout (will trash token details, but won't logout on Doorkeeper)
auth.logout()

// Unmount the React app and trash all details. You probably won't need this, but it's included for completeness.
auth.destroy()
```

## Links

### Doorkeeper (register new OAuth clients)

- [Staging](https://panoptes-staging.zooniverse.org/oauth/applications)
- [Production](https://panoptes.zooniverse.org/oauth/applications)
