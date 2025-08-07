import { Box, Heading, Text } from 'grommet'
import { Chat, Down, Up, User } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import { number, shape, string } from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'

import { useComments } from '@hooks'

import PlainButton from '../PlainButton'

const StyledTitle = styled(Heading)`
  letter-spacing: 0.8px;
`

const StyledUppercaseTitle = styled(Heading)`
  letter-spacing: 0.8px;
  text-transform: uppercase;
`

function Discussion({ discussion }) {
  const [sort, setSort] = useState('-created_at')

  const { t } = useTranslation('screens')

  const query = {
    discussion_id: discussion.id,
    sort,
    page_size: 10,
  }
  
  const {
    data: comments,
    isLoading,
    error
  } = useComments(query)

  const title = discussion.subject_default ? discussion.board_title : discussion.title
  const showChronologicalSort = discussion.comments_count > 1

  function handleSortChange() {
    setSort(prevSort => (
      prevSort === 'created_at' ?
        '-created_at'
        : 'created_at'
    ))
  }

  return (
    <Box
      as='li'
    >
      <Box
        align='center'
        direction='row'
        justify='between'
      >
        {discussion.subject_default ? (
          <StyledUppercaseTitle
            level={5}
            size='1rem'
            weight={500}
          >
            {title}
          </StyledUppercaseTitle>
        ) : (
          <StyledTitle
            color={{ dark: 'accent-1', light: 'neutral-1' }}
            level={5}
            size='1rem'
            weight={600}
          >
            {title}
          </StyledTitle>
        )}
        <Box
          align='center'
          direction='row'
          gap='xxsmall'
        >
          <User
            a11yTitle={t('Talk.participants')}
            color={{ dark: 'accent-1', light: 'neutral-1' }}
            size='12px'
          />
          <Text
            color={{ dark: 'accent-1', light: 'neutral-1' }}
          >
            {discussion.users_count}
          </Text>
          <Chat
            a11yTitle={t('Talk.comments')}
            color={{ dark: 'accent-1', light: 'neutral-1' }}
            size='12px'
          />
          <Text
            color={{ dark: 'accent-1', light: 'neutral-1' }}
          >
            {discussion.comments_count}
          </Text>
          {showChronologicalSort && (
            <>
              <PlainButton
                a11yTitle={sort === 'created_at' ? t('Talk.sortNewFirst') : t('Talk.sortOldFirst')}
                aria-pressed={sort === 'created_at'}
                margin={{ left: 'xsmall' }}
                onClick={handleSortChange}
                text={t('Talk.chronologically')}
              />
              {sort === 'created_at' ? (
                <Up
                  a11yTitle={t('Talk.commentsOldFirst')}
                  color={{ dark: 'accent-1', light: 'neutral-1' }}
                  size='12px'
                />
              ) : (
                <Down
                  a11yTitle={t('Talk.commentsNewFirst')}
                  color={{ dark: 'accent-1', light: 'neutral-1' }}
                  size='12px'
                />
              )}
            </>
          )}
        </Box>
      </Box>
      <Box
        as='ol'
        gap='small'
        style={{ listStyle: 'none', margin: 0, padding: 0 }}
      >
        {comments?.map((comment) => (
          <li key={comment.id}>
            <h5>{comment.id}</h5>
            <span>{comment.created_at}</span>
            <p>{comment.body}</p>
          </li>
        ))}
      </Box>
      <Box
        direction='row-reverse'
        justify='between'
        align='center'
      >
        <PlainButton
          a11yTitle={t('Talk.viewFullDiscussion')}
          text={t('Talk.viewFullDiscussion')}
          href={`/projects/${discussion.project_slug}/talk/${discussion.board_id}/${discussion.id}`}
        />
        <Text size='1rem'>
          {t('Talk.commentsViewing', { count: comments?.length, total: discussion.comments_count })}
        </Text>
      </Box>
    </Box>
  )
}

Discussion.propTypes = {
  discussion: shape({
    id: string,
    comments_count: number,
    title: string,
    users_count: number
  })
}

export default Discussion
