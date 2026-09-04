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
        className='Unsubscribe-Page'
        color={{ light: 'black', dark: 'white' }}
      >
        <h1>Account Settings Placeholder</h1>
        <p>User is {user.login}</p>
      </MaxWidthContent>
    </SettingsLayout>
  )
}

AccountSettings.propTypes = {
  user: shape({
    // avatar_src: string,
    // display_name: string,
    // id: string.isRequired,
    login: string,
    // roles: arrayOf(string)
  })
}

export default AccountSettings
