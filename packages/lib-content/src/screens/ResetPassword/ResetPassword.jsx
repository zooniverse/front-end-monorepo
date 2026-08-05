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
      <Box
        align='center'
        className='Reset-Password-Page'
        pad={{ horizontal: 'medium', top: 'large', bottom: 'large' }}
      >
        <MaxWidthContent
          color={{ light: 'black', dark: 'white' }}
        >
          {!resetPasswordToken && !isLoggedIn && (
            <RequestResetForm />
          )}

          {!resetPasswordToken && isLoggedIn && (
            <NoAccessMessage />
          )}

          {resetPasswordToken && (
            <CommitResetForm
              resetPasswordToken={resetPasswordToken}
            />
          )}
        </MaxWidthContent>
      </Box>
    </OtherLayout>
  )
}

ResetPassword.propTypes = {
  isLoggedIn: bool,
  resetPasswordToken: string,
}

export default ResetPassword
