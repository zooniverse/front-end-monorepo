'use client'

import { Box } from 'grommet'
import OtherLayout from '@components/PageLayout/OtherLayout'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'
import { bool, string } from 'prop-types'

import RequestResetForm from './components/RequestResetForm/RequestResetForm'

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
            <p>TODO: Block access</p>
          )}

          {resetPasswordToken && (
            <p>TODO: CommitResetForm</p>
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
