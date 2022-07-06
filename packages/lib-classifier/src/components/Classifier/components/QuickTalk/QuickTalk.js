import React, { useEffect, useRef } from 'react'
import { withResponsiveContext } from '@zooniverse/react-components'
import { Anchor, Box, Button, Heading, Keyboard, Paragraph } from 'grommet'
import { Chat, Close, FormNextLink } from 'grommet-icons'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import asyncStates from '@zooniverse/async-states'
import { useTranslation } from 'react-i18next'

import Comment from './components/Comment'
import PostForm from './components/PostForm'

const FixedBox = styled(Box)`
  position: fixed;
  bottom: 1em;
  right: 2.5em;
  max-width: 80vw;
  max-height: 80vh;
`

const ButtonContainer = styled(Box)`
  border-radius: 1em;
`

const FixedButtonContainer = styled(Box)`
  border-radius: 1em;
  position: fixed;
  bottom: 1em;
  right: 2.5em;
`

const UnorderedList = styled(Box)`
  margin: 0;
  padding: 0;
`

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
  expand = false,
  fixedPosition = true,
  showBadge = true // HACK: Button.badge crashes tests AND storybook for an undetermined reason. // TODO: debug
}) {
  const panelContent = useRef()
  const { t } = useTranslation('components')
  // TODO: figure out if/how the QuickTalk component should/could be displayed on mobile
  // if (screenSize === 'small') return null

  useEffect(function scrollToLatestComment () {
    if (postCommentStatus === asyncStates.success) {
      // Comments appear at the bottom, so scroll to the bottom
      const newYCoord = panelContent.current?.scrollHeight
      panelContent.current?.scrollTo({
        top: newYCoord,
        left: 0,
        behavior: 'smooth'
      })
    }
  }, [ postCommentStatus ])

  if (!subject) return null

  const [_expand, setExpand] = React.useState(expand)
  const badge = (showBadge && comments.length > 0) ? comments.length : false

  const QTButtonContainer = (fixedPosition) ? FixedButtonContainer : ButtonContainer
  const QTPanel = (fixedPosition) ? FixedBox : Box

  if (!_expand) {
    return (
      <QTButtonContainer
        background={{ dark: 'dark-3', light: 'light-3' }}
        elevation='small'
      >
        <Button
          a11yTitle={t('QuickTalk.aria.openButton', { count: comments.length })}
          onClick={() => setExpand(true)}
          icon={<Chat />}
          badge={badge}
        />
      </QTButtonContainer>
    )
  }

  return (
    <Keyboard onEsc={() => setExpand(false)}>
      <QTPanel
        a11yTitle={t('QuickTalk.aria.mainPanel')}
        elevation='medium'
        role='dialog'
        background={{ dark: 'dark-3', light: 'light-3' }}
      >
        <Box
          direction='row'
          flex={false}
          justify='between'
          pad={{ vertical: 'none', horizontal: 'small'}}
        >
          <Heading level='4' margin={{ top: 'small', bottom: 'none' }} pad='none'>
            {t('QuickTalk.aria.panelHeading')}
          </Heading>
          <Button
            a11yTitle={t('QuickTalk.aria.closeButton')}
            autoFocus={true}
            icon={<Close size='small' />}
            onClick={() => setExpand(false)}
            plain
          />
        </Box>
        <Box
          ref={panelContent}
          aria-label={t('QuickTalk.aria.panelContent')}
          overflow={{ vertical: 'auto', horizontal: 'hidden' }}
          role='group'
          tabIndex='0'
        >
          <Box flex={false} pad={{ bottom: 'small', left: 'small', right: 'small' }}>
            {comments.length > 0 && (
              <UnorderedList as='ul' flex={false}>
                {comments.map(comment => {
                  const author = authors[comment.user_id]
                  const roles = authorRoles[comment.user_id]

                  return (
                    <Comment
                      key={`quicktalk-comment-${comment.id}`}
                      comment={comment}
                      author={author}
                      roles={roles}
                    />
                  )
                })}
              </UnorderedList>
            )}
            {!comments.length && (
              <Box
                background={{ dark: 'dark-1', light: 'light-1' }}
                margin={{ horizontal: 'none', 'vertical': 'xsmall' }}
                pad='xsmall'
              >
                <Paragraph textAlign='center'>
                  {t('QuickTalk.subjectHasNoComments')}
                </Paragraph>
              </Box>
            )}
          </Box>
        </Box>
        <Box
          flex={false}
          pad={{ horizontal: 'small', vertical: 'xsmall' }}
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
            label={t('QuickTalk.aria.goToTalk')}
            href={subject.talkURL}
            icon={<FormNextLink size='small' />}
            margin='xsmall'
            target='_blank'
            rel='nofollow noopener noreferrer'
            reverse={true}
            size='xsmall'
          />
        </Box>
      </QTPanel>
    </Keyboard>
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
  expand: PropTypes.bool,
  fixedPosition: PropTypes.bool,
  showBadge: PropTypes.bool
}

export default withResponsiveContext(QuickTalk)
export { QuickTalk }
