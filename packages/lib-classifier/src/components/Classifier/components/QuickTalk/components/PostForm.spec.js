import React from 'react'
import { render, screen } from '@testing-library/react'
import sinon from 'sinon'
import userEvent from '@testing-library/user-event'

import PostForm from './PostForm'
import asyncStates from '@zooniverse/async-states'

describe('Component > QuickTalk > PostForm', function () {
  const postCommentSpy = sinon.spy()

  describe('when initialized', function () {
    beforeEach(function () {
      render(
        <PostForm
          postComment={postCommentSpy}
          postCommentStatus={asyncStates.initialized}
          postCommentStatusMessage={undefined}
        />
      )
    })

    afterEach(function () {
      postCommentSpy.resetHistory()
    })

    it('should render without crashing', function () {
      expect(screen.getByRole('textbox', { name: 'Write comments' })).to.exist()
      expect(screen.getByRole('button', { name: 'Post comment' })).to.exist()
    })

    it('should have a "ready to post" status message', function () {
      expect(screen.getByRole('status')).to.have.text('QuickTalk.status.initialized')
    })

    it('should call post comments when the "Post" button is clicked', async function () {
      const user = userEvent.setup({ delay: null })
      await user.click(screen.getByRole('button', { name: 'Post comment' }))
      expect(postCommentSpy).to.have.been.calledOnce()
    })
  })

  describe('when posting a comment', function () {
    it('should have a "posting comment" status message', function () {
      render(
        <PostForm
          postComment={undefined}
          postCommentStatus={asyncStates.loading}
          postCommentStatusMessage={undefined}
        />
      )

      expect(screen.getByRole('status')).to.have.text('QuickTalk.status.loading')
    })
  })

  describe('after successfully posting a comment', function () {
    it('should have a "posting successful" status message', function () {
      render(
        <PostForm
          postComment={undefined}
          postCommentStatus={asyncStates.success}
          postCommentStatusMessage={undefined}
        />
      )

      expect(screen.getByRole('status')).to.have.text('QuickTalk.status.success')
    })
  })

  describe('after failing to post a comment', function () {
    it('should have an error message', function () {
      render(
        <PostForm
          postComment={undefined}
          postCommentStatus={asyncStates.error}
          postCommentStatusMessage={'Oh no something went wrong'}
        />
      )

      expect(screen.getByRole('status')).to.have.text('Oh no something went wrong')
    })
  })
})
