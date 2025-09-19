import { Anchor, Box, Text } from 'grommet'
import { Down, FormNext, Up } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import { number, shape, string } from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'

import addQueryParams from '@helpers/addQueryParams'
import {
  useComments,
  usePanoptesUsers,
  useTalkRoles
} from '@hooks'

import ParticipantsAndComments from '../ParticipantsAndComments'
import PlainButton from '../PlainButton'
import TalkComment from '../TalkComment'

const StyledBox = styled(Box)`
  border-radius: 4px 0 0 0;
  border-left: 4px solid ${props => props.theme.dark ? props.theme.global.colors['accent-1'] : props.theme.global.colors['neutral-1']};
`

const StyledOrderedList = styled(Box)`
  list-style: none;
`

function Discussion({ discussion, login }) {
  const [sort, setSort] = useState('-created_at')

  const { t } = useTranslation('screens')

  const commentsQuery = {
    discussion_id: discussion.id,
    sort,
    page_size: 10,
  }
  
  const {
    data: comments,
    isLoading,
    error
  } = useComments(commentsQuery)

  const userIds = comments?.map(comment => comment.user_id)
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
    section: `zooniverse,${discussion.section}`,
    user_id: userIdsString
  })
  
  const showChronologicalSort = discussion.comments_count > 1
  const sortButtonLabel = sort === 'created_at' ? t('Talk.Discussions.sortedOldestFirst') : t('Talk.Discussions.sortedNewestFirst')

  function handleSortChange() {
    setSort(prevSort => (
      prevSort === 'created_at' ?
        '-created_at'
        : 'created_at'
    ))
  }

  return (
    <Box>
      <Box
        align='center'
        direction='row-responsive'
        justify='between'
      >
        <Box
          align='center'
          direction='row'
          gap='small'
        >
          <StyledBox
            align='center'
            direction='row'
            pad={{ horizontal:'xxsmall' }}
          >
            <Anchor
              href={addQueryParams(`/projects/${discussion.project_slug}/talk/${discussion.board_id}`)}
              label={discussion.board_title}
              size='1rem'
            />
            <FormNext
              color={{ dark: 'accent-1', light: 'neutral-1' }}
              size='16px'
            />
            <Anchor
              href={addQueryParams(`/projects/${discussion.project_slug}/talk/${discussion.board_id}/${discussion.id}`)}
              label={discussion.title}
              size='1rem'
            />
          </StyledBox>
          <ParticipantsAndComments
            commentsCount={discussion.comments_count}
            usersCount={discussion.users_count}
          />
        </Box>
        <Box
          align='center'
          alignSelf='end'
          direction='row'
          gap='xsmall'
        >
          {showChronologicalSort && (
            <Box
              align='center'
              direction='row'
              gap='xxsmall'
            >
              <PlainButton
                margin={{ left: 'xsmall' }}
                onClick={handleSortChange}
                text={sortButtonLabel}
              />
              {sort === 'created_at' ? (
                <Up
                  color={{ dark: 'accent-1', light: 'neutral-1' }}
                  size='12px'
                />
              ) : (
                <Down
                  color={{ dark: 'accent-1', light: 'neutral-1' }}
                  size='12px'
                />
              )}
            </Box>
          )}
        </Box>
      </Box>
      <StyledOrderedList
        forwardedAs='ol'
        margin='none'
        pad='none'
      >
        {comments?.map((comment) => {
          const author = users?.find(user => user.id === comment.user_id)

          const authorRoles = roles?.filter(role => role.user_id === author?.id)
          
          const upvoted = comment?.upvotes && login && Object.keys(comment.upvotes).includes(login)

          return (
            <li key={comment.id}>
              <TalkComment
                avatar={author?.avatar_src}
                comment={comment}
                roles={authorRoles}
                upvoted={upvoted}
              />
            </li>
          )
        })}
      </StyledOrderedList>
      <Text size='1rem'>
        {t('Talk.Discussions.commentsViewing', { count: comments?.length, total: discussion.comments_count })}
      </Text>
    </Box>
  )
}

Discussion.propTypes = {
  discussion: shape({
    id: string,
    comments_count: number,
    section: string,
    title: string,
    users_count: number
  }),
  login: string
}

export default Discussion
