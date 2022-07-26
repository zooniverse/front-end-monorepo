import { expect } from 'chai'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import React from 'react'
import sinon from 'sinon'
import { render, screen } from '@testing-library/react'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'

import { SubjectFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import SingleTextViewerConnector from './SingleTextViewerConnector'

describe('SingleTextViewerConnector', function () {
  function withStore (store) {
    return function Wrapper ({ children }) {
      return (
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            {children}
          </Provider>
        </Grommet>
      )
    }
  }

  describe('with content loading state of loading', function () {
    let onErrorSpy, onReadySpy

    const loadingSubjectSnapshot = SubjectFactory.build({
      content: 'This is test subject content',
      contentLoadingState: asyncStates.loading,
      locations: [
        { 'text/plain': 'http://localhost:8080/subjectContent.txt' }
      ]
    })

    const store = mockStore({
      subject: loadingSubjectSnapshot
    })

    before(function () {
      onErrorSpy = sinon.spy()
      onReadySpy = sinon.spy()

      render(
        <SingleTextViewerConnector
          onError={onErrorSpy}
          onReady={onReadySpy}
        />, {
          wrapper: withStore(store)
        }
      )
    })

    it('should not render the text subject content', function () {
      expect(screen.queryByText('This is test subject content')).to.be.null()
    })

    it('should not call onError', function () {
      expect(onErrorSpy).to.not.have.been.called()
    })

    it('should not call onReady', function () {
      expect(onReadySpy).to.not.have.been.called()
    })
  })

  describe('with content loading state of success', function () {
    let onErrorSpy, onReadySpy

    const successSubjectSnapshot = SubjectFactory.build({
      content: 'This is test subject content',
      contentLoadingState: asyncStates.success,
      locations: [
        { 'text/plain': 'http://localhost:8080/subjectContent.txt' }
      ]
    })

    const store = mockStore({
      subject: successSubjectSnapshot
    })

    before(function () {
      onErrorSpy = sinon.spy()
      onReadySpy = sinon.spy()

      render(
        <SingleTextViewerConnector
          onError={onErrorSpy}
          onReady={onReadySpy}
        />, {
          wrapper: withStore(store)
        }
      )
    })

    it('should render the text subject content', function () {
      expect(screen.getByText('This is test subject content')).to.exist()
    })

    it('should call onReady', function () {
      expect(onReadySpy).to.have.been.calledOnce()
    })

    it('should not call onError', function () {
      expect(onErrorSpy).to.not.have.been.called()
    })
  })

  describe('with content loading state of error', function () {
    let mockError, onErrorSpy, onReadySpy

    mockError = new Error('Error loading subject')

    const errorSubjectSnapshot = SubjectFactory.build({
      content: 'This is test subject content',
      contentLoadingState: asyncStates.error,
      error: mockError,
      locations: [
        { 'text/plain': 'http://localhost:8080/subjectContent.txt' }
      ]
    })

    const store = mockStore({
      subject: errorSubjectSnapshot
    })

    before(function () {
      onErrorSpy = sinon.spy()
      onReadySpy = sinon.spy()

      render(
        <SingleTextViewerConnector
          onError={onErrorSpy}
          onReady={onReadySpy}
        />, {
          wrapper: withStore(store)
        }
      )
    })

    it('should not render the text subject content', function () {
      expect(screen.queryByText('This is test subject content')).to.be.null()
    })

    it('should call onError', function () {
      expect(onErrorSpy).to.have.been.calledOnceWith(mockError)
    })

    it('should not call onReady', function () {
      expect(onReadySpy).to.not.have.been.called()
    })
  })
})
