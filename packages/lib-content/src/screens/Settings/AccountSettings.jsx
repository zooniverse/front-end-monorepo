'use client'

import SettingsLayout from '@components/PageLayout/SettingsLayout'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'
import { arrayOf, shape, string } from 'prop-types'

function AccountSettings ({
  user
}) {
  if (!user) return null

  return (
    <SettingsLayout>
      <MaxWidthContent
        className='Account-Settings-Page'
        color={{ light: 'black', dark: 'white' }}
      >
        <h1>Account Settings Placeholder</h1>
        <p>User is {user.login} aka {user.display_name}</p>
      </MaxWidthContent>
    </SettingsLayout>
  )
}

AccountSettings.propTypes = {
  user: shape({
    display_name: string,
    id: string.isRequired,
    login: string,
  })
}

export default AccountSettings
