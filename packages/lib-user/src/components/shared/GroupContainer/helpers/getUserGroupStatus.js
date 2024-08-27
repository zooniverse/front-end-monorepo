import { Loader } from '@zooniverse/react-components'
import { bool, shape, string } from 'prop-types'

export function getUserGroupStatus({
  authUserId = undefined,
  createGroupMembershipError = null,
  createGroupMembershipLoading = false,
  group = null,
  groupError = null,
  groupLoading = false,
  joinToken = null
}) {
  if (joinToken && !authUserId) {
    return ('Log in to join the group.')
  }

  if (createGroupMembershipLoading) {
    return ('Joining group...')
  }

  if (createGroupMembershipError) {
    return ('Join failed.')
  }

  if (groupLoading) {
    return (<Loader />)
  }

  if (groupError) {
    return (`Error: ${groupError.message}.`)
  }

  if (!group && !authUserId) {
    return ('Group not found. You must be logged in to access a private group.')
  }

  if (!group && authUserId) {
    return ('Group not found.')
  }

  return null
}

getUserGroupStatus.propTypes = {
  authUserId: string,
  createGroupMembershipError: shape({
    message: string
  }),
  createGroupMembershipLoading: bool,
  group: shape({
    id: string
  }),
  groupError: shape({
    message: string
  }),
  groupLoading: bool,
  joinToken: string
}
