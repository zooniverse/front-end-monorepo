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

  if (!mentions || mentions.length === 0) {
    return null
  }

  const userIds = mentions?.map(mention => mention.comment.user_id)
  const uniqueUserIds = [...new Set(userIds)]
  const userIdsString = uniqueUserIds.join(',')

  const {
    data: users,
    isLoading: usersLoading,
    error: usersError
  } = usePanoptesUsers({ id: userIdsString })

  const {
    data: roles,
    isLoading: rolesLoading,
    error: rolesError
  } = useTalkRoles({
    is_shown: true,
    section: `zooniverse,project-${projectId}`,
    user_id: userIdsString
  })

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
