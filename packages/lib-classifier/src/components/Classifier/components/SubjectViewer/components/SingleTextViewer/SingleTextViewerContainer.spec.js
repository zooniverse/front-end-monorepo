import { expect } from 'chai'
import React from 'react'
import sinon from 'sinon'
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
    let mockError, onErrorSpy, onReadySpy

    before(function () {
      onErrorSpy = sinon.spy()
      onReadySpy = sinon.spy()
      mockError = new Error('Error loading subject')

      render(
        <SingleTextViewerContainer
          content='test subject content'
          contentLoadingState={asyncStates.error}
          error={mockError}
          onError={onErrorSpy}
          onReady={onReadySpy}
        />
      )
    })

    it('should not render the text subject content', function () {
      expect(screen.queryByText('test subject content')).to.be.null()
    })

    it('should call the onError prop', function () {
      expect(onErrorSpy).to.have.been.calledOnceWith(mockError)
    })

    it('should not call the onReady prop', function () {
      expect(onReadySpy).to.not.have.been.called()
    })
  })

  describe('with content loading state of success', function () {
    let onErrorSpy, onReadySpy

    before(function () {
      onErrorSpy = sinon.spy()
      onReadySpy = sinon.spy()

      render(
        <SingleTextViewerContainer
          content='test subject content'
          contentLoadingState={asyncStates.success}
          onError={onErrorSpy}
          onReady={onReadySpy}
        />
      )
    })

    it('should render the text subject content', function () {
      expect(screen.getByText('test subject content')).to.exist()
    })

    it('should call the onReady prop', function () {
      expect(onReadySpy).to.have.been.calledOnce()
    })

    it('should not call the onError prop', function () {
      expect(onErrorSpy).to.not.have.been.called()
    })
  })

  describe('with content loading state of initialized', function () {
    let onErrorSpy, onReadySpy

    before(function () {
      onErrorSpy = sinon.spy()
      onReadySpy = sinon.spy()

      render(
        <SingleTextViewerContainer
          content='test subject content'
          contentLoadingState={asyncStates.initialized}
          onError={onErrorSpy}
          onReady={onReadySpy}
        />
      )
    })

    it('should not render the text subject content', function () {
      expect(screen.queryByText('test subject content')).to.be.null()
    })

    it('should not call the onError prop', function () {
      expect(onErrorSpy).to.not.have.been.called()
    })

    it('should not call the onReady prop', function () {
      expect(onReadySpy).to.not.have.been.called()
    })
  })

  describe('with content loading state of loading', function () {
    let onErrorSpy, onReadySpy

    before(function () {
      onErrorSpy = sinon.spy()
      onReadySpy = sinon.spy()

      render(
        <SingleTextViewerContainer
          content='test subject content'
          contentLoadingState={asyncStates.loading}
          onError={onErrorSpy}
          onReady={onReadySpy}
        />
      )
    })

    it('should not render the text subject content', function () {
      expect(screen.queryByText('test subject content')).to.be.null()
    })

    it('should not call the onError prop', function () {
      expect(onErrorSpy).to.not.have.been.called()
    })

    it('should not call the onReady prop', function () {
      expect(onReadySpy).to.not.have.been.called()
    })
  })
})
