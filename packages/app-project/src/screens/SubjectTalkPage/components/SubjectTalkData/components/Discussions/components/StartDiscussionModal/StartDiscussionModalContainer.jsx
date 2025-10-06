import { useTranslation } from 'next-i18next'
import { string } from 'prop-types'

import { fetchDiscussions } from '@helpers'

import { useBoards } from '@hooks'

import StartDiscussionModal from './StartDiscussionModal'

function StartDiscussionModalContainer({
  active = false,
  discussions = [],
  onClose,
  projectId,
  showCommentMessage = false,
  subjectId,
  userId
}) {
  const { t } = useTranslation('screens')

  const boardsQuery = {
    page_size: 50,
    section: `project-${projectId}`,
  }

  const {
    data: boards,
    isLoading: boardsLoading,
    error: boardsError
  } = useBoards(active ?boardsQuery : null)

  function handleCreateComment(commentData) {
    console.log('create comment', commentData)
  }

  function handleCreateDiscussion(discussionData) {
    console.log('create discussion', discussionData)
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
    // TODO: if successful, then reroute to newly created comment
  }

  return (
    <>
      {active && (
        <StartDiscussionModal
          active={active}
          boards={boards}
          onSubmit={handleSubmit}
          onClose={onClose}
          showCommentMessage={showCommentMessage}
          subjectId={subjectId}
        />
      )}
    </>
  )
}

// StartDiscussionModalContainer.propTypes = {}

export default StartDiscussionModalContainer
