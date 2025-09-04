import { Box, Button, Text } from 'grommet'
import { Add, Chat, Down, Up } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import { string } from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'

import { useDiscussions } from '@hooks'

import Discussion from '../Discussion'
import ParticipantsAndComments from '../ParticipantsAndComments'
import SectionHeading from '../SectionHeading'

const StyledButton = styled(Button)`
  background: ${props => props.theme.global.colors['accent-1']};
  border: none;
  border-radius: 32px;
  box-shadow: none;
  color: ${props => props.theme.global.colors['neutral-1']};
`

const StyledLabel = styled(Text)`
  letter-spacing: 0.8px;
  text-transform: uppercase;
`

const StyledBox = styled(Box)`
  &::before,
  &::after {
    content: "";
    flex: 1 1 auto;
    height: 1px;
    background: ${props => props.theme.dark ? props.theme.global.colors['accent-1'] : props.theme.global.colors['neutral-1']};
  }
`
const StyledDiscussionButton = styled(Button)`
  &:focus,
  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    cursor: not-allowed;
    text-decoration: none;
  }
`

function Discussions({
  login,
  projectId,
  subjectId
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

  let discussionsTitle = ''
  if (!discussions || discussions.length === 0) {
    discussionsTitle = t('Talk.noDiscussions')
  } else if (discussions.length === 1) {
    discussionsTitle = t('Talk.oneDiscussion')
  } else {
    discussionsTitle = t('Talk.discussions', { count: discussions.length })
  }

  const totalCommentsCount = discussions?.reduce((total, discussion) => total + discussion.comments_count, 0) || 0
  const totalUsersCount = discussions?.reduce((total, discussion) => total + discussion.users_count, 0) || 0
  const sortButtonLabel = sort === 'last_comment_created_at' ? t('Talk.sortedOldestFirst') : t('Talk.sortedNewestFirst')

  function handleSortChange() {
    setSort(prevSort => (
      prevSort === 'last_comment_created_at' ?
        '-last_comment_created_at'
        : 'last_comment_created_at'
    ))
  }

  return (
    <Box
      gap='small'
      pad='small'
    >
      <Box
        align='center'
        direction='row'
        justify='between'
      >
        <Box
          align='center'
          direction='row'
          gap='xsmall'
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
          {discussions?.length > 0 && (
            <ParticipantsAndComments
              commentsCount={totalCommentsCount}
              usersCount={totalUsersCount}
            />
          )}
        </Box>
        {discussions?.length > 0 && (
          <Box
            align='center'
            direction='row'
            gap='xsmall'
          >
            <Text size='1rem'>{t('Talk.sortBy')}</Text>
            <StyledButton
              onClick={handleSortChange}
              label={(
                <Box
                  align='center'
                  direction='row'
                  gap='xxsmall'
                >
                  <StyledLabel weight={700}>
                    {sortButtonLabel}
                  </StyledLabel>
                  {sort === 'last_comment_created_at' ? (
                    <Up
                      color='neutral-1'
                      size='14px'
                    />
                  ) : (
                    <Down
                      color='neutral-1'
                      size='14px'
                    />
                  )}
                </Box>
              )}
              pad={{ horizontal: 'small', vertical: 'xsmall' }}
            />
          </Box>
        )}
      </Box>
      {discussions?.length > 0 && (
        <Box
          as='ol'
          border='between'
          gap='60px'
          style={{ listStyle: 'none', margin: 0, padding: 0 }}
        >
          {discussions?.map((discussion) => (
            <li key={discussion.id}>
              <Discussion
                discussion={discussion}
                login={login}
              />
            </li>
          ))}
        </Box>
      )}
      <StyledBox
        align='center'
        direction='row'
      >
        <StyledDiscussionButton
          label={(
            <Box
              align='center'
              direction='row'
              gap='xsmall'
              justify='center'
            >
              <Chat
                color={{ dark: 'accent-1', light: 'neutral-1' }}
                size='18px'
              />
              <StyledLabel
                color={{ dark: 'accent-1', light: 'neutral-1' }}
                size='18px'
                weight={600}
              >
                {t('Talk.startDiscussion')}
              </StyledLabel>
              <Add
                color={{ dark: 'accent-1', light: 'neutral-1' }}
                size='18px'
              />
            </Box>
          )}
          margin={{ horizontal: 'xsmall' }}
          onClick={() => {
            window.alert('Coming soon!')
          }}
          plain
        />
      </StyledBox>
    </Box>
  )
}

Discussions.propTypes = {
  login: string,
  projectId: string.isRequired,
  subjectId: string.isRequired
}

export default Discussions
