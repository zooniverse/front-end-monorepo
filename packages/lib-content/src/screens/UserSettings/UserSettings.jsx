'use client'

import { Box } from 'grommet'

import FormWithTextField from './components/FormWithTextField'
import FormWithCheckbox from './components/FormWithCheckbox'

function Settings({ authUser, login }) {
  // The page in app-root handled the check for if someone is authenticated and
  // got the basic information about who it is. However, we need to fetch more
  // info about this user in order to display all the details of their user
  // settings in this UI.

  return (
    <Box gap='large' margin='xlarge'>
      <FormWithTextField authUser={authUser} />
      <FormWithCheckbox authUser={authUser} />
    </Box>
  )
}

export default Settings
