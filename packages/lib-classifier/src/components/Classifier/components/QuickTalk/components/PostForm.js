/*
TODO:
- [ ] form should only appear if user is logged in
 */


import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, TextArea } from 'grommet'
import { Markdownz, MarkdownEditor } from '@zooniverse/react-components'

function stopEvent (e) {
  if (!e) return false
  e.preventDefault && e.preventDefault()
  e.stopPropagation && e.stopPropagation()
  e.returnValue = false
  e.cancelBubble = true
  return false
}

function PostForm ({
  postComment,
  postCommentStatus,
}) {
  const [text, setText] = React.useState('')
  
  React.useEffect(() => {
    setText('')
  }, [postCommentStatus])
  
  function onSubmit (e) {
    postComment(text)
    return stopEvent(e)
  }
  
  return (
    <Box>
      <form onSubmit={onSubmit}>
        <TextArea
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <Button
          onClick={onSubmit}
          type='submit'
        >
          Submit
        </Button>
      </form>
    </Box>
  )
}

PostForm.propTypes = {
  postComment: PropTypes.func,
}

export default PostForm



/*
<form className="talk-comment-form" onSubmit={@onSubmitComment}>
  <Suggester {...@props} input={@state.content} onSelect={@onInputChange}>
    <MarkdownEditor previewing={@state.loading} placeholder={@props.placeholder} project={@props.project} className="full" value={@state.content} onChange={@onInputChange} onHelp={-> alert <MarkdownHelp talk={true} title={<h1>Guide to commenting in Talk</h1>}/> }/>
  </Suggester>
  <section>
    <button
      type="button"
      className="talk-comment-image-select-button #{if @state.showing is 'image-selector' then 'active' else ''}"
      onClick={@onImageSelectClick}>
      Linked Image
      {if @state.showing is 'image-selector' then <span>&nbsp;<i className="fa fa-close" /></span>}
    </button>

  <SingleSubmitButton type="submit" onClick={@onSubmitComment} className='talk-comment-submit-button'>{@props.submit}</SingleSubmitButton>
    {if @props.onCancelClick
      <button
        type="button"
        className="button talk-comment-submit-button"
        onClick={@props.onCancelClick}>
       Cancel
      </button>}
  </section>

  {feedback}

  <div className="submit-error">
    {validationErrors}
    {@state.error ? null}
  </div>
</form>
 */

/*
  commentValidations: (commentBody) ->
    commentErrors = getErrors(commentBody, commentValidations)
    @setState {commentValidationErrors}
    !!commentErrors.length

  onSubmitComment: (e, commentText, subject) ->
    e.preventDefault()
    {name, owner} = @props.params

    # get project
    apiClient.type('projects').get({slug: owner + '/' + name})
      .then ([project]) =>
        section = projectSection(project)

        # check for a default board
        talkClient.type('boards').get({section, subject_default: true}).index(0)
          .then (board) =>
            if board?
              discussionTitle = defaultDiscussionTitle(@props.subject)

              talkClient.type('discussions').get(board_id: board.id, title: discussionTitle, subject_default: true).index(0)
                .then (discussion) =>
                  if discussion?
                    user_id = @props.user?.id
                    body = commentText
                    discussion_id = +discussion.id

                    comment = merge {}, {user_id, discussion_id, body}

                    talkClient.type('comments').create(comment).save()
                      .then (comment) =>
                        @context.router.push "/projects/#{owner}/#{name}/talk/#{discussion.board_id}/#{discussion.id}?comment=#{comment.id}"
                  else
                    focus_id = +@props.subject?.id
                    focus_type = 'Subject' if !!focus_id
                    user_id = @props.user?.id
                    body = commentText

                    comments = [merge({}, {user_id, body}, ({focus_id, focus_type} if !!focus_id))]

                    discussion = {
                      title: "Subject #{@props.subject.id}"
                      user_id: @props.user?.id
                      subject_default: true,
                      board_id: board.id
                      comments: comments
                      }
                    talkClient.type('discussions').create(discussion).save()
                      .then (discussion) =>
                        @context.router.push "/projects/#{owner}/#{name}/talk/#{discussion.board_id}/#{discussion.id}"

            else
              throw new Error("A board for subject comments has not been setup for this project yet.")


  render: ->
    <div className="quick-subject-comment-form talk-module">
      <h1>Leave a note about this subject</h1>
      <CommentBox
        project={@props.project}
        user={@props.user}
        header={null}
        validationCheck={@commentErrors}
        validationErrors={@state.commentValidationErrors}
        submitFeedback={"Comment successfully added"}
        placeholder={"Add a note about this subject, or mark with a #hashtag"}
        onSubmitComment={@onSubmitComment}
        subject={@props.subject}
        submit="Add Your comment"
        logSubmit={true}/>
    </div>
 */