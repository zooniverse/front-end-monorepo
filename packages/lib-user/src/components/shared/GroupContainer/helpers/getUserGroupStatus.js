import asyncStates from '@zooniverse/async-states'
import { bool, shape, string } from 'prop-types'

export function getUserGroupStatus({
  authUser = null,
  group = null,
  groupError = null,
  groupLoading = false,
  joinStatus = null,
  joinToken = null
}) {
  if (joinToken && !authUser) {
    return ('Log in to join the group.')
  }

  if (joinStatus === asyncStates.posting) {
    return ('Joining group...')
  }

  if (joinStatus === asyncStates.error) {
    return ('Join failed.')
  }

  if (groupLoading) {
    return ('Loading...')
  }

  if (groupError) {
    return (`Error: ${groupError.message}.`)
  }

  if (!group && !authUser) {
    return ('Group not found. You must be logged in to access a private group.')
  }

  if (!group && authUser) {
    return ('Group not found.')
  }

  return null
}

getUserGroupStatus.propTypes = {
  authUser: shape({
    id: string,
    login: string
  }),
  group: shape({
    id: string
  }),
  groupError: shape({
    message: string
  }),
  groupLoading: bool,
  joinStatus: string,
  joinToken: string
}
