import { bool, shape, string } from 'prop-types'

export function getUserGroupStatus({
  authUser = null,
  createGroupMembershipError = null,
  createGroupMembershipLoading = false,
  group = null,
  groupError = null,
  groupLoading = false,
  joinToken = null
}) {
  if (joinToken && !authUser) {
    return ('Log in to join the group.')
  }

  if (createGroupMembershipLoading) {
    return ('Joining group...')
  }

  if (createGroupMembershipError) {
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
