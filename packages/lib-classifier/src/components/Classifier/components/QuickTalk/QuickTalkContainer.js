import React, { useState } from 'react'
import { observer } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'
import { useTranslation } from '@translations/i18n'
import useSWR from 'swr'

import { withFeatureFlag } from '@helpers'
import { usePanoptesAuth, usePanoptesUser, useStores } from '@hooks'
import QuickTalk from './QuickTalk'

import getDefaultTalkBoard from './helpers/getDefaultTalkBoard'
import getTalkComments from './helpers/getTalkComments'
import getTalkDiscussion from './helpers/getTalkDiscussion'
import getTalkRoles from './helpers/getTalkRoles'
import getUsersByID from './helpers/getUsersByID'
import postTalkComment from './helpers/postTalkComment'
import postTalkDiscussion from './helpers/postTalkDiscussion'

function storeMapper(store) {
  const {
    subjects: {
      active: subject
    }
  } = store

  return {
    subject
  }
}

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

function QuickTalkContainer () {

  const { t } = useTranslation()
  const { subject } = useStores(storeMapper)
  const user = usePanoptesUser()
  const userId = user?.id
  const authorization = usePanoptesAuth(userId)
  const { data: comments } = useSWR([subject, subject?.project], getTalkComments, SWROptions)

  let author_ids = comments?.map(comment => comment.user_id)
  author_ids = author_ids?.filter((id, i) => author_ids.indexOf(id) === i)  // Remove duplicates

  const authors = {}
  const authorRoles = {}
  const { data: allUsers } = useSWR([author_ids], getUsersByID, SWROptions)
  allUsers?.forEach(user => {
    authors[user.id] = user
    authorRoles[user.id] = []
  })

  const { data: allRoles } = useSWR([author_ids, subject?.project], getTalkRoles, SWROptions)
  allRoles?.forEach(role => {
    authorRoles[role.user_id]?.push(role)
  })

  const [postCommentStatus, setPostCommentStatus] = useState(asyncStates.initialized)
  const [postCommentStatusMessage, setPostCommentStatusMessage] = useState('')

  if (!subject) return null

  async function postComment(text) {
    const project = subject?.project
    if (!subject || !project) return

    setPostCommentStatus(asyncStates.loading)
    setPostCommentStatusMessage('')

    try {
      if (!text || text.trim().length === 0) throw new Error(t('QuickTalk.errors.noText'))

      if (!authorization) throw new Error(t('QuickTalk.errors.noUser'))

      // First, get default board
      const defaultBoard = await getDefaultTalkBoard(project)
      if (!defaultBoard) throw new Error(t('QuickTalk.errors.noBoard'))

      // Next, attempt to find if the Subject already has a discussion attached to it.
      const discussionTitle = `Subject ${subject.id}`
      const existingDiscussion = await getTalkDiscussion(defaultBoard, discussionTitle)

      if (existingDiscussion) { // Add to the existing discussion

        const newComment = await postTalkComment(text, existingDiscussion, user, authorization)
        if (!newComment) throw new Error(t('QuickTalk.errors.failPostComment'))
        comments.push(newComment)

        setPostCommentStatus(asyncStates.success)
        setPostCommentStatusMessage('')

      } else {  // Create a new discussion

        const discussion = await postTalkDiscussion(text, discussionTitle, subject, defaultBoard, user, authorization)
        if (!discussion) throw new Error(t('QuickTalk.errors.failPostDiscussion'))
        comments.push(discussion.latest_comment)

        setPostCommentStatus(asyncStates.success)
        setPostCommentStatusMessage('')
      }

    } catch (err) {
      console.error(err)
      setPostCommentStatus(asyncStates.error)
      setPostCommentStatusMessage(err?.message || err)
    }
  }

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

export default withFeatureFlag(observer(QuickTalkContainer), 'quicktalk')
export { QuickTalkContainer }
