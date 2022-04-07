import { expect } from 'chai'
import { mount } from 'enzyme'
import React from 'react'
import { Factory } from 'rosie'
import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'

import SingleTextViewerContainer from './SingleTextViewerContainer'
import SingleTextViewer from './SingleTextViewer'

const subject = Factory.build('subject', {
  content: 'subject text',
  contentLoadingState: asyncStates.success,
  locations: [
    { 'text/plain': 'http://localhost:8080/subjectContent.txt' }
  ]
})

const nextSubject = Factory.build('subject', {
  content: 'next subject text',
  contentLoadingState: asyncStates.success,
  locations: [
    { 'text/plain': 'http://localhost:8080/subjectContent.txt' }
  ]
})

const errorSubject = Factory.build('subject', {
  contentLoadingState: asyncStates.error,
  error: new Error('Error loading subject'),
  locations: [
    { 'text/plain': 'http://localhost:8080/subjectContent.txt' }
  ]
})

const initializedSubject = Factory.build('subject', {
  contentLoadingState: asyncStates.initialized,
  locations: [
    { 'text/plain': 'http://localhost:8080/subjectContent.txt' }
  ]
})

const loadingSubject = Factory.build('subject', {
  contentLoadingState: asyncStates.loading,
  locations: [
    { 'text/plain': 'http://localhost:8080/subjectContent.txt' }
  ]
})

describe('Component > SingleTextViewerContainer', function () {
  it('should render without crashing', function () {
    const wrapper = mount(<SingleTextViewerContainer />)
    expect(wrapper).to.be.ok()
    expect(wrapper.html()).to.be.null()
  })

  describe('with content loading state of error', function () {
    let wrapper, onErrorSpy, onReadySpy

    before(function () {
      onErrorSpy = sinon.spy()
      onReadySpy = sinon.spy()

      wrapper = mount(
        <SingleTextViewerContainer
          content={errorSubject.content}
          contentLoadingState={errorSubject.contentLoadingState}
          error={errorSubject.error}
          onError={onErrorSpy}
          onReady={onReadySpy}
        />)
    })

    it('should render null', function () {
      expect(wrapper.html()).to.be.null()
    })

    it('should call the onError prop', function () {
      expect(onErrorSpy).to.have.been.calledOnceWith(errorSubject.error)
    })

    it('should not call the onReady prop', function () {
      expect(onReadySpy).to.not.have.been.called()
    })
  })

  describe('with content loading state of success', function () {
    let wrapper, onErrorSpy, onReadySpy

    before(function () {
      onErrorSpy = sinon.spy()
      onReadySpy = sinon.spy()

      wrapper = mount(
        <SingleTextViewerContainer
          content={subject.content}
          contentLoadingState={subject.contentLoadingState}
          error={subject.error}
          onError={onErrorSpy}
          onReady={onReadySpy}
        />)
    })

    it('should render the text subject content', function () {
      const stv = wrapper.find(SingleTextViewer)
      expect(stv.prop('content')).to.equal(subject.content)
    })

    it('should call the onReady prop', function () {
      expect(onReadySpy).to.have.been.calledOnce()
    })

    it('should not call the onError prop', function () {
      expect(onErrorSpy).to.not.have.been.called()
    })

    it('should update text subject content when there is a new subject', function () {
      wrapper.setProps({
        content: nextSubject.content,
        contentLoadingState: nextSubject.contentLoadingState,
        error: nextSubject.error
      })
      const stv = wrapper.find(SingleTextViewer)
      expect(stv.prop('content')).to.equal(nextSubject.content)
    })
  })

  describe('with content loading state of initialized', function () {
    let wrapper, onErrorSpy, onReadySpy

    before(function () {
      onErrorSpy = sinon.spy()
      onReadySpy = sinon.spy()

      wrapper = mount(
        <SingleTextViewerContainer
          content={initializedSubject.content}
          contentLoadingState={initializedSubject.contentLoadingState}
          error={initializedSubject.error}
          onError={onErrorSpy}
          onReady={onReadySpy}
        />)
    })

    it('should render null', function () {
      expect(wrapper.html()).to.be.null()
    })

    it('should not call the onError prop', function () {
      expect(onErrorSpy).to.not.have.been.called()
    })

    it('should not call the onReady prop', function () {
      expect(onReadySpy).to.not.have.been.called()
    })
  })

  describe('with content loading state of loading', function () {
    let wrapper, onErrorSpy, onReadySpy

    before(function () {
      onErrorSpy = sinon.spy()
      onReadySpy = sinon.spy()

      wrapper = mount(
        <SingleTextViewerContainer
          content={loadingSubject.content}
          contentLoadingState={loadingSubject.contentLoadingState}
          error={loadingSubject.error}
          onError={onErrorSpy}
          onReady={onReadySpy}
        />)
    })

    it('should render null', function () {
      expect(wrapper.html()).to.be.null()
    })

    it('should not call the onError prop', function () {
      expect(onErrorSpy).to.not.have.been.called()
    })

    it('should not call the onReady prop', function () {
      expect(onReadySpy).to.not.have.been.called()
    })

    describe('when content loading state changes to success', function () {
      it('should render the text subject content', function () {
        wrapper.setProps({
          content: 'text content loaded',
          contentLoadingState: asyncStates.success
        })

        const stv = wrapper.find(SingleTextViewer)
        expect(stv.prop('content')).to.equal('text content loaded')
        expect(onReadySpy).to.have.been.calledOnce()
      })
    })
  })
})
