'use client'

import { Box } from 'grommet'
import OtherLayout from '@components/PageLayout/OtherLayout'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'
import { bool, string } from 'prop-types'

import RequestResetForm from './components/RequestResetForm/RequestResetForm'
import CommitResetForm from './components/CommitResetForm/CommitResetForm'
import NoAccessMessage from './components/NoAccessMessage/NoAccessMessage'

function ResetPassword ({
  isLoggedIn = false,
  resetPasswordToken = '',
}) {
  return (
    <OtherLayout>
      <MaxWidthContent
        className='Reset-Password-Page'
        color={{ light: 'black', dark: 'white' }}
      >
        {isLoggedIn && (
          <NoAccessMessage />
        )}

        {!isLoggedIn && !resetPasswordToken && (
          <RequestResetForm />
        )}

        {!isLoggedIn && resetPasswordToken && (
          <CommitResetForm
            resetPasswordToken={resetPasswordToken}
          />
        )}
      </MaxWidthContent>
    </OtherLayout>
  )
}

ResetPassword.propTypes = {
  isLoggedIn: bool,
  resetPasswordToken: string,
}

export default ResetPassword
