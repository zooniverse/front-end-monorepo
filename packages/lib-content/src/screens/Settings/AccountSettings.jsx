'use client'

import OtherLayout from '@components/PageLayout/OtherLayout'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'
import { arrayOf, shape, string } from 'prop-types'

function AccountSettings ({
  user
}) {
  if (!user) return null

  return (
    <OtherLayout>
      <MaxWidthContent
        className='Unsubscribe-Page'
        color={{ light: 'black', dark: 'white' }}
      >
        <h1>Account Settings Placeholder</h1>
        <p>User is {user.login}</p>
      </MaxWidthContent>
    </OtherLayout>
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
