import { string } from 'prop-types'

import {
  useMentions,
  usePanoptesUsers,
  useTalkRoles
} from '@hooks'

import Mentions from './Mentions'

function MentionsContainer({
  login = '',
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

  const { data: mentions } = useMentions(mentionsQuery)

  const userIds = mentions?.map(mention => mention.comment.user_id)
  const uniqueUserIds = [...new Set(userIds)]
  const userIdsString = uniqueUserIds.join(',')

  const { data: users } = usePanoptesUsers(mentions ? { id: userIdsString } : null)

  const { data: roles } = useTalkRoles(mentions ? {
    is_shown: true,
    section: `zooniverse,project-${projectId}`,
    user_id: userIdsString
  } : null)

  if (!mentions || mentions.length === 0) {
    return null
  }
  return (
    <Mentions
      login={login}
      mentions={mentions}
      roles={roles}
      users={users}
    />
  )
}

MentionsContainer.propTypes = {
  login: string,
  projectId: string,
  subjectId: string
}

export default MentionsContainer
