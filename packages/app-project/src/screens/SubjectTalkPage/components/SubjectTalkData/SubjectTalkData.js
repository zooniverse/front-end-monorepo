import { Box } from 'grommet'
import { useTranslation } from 'next-i18next'
import { string } from 'prop-types'

import { useDiscussions } from '@hooks'

import Discussion from './components/Discussion'

function SubjectTalkData({
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

  return (
    <Box
      gap='small'
      style={{ gridArea: 'talkData' }}
    >
      {/* <TalkSearch /> */}
      <input type='text' placeholder={t('Talk.searchPlaceholder')} />
      {/* <TalkData /> */}
      <Box
        background={{
          dark: 'dark-3',
          light: 'white'
        }}
      >
        <h2>{t('Home.ZooniverseTalk.RecentSubjects.subjectLabel', { id: subjectId })}</h2>
        <Box pad='medium'>
          <h3>Tags</h3>
        </Box>
        <Box pad='small'>
          <h3>Discussions</h3>
          {discussions?.map((discussion) => (
            <Discussion
              key={discussion.id}
              discussion={discussion}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

SubjectTalkData.propTypes = {
  projectId: string.isRequired,
  subjectId: string.isRequired
}

export default SubjectTalkData
