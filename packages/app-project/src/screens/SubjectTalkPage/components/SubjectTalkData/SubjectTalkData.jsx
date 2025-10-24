import { Box, Heading } from 'grommet'
import { useTranslation } from 'next-i18next'
import { string } from 'prop-types'
import styled from 'styled-components'

import Discussions from './components/Discussions'
import Mentions from './components/Mentions'
import Tags from './components/Tags'

const StyledHeading = styled(Heading)`
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 1.2px;
  margin: 0;
`

const StyledHeadingBox = styled(Box)`
  display: flex;

  @media screen and (max-width: 1280px) {
    display: none;
  }
`

const StyledBox = styled(Box)`
  display: grid;
  grid-template-rows: auto;
  grid-auto-rows: minmax(0fr, 1fr);
  min-height: 0;
`

function SubjectTalkData({
  login,
  projectDisplayName,
  projectId,
  subjectId,
  userId
}) {
  const { t } = useTranslation('screens')

  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      border={{ color: 'light-5', side: 'all', size: '0.5px' }}
      gap='0.5px'
      round='8px'
    >
      <StyledHeadingBox
        align='start'
        border={{ color: 'light-5', side: 'bottom', size: '0.5px' }}
        flex={false}
        justify='center'
        pad='small'
      >
        <StyledHeading
          color={{ dark: 'light-1', light: 'dark-4' }}
          level={2}
        >
          {t('Home.ZooniverseTalk.RecentSubjects.subjectLabel', { id: subjectId })}
        </StyledHeading>
      </StyledHeadingBox>
      <StyledBox>
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
        <Mentions
          projectId={projectId}
          subjectId={subjectId}
        />
      </StyledBox>
    </Box>
  )
}

SubjectTalkData.propTypes = {
  login: string,
  projectDisplayName: string,
  projectSlug: string,
  projectId: string.isRequired,
  subjectId: string.isRequired,
  userId: string
}

export default SubjectTalkData
