import { expect } from 'chai'
import React from 'react'
import { render, screen } from '@testing-library/react'
import asyncStates from '@zooniverse/async-states'

import SingleTextViewerContainer from './SingleTextViewerContainer'

describe('Component > SingleTextViewerContainer', function () {
  it('should render without crashing', function () {
    render(
      <SingleTextViewerContainer />
    )
    expect(screen).to.be.ok()
  })

  describe('with content loading state of error', function () {
    it('should not render the text subject content', function () {
      const mockError = new Error('Error loading subject')

      render(
        <SingleTextViewerContainer
          content='test subject content'
          contentLoadingState={asyncStates.error}
          error={mockError}
        />
      )

      expect(screen.queryByText('test subject content')).to.be.null()
    })
  })

  describe('with content loading state of success', function () {
    it('should render the text subject content', function () {
      render(
        <SingleTextViewerContainer
          content='test subject content'
          contentLoadingState={asyncStates.success}
        />
      )

      expect(screen.getByText('test subject content')).to.exist()
    })
  })

  describe('with content loading state of initialized', function () {
    it('should not render the text subject content', function () {
      render(
        <SingleTextViewerContainer
          content='test subject content'
          contentLoadingState={asyncStates.initialized}
        />
      )

      expect(screen.queryByText('test subject content')).to.be.null()
    })
  })

  describe('with content loading state of loading', function () {
    it('should not render the text subject content', function () {
      render(
        <SingleTextViewerContainer
          content='test subject content'
          contentLoadingState={asyncStates.loading}
        />
      )

      expect(screen.queryByText('test subject content')).to.be.null()
    })
  })
})
