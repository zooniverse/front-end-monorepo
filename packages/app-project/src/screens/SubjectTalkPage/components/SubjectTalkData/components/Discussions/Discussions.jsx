import { Loader, SpacedText } from '@zooniverse/react-components'
import { Box, Button, Text } from 'grommet'
import { Chat, Down, Up } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import { arrayOf, func, shape, string } from 'prop-types'
import styled from 'styled-components'

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

const StyledOrderedList = styled(Box)`
  list-style: none;
`

const DEFAULT_HANDLER = () => true

function Discussions({
  discussions = [],
  error = undefined,
  handleSortChange = DEFAULT_HANDLER,
  loading = false,
  login = '',
  sort = ''
}) {
  const { t } = useTranslation('screens')

  let discussionsTitle = ''
  if (!discussions || discussions.length === 0) {
    discussionsTitle = t('Talk.Discussions.noDiscussions')
  } else if (discussions.length === 1) {
    discussionsTitle = t('Talk.Discussions.oneDiscussion')
  } else {
    discussionsTitle = t('Talk.Discussions.discussions', { count: discussions.length })
  }

  const totalCommentsCount = discussions?.reduce((total, discussion) => total + discussion.comments_count, 0) || 0
  const totalUsersCount = discussions?.reduce((total, discussion) => total + discussion.users_count, 0) || 0
  const sortButtonLabel = sort === 'last_comment_created_at' ? t('Talk.Discussions.sortedOldestFirst') : t('Talk.Discussions.sortedNewestFirst')

  return (
    <Box
      gap='xsmall'
      flex='grow'
      pad='small'
    >
      <Box
        align='center'
        direction='row-responsive'
        justify='between'
        height={{ min: 'auto' }}
      >
        <Box
          align='center'
          direction='row'
          gap='small'
        >
          <SectionHeading
            icon={
              <Chat
                color={{ dark: 'light-1', light: 'dark-4' }}
                size='1rem'
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
        {discussions?.length > 1 && (
          <Box
            align='center'
            alignSelf='end'
            direction='row'
            gap='xsmall'
          >
            <Text size='1rem'>{t('Talk.Discussions.sortBy')}</Text>
            <StyledButton
              onClick={handleSortChange}
              label={(
                <Box
                  align='center'
                  direction='row'
                  gap='xxsmall'
                >
                  <SpacedText weight={700}>
                    {sortButtonLabel}
                  </SpacedText>
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
      {error ? (
        <Box align='center' justify='center' fill pad='medium'>
          <SpacedText uppercase={false}>
            {t('Talk.somethingWentWrong')}
          </SpacedText>
        </Box>
      ) : loading ? (
        <Box align='center' justify='center' fill pad='medium'>
          <Loader />
        </Box>
      ) : discussions?.length > 0 && (
        <StyledOrderedList
          forwardedAs='ol'
          border='between'
          gap='60px'
          margin='none'
          pad='none'
        >
          {discussions?.map((discussion) => (
            <li key={discussion.id}>
              <Discussion
                discussion={discussion}
                login={login}
              />
            </li>
          ))}
        </StyledOrderedList>
      )}
    </Box>
  )
}

Discussions.propTypes = {
  discussions: arrayOf(shape({
    id: string
  })),
  handleSortChange: func,
  sort: string,
  login: string,
}

export default Discussions
