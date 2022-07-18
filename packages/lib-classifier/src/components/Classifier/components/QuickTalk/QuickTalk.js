import React, { useEffect, useRef } from 'react'
import { withResponsiveContext, Tab } from '@zooniverse/react-components'
import { Anchor, Box, Button, Heading, Paragraph } from 'grommet'
import { FormNextLink, ShareRounded } from 'grommet-icons'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import asyncStates from '@zooniverse/async-states'
import { useTranslation } from 'react-i18next'

import Comment from './components/Comment'
import PostForm from './components/PostForm'

const COMMENTS_PER_PAGE = 10

function QuickTalk ({
  subject,
  comments = [],
  authors = {},
  authorRoles = {},
  postCommentStatus = asyncStates.initialized,
  postCommentStatusMessage = '',
  postComment = () => {},
  userId,
  screenSize,
  fixedPosition = true,
}) {
  const latestComment = useRef()
  const { t } = useTranslation('components')
  // TODO: figure out if/how the QuickTalk component should/could be displayed on mobile
  // if (screenSize === 'small') return null

  useEffect(function scrollToLatestComment () {
    if (postCommentStatus === asyncStates.success) {
      console.log('+++ TODO: scroll latest comment to view')
    }
  }, [ postCommentStatus ])

  if (!subject) return null

  return (
    <Tab
      title={t('QuickTalk.tabTitle')}
    >
      <Box
        a11yTitle={t('QuickTalk.aria.mainPanel')}
        fill
      >
        <Heading level='4' margin='none' pad='none'>
          {t('QuickTalk.aria.panelHeading')}
        </Heading>
        <Button
          onClick={()=>{
            latestComment.current?.scrollIntoView?.({behavior: 'smooth' })
          }}
          label="SCROLL TO LATEST COMMENT"
        />
        <Box flex={false} pad='none'>
          {comments.length > 0 && (
            <Box as='ul' flex={false} pad='none' margin='none'>
              {comments.map((comment, index) => {
                const author = authors[comment.user_id]
                const roles = authorRoles[comment.user_id]

                return (
                  <Comment
                    ref={(index === comments.length - 1) ? latestComment : undefined}
                    key={`quicktalk-comment-${comment.id}`}
                    comment={comment}
                    author={author}
                    roles={roles}
                  />
                )
              })}
            </Box>
          )}
          {comments.length >= COMMENTS_PER_PAGE && (
            <Paragraph textAlign='center'>
              {t('QuickTalk.subjectHasMoreComments', { commentsPerPage: COMMENTS_PER_PAGE })}
            </Paragraph>
          )}
          {!comments.length && (
            <Box
              margin={{ horizontal: 'none', 'vertical': 'xsmall' }}
              pad='xsmall'
            >
              <Paragraph textAlign='center'>
                {t('QuickTalk.subjectHasNoComments')}
              </Paragraph>
            </Box>
          )}
        </Box>
        <Box
          flex={false}
          pad='none'
        >
          {userId && (
            <PostForm
              postComment={postComment}
              postCommentStatus={postCommentStatus}
              postCommentStatusMessage={postCommentStatusMessage}
            />
          )}
          {!userId && (
            <Box
              background={{ dark: 'dark-1', light: 'light-1' }}
              margin={{ horizontal: 'none', 'vertical': 'xsmall' }}
              pad='xsmall'
            >
              <Paragraph textAlign='center'>
                {t('QuickTalk.loginToPost')}
              </Paragraph>
            </Box>
          )}
          <Anchor
            alignSelf='center'
            label={t('QuickTalk.goToTalk')}
            href={subject.talkURL}
            icon={<ShareRounded size='small' />}
            margin='xsmall'
            target='_blank'
            rel='nofollow noopener noreferrer'
            reverse={true}
            size='xsmall'
          />
        </Box>
      </Box>
    </Tab>
  )
}

QuickTalk.propTypes = {
  subject: PropTypes.object,
  comments: PropTypes.arrayOf(PropTypes.object),
  authors: PropTypes.object,
  authorRoles: PropTypes.object,
  postCommentStatus: PropTypes.string,
  postCommentStatusMessage: PropTypes.string,
  postComment: PropTypes.func,
  userId: PropTypes.string,
  fixedPosition: PropTypes.bool,
}

export default withResponsiveContext(QuickTalk)
export { QuickTalk }
