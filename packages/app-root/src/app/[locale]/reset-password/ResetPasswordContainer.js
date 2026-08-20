'use client'

/*
Reset Password Container

We need a wrapper around the `<ResetPassword>` component since we want to know
if the user is logged in. The check for the ?reset_password_token query param is
done in the Next.js's page.js.

 */

import { ResetPassword } from '@zooniverse/content'

import { useContext } from 'react'
import { Box } from 'grommet'
import { Loader } from '@zooniverse/react-components'
import { PanoptesAuthContext } from '../../../contexts'

export default function ResetPasswordContainer ({
  resetPasswordToken = ''
}) {

  // Find out if the user is logged in. We don't need any other details, to be honest.
  const { isLoading, user } = useContext(PanoptesAuthContext)
  const isLoggedIn = !!user?.login

  if (isLoading) return (
    <Box direction='column' align='center' pad='medium'>
      <Loader />
    </Box>
  )

  return (
    <ResetPassword
      isLoggedIn={isLoggedIn}
      resetPasswordToken={resetPasswordToken}
    />
  )
}
