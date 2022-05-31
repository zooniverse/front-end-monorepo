import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import asyncStates from '@zooniverse/async-states'
import { withTranslation } from 'react-i18next'

import { withStores } from '@helpers'
import { getBearerToken } from '@store/utils'
import QuickTalk from './QuickTalk'
import talkClient from 'panoptes-client/lib/talk-client'

import getTalkComments from './helpers/getTalkComments'
import getTalkRoles from './helpers/getTalkRoles'
import getUsersByID from './helpers/getUsersByID'

function storeMapper (store) {
  /*
  Quick Fix: use authClient to check User resource within the QuickTalk component itself
  - Long-term, app-project should be responsible for managing the User resource.
  - see https://github.com/zooniverse/front-end-monorepo/discussions/2362
   */
  const {
    authClient,
    projects: {
      active: project
    },
    subjects: {
      active: subject
    }
  } = store
  /*
  Experimental Check
  - As of Aug 2021, this component is experimental.
  - Only show this component when explicitly enabled.
   */
  const enabled = project?.experimental_tools.includes('quicktalk')

  return {
    authClient,
    enabled,
    subject,
  }
}

function QuickTalkContainer ({
  authClient,
  enabled = false,
  subject,
  t = () => '',  // Translations
}) {

  const [comments, setComments] = useState([])
  const [authors, setAuthors] = useState({})
  const [authorRoles, setAuthorRoles] = useState({})
  const [postCommentStatus, setPostCommentStatus] = useState(asyncStates.initialized)
  const [postCommentStatusMessage, setPostCommentStatusMessage] = useState('')
  const [userId, setUserId] = useState('')

  function onMount () {
    fetchComments()
    checkUser()
    return () => {}
  }

  useEffect(onMount, [subject])

  /*
  Quick Fix: use authClient to check User resource within the QuickTalk component itself
  - see https://github.com/zooniverse/front-end-monorepo/discussions/2362
   */
  async function checkUser () {
    if (!authClient) return

    const user = await authClient.checkCurrent()
    const authorization = await getBearerToken(authClient)  // Check bearer token to ensure session hasn't timed out
    setUserId((authorization && user) ? user.id : undefined)
  }

  async function fetchComments () {
    resetComments()

    const project = subject?.project
    if (!subject || !project) return

    const section = 'project-' + project.id
    const query = {
      section: section,
      focus_id: subject.id,
      focus_type: 'Subject',
      page: 1,
      sort: 'created_at',  // PFE used '-created_at' to sort in reverse order, and I have no idea why.
    }

    const allComments = await getTalkComments(subject, project)
    setComments(allComments)

    let author_ids = []
    let authors = {}
    let authorRoles = {}

    author_ids = allComments.map(comment => comment.user_id)
    author_ids = author_ids.filter((id, i) => author_ids.indexOf(id) === i)

    const allUsers = await getUsersByID(author_ids)
    allUsers.forEach(user => authors[user.id] = user)
    setAuthors(authors)

    const allRoles = await getTalkRoles(author_ids, section)
    allRoles.forEach(role => {
      if (!authorRoles[role.user_id]) authorRoles[role.user_id] = []
      authorRoles[role.user_id].push(role)
    })
    setAuthorRoles(authorRoles)
  }

  function resetComments () {
    setComments([])
    setAuthors({})
    setAuthorRoles({})
  }

  async function postComment (text) {
    const project = subject?.project
    if (!subject || !project || !authClient) return

    const section = `project-${project.id}`
    const discussionTitle = `Subject ${subject.id}`

    setPostCommentStatus(asyncStates.loading)
    setPostCommentStatusMessage('')

    try {
      if (!text || text.trim().length === 0) throw new Error(t('QuickTalk.errors.noText'))

      /*
      Quick Fix: check user before posting
      - this is because we can never be 100% sure when a user has logged out on lib-classifier
      - long-term, we want to pass down the User resource from app-project
      - see https://github.com/zooniverse/front-end-monorepo/discussions/2362
       */

      const user = await authClient.checkCurrent()
      const authorization = await getBearerToken(authClient)  // Check bearer token to ensure session hasn't timed out
      if (!authorization || !user) throw new Error(t('QuickTalk.errors.noUser'))

      // First, get default board
      const boards = await talkClient.type('boards').get({ section, subject_default: true })
      const defaultBoard = boards && boards[0]
      if (!defaultBoard) throw new Error(t('QuickTalk.errors.noBoard'))

      // Next, attempt to find if the Subject already has a discussion attached to it.
      const discussions = await talkClient.type('discussions').get({
        board_id: defaultBoard.id,
        title: discussionTitle,
        subject_default: true,
      })
      const existingDiscussion = discussions && discussions[0]

      if (existingDiscussion) { // Add to the existing discussion

        const comment = {
          user_id: user.id,
          body: text,
          discussion_id: +existingDiscussion.id,
        }

        await talkClient.type('comments').create(comment).save()

        setPostCommentStatus(asyncStates.success)
        setPostCommentStatusMessage('')
        fetchComments()

      } else {  // Create a new discussion

        const comments = [{
          user_id: user.id,
          body: text,
          focus_id: +subject.id,
          focus_type: 'Subject',
        }]

        const discussion = {
          title: discussionTitle,
          user_id: user.id,
          subject_default: true,
          board_id: defaultBoard.id,
          comments: comments,
        }

        await talkClient.type('discussions').create(discussion).save()

        setPostCommentStatus(asyncStates.success)
        setPostCommentStatusMessage('')
        fetchComments()
      }

    } catch (err) {
      console.error(err)
      setPostCommentStatus(asyncStates.error)
      setPostCommentStatusMessage(err?.message || err)
    }
  }

  if (!enabled || !subject) return null

  return (
    <QuickTalk
      subject={subject}
      comments={comments}
      authors={authors}
      authorRoles={authorRoles}
      postCommentStatus={postCommentStatus}
      postCommentStatusMessage={postCommentStatusMessage}
      postComment={postComment}
      userId={userId}
    />
  )
}

QuickTalkContainer.propTypes = {
  authClient: PropTypes.object, // Quick Fix
  enabled: PropTypes.bool,
  subject: PropTypes.object,
}

QuickTalkContainer.defaultProps = {
  authClient: undefined,
  enabled: false,
  subject: undefined,
}

const TranslatedQuickTalkContainer = withTranslation('components')(QuickTalkContainer)
export default withStores(TranslatedQuickTalkContainer, storeMapper)
export { QuickTalkContainer }
