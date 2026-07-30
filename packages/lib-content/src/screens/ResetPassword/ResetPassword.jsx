'use client'

import { Box } from 'grommet'
import OtherLayout from '@components/PageLayout/OtherLayout'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'
import { string } from 'prop-types'

function ResetPassword ({
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
          <span>{!!resetPasswordToken ? `token: ${resetPasswordToken}` : 'no reset password token'}</span>
        </MaxWidthContent>
      </Box>
    </OtherLayout>
  )
}

ResetPassword.propTypes = {
  resetPasswordToken: string
}

export default ResetPassword
