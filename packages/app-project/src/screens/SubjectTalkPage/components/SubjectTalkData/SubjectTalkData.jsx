import { Box, Heading } from 'grommet'
import { useTranslation } from 'next-i18next'
import { string } from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'

import { useDiscussions } from '@hooks'

import Discussions from './components/Discussions'
import Mentions from './components/Mentions'
import StartDiscussion from './components/StartDiscussion'
import Tags from './components/Tags'

const StyledBox = styled(Box)`
  max-height: auto;

  @media screen and (max-width: 1280px) {
    max-height: 400px;
  }
`

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

function SubjectTalkData({
  login,
  projectDisplayName,
  projectId,
  subjectId,
  userId
}) {
  const [sort, setSort] = useState('-last_comment_created_at')

  const { t } = useTranslation('screens')

  const query = {
    section: `project-${projectId}`,
    focus_id: subjectId,
    focus_type: 'Subject',
    sort,
  }

  const {
    data: discussions,
    isLoading,
    error
  } = useDiscussions(query)

  function handleSortChange() {
    setSort(prevSort => (
      prevSort === 'last_comment_created_at' ?
        '-last_comment_created_at'
        : 'last_comment_created_at'
    ))
  }

  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      border={{ color: 'light-5', side: 'all', size: '0.5px' }}
      height={{ max: '900px' }}
      round='8px'
    >
      <StyledBox
        overflow={{ vertical: 'auto' }}
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
        <Tags
          projectDisplayName={projectDisplayName}
          projectId={projectId}
          subjectId={subjectId}
          userId={userId}
        />
        <Discussions
          discussions={discussions}
          error={error}
          handleSortChange={handleSortChange}
          loading={isLoading}
          login={login}
          sort={sort}
        />
        <Mentions
          login={login}
          projectId={projectId}
          subjectId={subjectId}
        />
      </StyledBox>
      <StartDiscussion
        discussions={discussions}
        login={login}
        projectId={projectId}
        subjectId={subjectId}
        userId={userId}
      />
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
