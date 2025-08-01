import { Box } from 'grommet'
import { Chat } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import { string } from 'prop-types'

import { useDiscussions } from '@hooks'

import Discussion from '../Discussion'
import PlainButton from '../PlainButton'
import SectionHeading from '../SectionHeading'

function Discussions({
  projectId,
  subjectId
}) {
  const { t } = useTranslation('screens')

  const query = {
    section: `project-${projectId}`,
    focus_id: subjectId,
    focus_type: 'Subject',
    sort: '-created_at',
  }

  const {
    data: discussions,
    isLoading,
    error
  } = useDiscussions(query)

  let discussionsTitle = ''
  if (!discussions || discussions.length === 0) {
    discussionsTitle = t('Talk.noDiscussions')
  } else if (discussions.length === 1) {
    discussionsTitle = t('Talk.oneDiscussion')
  } else {
    discussionsTitle = t('Talk.discussions', { count: discussions.length })
  }

  return (
    <Box
      pad='small'
    >
      <Box
        align='center'
        direction='row'
        justify='between'
      >
        <SectionHeading
          icon={
            <Chat
              color={{ dark: 'light-1', light: 'dark-4' }}
              size='16px'
            />
          }
          title={discussionsTitle}
        />
        {!discussions?.length && (
          <PlainButton
            icon={
              <Chat
                color={{ dark: 'accent-1', light: 'neutral-1' }}
                size='16px'
              />
            }
            text={t('Talk.startDiscussion')}
          />
        )}
      </Box>
      {discussions?.map((discussion) => (
        <Discussion
          key={discussion.id}
          discussion={discussion}
        />
      ))}
    </Box>
  )
}

Discussions.propTypes = {
  projectId: string.isRequired,
  subjectId: string.isRequired
}

export default Discussions
