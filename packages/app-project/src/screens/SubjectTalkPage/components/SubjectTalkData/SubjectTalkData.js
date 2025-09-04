import { Box, Heading } from 'grommet'
import { BlockQuote, Tag } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import { string } from 'prop-types'
import styled from 'styled-components'

import Discussions from './components/Discussions'
import SectionHeading from './components/SectionHeading'
import Tags from './components/Tags'

const StyledHeading = styled(Heading)`
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 1.2px;
`

function SubjectTalkData({
  login,
  projectId,
  subjectId,
  userId
}) {
  const { t } = useTranslation('screens')

  return (
    <Box
      gap='small'
      style={{ gridArea: 'talkData' }}
    >
      {/* <TalkSearch /> */}
      <input type='text' placeholder={t('Talk.searchPlaceholder')} />
      <Box
        background={{
          dark: 'dark-3',
          light: 'neutral-6'
        }}
        border={[
          { color: 'light-5', side: 'all', size: '0.5px' },
          { color: 'light-5', side: 'between', size: '0.5px' }
        ]}
        gap='0.5px'
        round='8px'
      >
        <Box
          align='start'
          pad='small'
          round={{ corner: 'top', size: '8px' }}
        >
          <StyledHeading
            color={{ dark: 'light-1', light: 'dark-4' }}
            level={2}
          >
            {t('Home.ZooniverseTalk.RecentSubjects.subjectLabel', { id: subjectId })}
          </StyledHeading>
        </Box>
        <Tags
          projectId={projectId}
          subjectId={subjectId}
          userId={userId}
        />
        <Discussions
          login={login}
          projectId={projectId}
          subjectId={subjectId}
        />
        {/* <Box
          pad='small'
        >
          <SectionHeading
            icon={
              <BlockQuote
                color={{ dark: 'light-1', light: 'dark-4' }}
                size='16px'
              />
            }
            title='Mentions'
          />
        </Box> */}
      </Box>
    </Box>
  )
}

SubjectTalkData.propTypes = {
  login: string,
  projectId: string.isRequired,
  subjectId: string.isRequired
}

export default SubjectTalkData
