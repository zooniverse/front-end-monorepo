import React from 'react'
import { withResponsiveContext } from '@zooniverse/react-components'
import { Anchor, Box, Button, Keyboard, Paragraph } from 'grommet'
import { Chat, Close } from 'grommet-icons'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import asyncStates from '@zooniverse/async-states'
import { useTranslation } from 'react-i18next'

import Comment from './components/Comment'
import PostForm from './components/PostForm'

const FixedBox = styled(Box)`
  position: fixed;
  bottom: 1em;
  right: 1em;
  max-width: 80vw;
  max-height: 80vh;
`

const FixedButton = styled(Button)`
  position: fixed;
  bottom: 1em;
  right: 1em;
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
  const { t } = useTranslation('components')
  // TODO: figure out if/how the QuickTalk component should/could be displayed on mobile
  // if (screenSize === 'small') return null

  if (!subject) return null

  const [_expand, setExpand] = React.useState(expand)
  const badge = (showBadge && comments.length > 0) ? comments.length : false

  const QTButton = (fixedPosition) ? FixedButton : Button
  const QTPanel = (fixedPosition) ? FixedBox : Box

  if (!_expand) {
    return (
      <QTButton
        a11yTitle={t('QuickTalk.aria.openButton', { count: comments.length })}
        onClick={() => setExpand(true)}
        icon={<Chat />}
        badge={badge}
      />
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
          pad='small'
        >
          <Anchor
            a11yTitle={t('QuickTalk.aria.goToTalk')}
            label={t('QuickTalk.headerLink')}
            href={subject.talkURL}
            target='_blank'
            icon={<Chat />}
          />
          <Button
            a11yTitle={t('QuickTalk.aria.closeButton')}
            autoFocus={true}
            icon={<Close size='small' />}
            onClick={() => setExpand(false)}
            plain
          />
        </Box>
        <Box overflow='auto'>
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
          </Box>
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
