import {
  useMentions,
  usePanoptesUsers,
  useTalkRoles
} from '@hooks'

import Mentions from './Mentions'

function MentionsContainer({
  projectId,
  subjectId
}) {
  const mentionsQuery = {
    section: `project-${projectId}`,
    mentionable_id: subjectId,
    mentionable_type: 'Subject',
    sort: '-created_at',
    include: 'comment',
  }

  const { data: mentions, isLoading, error } = useMentions(mentionsQuery)

  const userIds = mentions?.map(mention => mention.comment.user_id)
  const uniqueUserIds = [...new Set(userIds)]
  const userIdsString = uniqueUserIds.join(',')

  const {
    data: users,
    isLoading: usersLoading,
    error: usersError
  } = usePanoptesUsers(mentions ? { id: userIdsString } : null)

  const {
    data: roles,
    isLoading: rolesLoading,
    error: rolesError
  } = useTalkRoles(mentions ? {
    is_shown: true,
    section: `zooniverse,project-${projectId}`,
    user_id: userIdsString
  } : null)

  if (!mentions || mentions.length === 0) {
    return null
  }
  return (
    <Mentions
      error={error}
      isLoading={isLoading}
      mentions={mentions}
      roles={roles}
      users={users}
    />
  )
}

export default MentionsContainer
