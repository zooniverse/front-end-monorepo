'use client'

/*
  Settings Container

  We need a wrapper around the `<UserSettings>` component since we want to know
  if the user is logged in.
 */

import { UserSettings } from '@zooniverse/content'

import { useContext } from 'react'
import { Box } from 'grommet'
import { Loader } from '@zooniverse/react-components'
import { PanoptesAuthContext } from '@/contexts'

export default function ResetPasswordContainer() {
  // The hook defined in PanoptesAuthContext is the one from LRC.
  // It is a check for which user is authenticated and returns basic info
  // about the user resource from the database. We'll use this basic user
  // resource to fetch MORE info about the authenticated user directly in UserSettings.
  const { isLoading, user } = useContext(PanoptesAuthContext)
  const isLoggedIn = !!user?.login

  return isLoading ? (
    <Box direction='column' align='center' pad='medium'>
      <Loader />
    </Box>
  ) : isLoggedIn ? (
    <UserSettings authUser={user} />
  ) : (
    <p>Please log in.</p>
  )
}
