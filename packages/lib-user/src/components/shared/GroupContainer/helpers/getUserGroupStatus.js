import { Loader } from '@zooniverse/react-components'
import { bool, shape, string } from 'prop-types'

const DEFAULT_HANDLER = (key) => key

export function getUserGroupStatus({
  authUserId = undefined,
  createGroupMembershipError = null,
  createGroupMembershipLoading = false,
  group = null,
  groupError = null,
  groupLoading = false,
  joinToken = null,
  t = DEFAULT_HANDLER
}) {
  if (joinToken && !authUserId) {
    return t('GroupContainer.loginToJoin')
  }

  if (createGroupMembershipLoading) {
    return t('GroupContainer.joining')
  }

  if (createGroupMembershipError) {
    return t('GroupContainer.joinFail')
  }

  if (groupLoading) {
    return (<Loader />)
  }

  if (groupError) {
    return groupError.message
  }

  if (!group && !authUserId) {
    return t('GroupContainer.noAuth')
  }

  if (!group && authUserId) {
    return t('GroupContainer.notFound')
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
