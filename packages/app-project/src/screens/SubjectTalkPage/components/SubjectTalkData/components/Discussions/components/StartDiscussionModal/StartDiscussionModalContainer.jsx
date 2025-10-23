import { arrayOf, bool, func, shape, string } from 'prop-types'
import { useState } from 'react'

import {
  addQueryParams,
  createComment,
  createDiscussion,
  fetchDiscussions
} from '@helpers'

import { useBoards } from '@hooks'

import StartDiscussionModal from './StartDiscussionModal'

function StartDiscussionModalContainer({
  active = false,
  discussions = [],
  onClose,
  projectId = '',
  showCommentMessage = false,
  subjectId = '',
  userId = ''
}) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const boardsQuery = {
    page_size: 50,
    section: `project-${projectId}`,
  }

  const {
    data: boards,
    isLoading: boardsLoading,
    error: boardsError
  } = useBoards(active ? boardsQuery : null)
  // sort boards to have subject default board first
  const sortedBoards = boards?.sort((a, b) => {
    if (a.subject_default && !b.subject_default) return -1
    if (!a.subject_default && b.subject_default) return 1
    return 0
  })

  function handleRouting(url) {
    window.location.href = url
  }

  async function handleCreateComment(commentData) {
    setLoading(true)
    setError(null)
    try {
      const newComment = await createComment(commentData)
      // addQueryParams helper does not support a url that includes a query param like ?comment=, so not used here
      const url = `/projects/${newComment.project_slug}/talk/${newComment.board_id}/${newComment.discussion_id}?comment=${newComment.id}`
      handleRouting(url)
    } catch (error) {
      console.error(error)
      setError(error)
      setLoading(false)
    }
  }

  async function handleCreateDiscussion(discussionData) {
    setLoading(true)
    setError(null)
    try {
      const newDiscussion = await createDiscussion(discussionData)
      const url = addQueryParams(`/projects/${newDiscussion.project_slug}/talk/${newDiscussion.board_id}/${newDiscussion.id}`)
      handleRouting(url)
    } catch (error) {
      console.error(error)
      setError(error)
      setLoading(false)
    }
  }

  async function handleSubmit(formData) {
    // edit formData for Talk API create discussion submission
    const data = {
      board_id: formData.discussion_board,
      comments: [{
        body: formData.discussion_comment,
        focus_id: subjectId,
        focus_type: 'Subject',
        user_id: userId
      }],
      subject_default: formData.subject_default,
      title: formData.discussion_title,
      user_id: userId
    }

    // if the data is NOT for the subject default board, create a new discussion
    if (!data.subject_default) {
      handleCreateDiscussion(data)
    } else {
      // if the data is for the subject default board, 
      // and there is an existing subject default discussion in the current list, 
      // add a comment to that discussion
      const subjectDefaultDiscussion = discussions?.find(discussion => discussion.subject_default)
      if (subjectDefaultDiscussion) {
        const commentData = {
          body: formData.discussion_comment,
          discussion_id: subjectDefaultDiscussion.id,
          user_id: userId
        }
        handleCreateComment(commentData)
      } else {
        // if there is no existing subject default discussion in the current list, 
        // request the subject default discussion from the Talk API
        const [requestedSubjectDefaultDiscussion] = await fetchDiscussions({ query: {
            section: `project-${projectId}`,
            focus_id: subjectId,
            focus_type: 'Subject',
            subject_default: true
          }
        })
        // if the subject default discussion is returned, 
        // add a comment to that discussion
        if (requestedSubjectDefaultDiscussion) {
          const commentData = {
            body: formData.discussion_comment,
            discussion_id: requestedSubjectDefaultDiscussion.id,
            user_id: userId
          }
          handleCreateComment(commentData)
        } else {
          // if the subject default discussion is not found, 
          // create a new subject default discussion
          handleCreateDiscussion(data)
        }
      }
    }
  }

  return (
    <>
      {active && (
        <StartDiscussionModal
          active={active}
          boards={sortedBoards}
          error={error || boardsError}
          loading={loading || boardsLoading}
          onSubmit={handleSubmit}
          onClose={onClose}
          showCommentMessage={showCommentMessage}
          subjectId={subjectId}
        />
      )}
    </>
  )
}

StartDiscussionModalContainer.propTypes = {
  active: bool,
  discussions: arrayOf(shape({
    id: string,
    subject_default: bool
  })),
  onClose: func.isRequired,
  projectId: string,
  showCommentMessage: bool,
  subjectId: string,
  userId: string
}

export default StartDiscussionModalContainer
