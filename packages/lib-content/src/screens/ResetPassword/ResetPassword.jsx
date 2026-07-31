'use client'

import { Box } from 'grommet'
import OtherLayout from '@components/PageLayout/OtherLayout'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'
import { bool, string } from 'prop-types'

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
          <h3>Reset Password Page</h3>
          <p>{isLoggedIn ? '1️⃣ User is logged in' : '0️⃣ No user'}</p>
          <p>{!!resetPasswordToken ? `token: ${resetPasswordToken}` : 'no reset password token'}</p>
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
