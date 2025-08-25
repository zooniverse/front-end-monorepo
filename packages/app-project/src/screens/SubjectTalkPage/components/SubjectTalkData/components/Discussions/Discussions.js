import { Box, Heading } from 'grommet'
import { Chat } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import { string } from 'prop-types'
import styled from 'styled-components'

import { useDiscussions } from '@hooks'

import Discussion from '../Discussion'
import PlainButton from '../PlainButton'
import SectionHeading from '../SectionHeading'

export const StyledUppercaseTitle = styled(Heading)`
  letter-spacing: 0.8px;
  text-transform: uppercase;
`

function Discussions({
  login,
  projectId,
  subjectId
}) {
  const { t } = useTranslation('screens')

  const query = {
    section: `project-${projectId}`,
    focus_id: subjectId,
    focus_type: 'Subject',
    sort: '-last_comment_created_at',
  }

  const {
    data: discussions,
    isLoading,
    error
  } = useDiscussions(query)

  const sortedBoardIds = discussions?.map(discussion => discussion.board_id)
  const uniqueSortedBoardIds = [...new Set(sortedBoardIds)]
  const groupedDiscussions = uniqueSortedBoardIds.map(boardId => (
    discussions.filter(discussion => discussion.board_id === boardId)
  ))

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
      <Box
        as='ol'
        border='between'
        gap='60px'
        style={{ listStyle: 'none', margin: 0, padding: 0 }}
      >
        {groupedDiscussions?.map((discussions) => {
          const boardId = discussions[0].board_id
          const boardTitle = discussions[0].board_title
          
          return (
            <Box
              key={boardId}
              as='li'
            >
              {discussions[0].subject_default ? null : (
                <StyledUppercaseTitle
                  level={4}
                  size='1rem'
                  weight={500}
                >
                  {boardTitle}
                </StyledUppercaseTitle>
              )}
              <Box
                as='ol'
                border='between'
                gap='60px'
                style={{ listStyle: 'none', margin: 0, padding: 0 }}
              >
                {discussions.map((discussion) => (
                  <Discussion
                    key={discussion.id}
                    discussion={discussion}
                    login={login}
                  />
                ))}
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

Discussions.propTypes = {
  login: string,
  projectId: string.isRequired,
  subjectId: string.isRequired
}

export default Discussions
