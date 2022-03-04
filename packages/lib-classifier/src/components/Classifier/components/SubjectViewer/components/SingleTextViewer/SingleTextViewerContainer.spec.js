import { expect } from 'chai'
import { mount } from 'enzyme'
import nock from 'nock'
import React from 'react'
import { Factory } from 'rosie'
import sinon from 'sinon'

import SingleTextViewerContainer from './SingleTextViewerContainer'
import SingleTextViewer from './SingleTextViewer'


const subject = Factory.build('subject', {
  locations: [
    { 'text/plain': 'http://localhost:8080/subject.txt' }
  ]
})

const nextSubject = Factory.build('subject', {
  locations: [
    { 'text/plain': 'http://localhost:8080/nextSubject.txt' }
  ]
})

const imageSubject = Factory.build('subject')

const failSubject = Factory.build('subject', {
  locations: [
    { 'text/plain': 'http://localhost:8080/failure.txt' }
  ]
})

describe('Component > SingleTextViewerContainer', function () {
  it('should render without crashing', function () {
    const wrapper = mount(<SingleTextViewerContainer />)
    expect(wrapper).to.be.ok()
  })

  describe('without a subject', function () {
    it('should render null with the default props', function () {
      const wrapper = mount(<SingleTextViewerContainer />)
      expect(wrapper.html()).to.be.null()
    })
  })

  describe('with an invalid subject', function () {
    beforeEach(function () {
      sinon.stub(console, 'error')
      const nockScope = nock('http://localhost:8080')
        .get('/failure.txt')
        .reply(404)
    })

    afterEach(function () {
      console.error.restore()
      nock.cleanAll()
    })

    it('should error if a text subject location file can\'t be found', function (done) {
      const onError = sinon.stub().callsFake((error) => {
        expect(error.message).to.equal('No text url found for this subject')
        done()
      })
      const onReady = sinon.stub().callsFake(() => {
        expect.fail('should not call onReady')
        done()
      })
      const wrapper = mount(
        <SingleTextViewerContainer
          onError={onError}
          onReady={onReady}
          subject={imageSubject}
        />
      )
    })

    it('should error if the location request response fails', function (done) {
      const onError = sinon.stub().callsFake((error) => {
        expect(error.message).to.equal('Not Found')
        done()
      })
      const onReady = sinon.stub().callsFake(() => {
        expect.fail('should not call onReady')
        done()
      })
      const wrapper = mount(
        <SingleTextViewerContainer
          onError={onError}
          onReady={onReady}
          subject={failSubject}
        />
      )
    })

    it('should render null', function (done) {
      let wrapper
      const onError = sinon.stub().callsFake((error) => {
        expect(wrapper.html()).to.be.null()
        done()
      })
      const onReady = sinon.stub().callsFake(() => {
        expect.fail('should not call onReady')
        done()
      })
      wrapper = mount(
        <SingleTextViewerContainer
          onError={onError}
          onReady={onReady}
          subject={failSubject}
        />
      )
    })
  })

  describe('with a subject', function () {
    beforeEach(function () {
      const nockScope = nock('http://localhost:8080')
        .get('/subject.txt')
        .reply(200, 'subject text')
        .get('/nextSubject.txt')
        .reply(200, 'next subject text')
    })

    afterEach(function () {
      nock.cleanAll()
    })

    it('should display the text content', function (done) {
      let wrapper
      const onError = sinon.stub().callsFake(() => {
        expect.fail('should not error.')
        done()
      })
      const onReady = sinon.stub().callsFake(event => {
        wrapper.update()
        const stv = wrapper.find(SingleTextViewer)
        expect(stv.prop('content')).to.equal('subject text')
        done()
      })
      wrapper = mount(
        <SingleTextViewerContainer
          onError={onError}
          onReady={onReady}
          subject={subject}
        />
      )
    })

    it('should call the onReady prop', function (done) {
      const onError = sinon.stub().callsFake(() => {
        expect.fail('should not error.')
        done()
      })
      const onReady = sinon.stub().callsFake(event => {
        expect(event.target).to.equal(null)
        done()
      })
      const wrapper = mount(
        <SingleTextViewerContainer
          onError={onError}
          onReady={onReady}
          subject={subject}
        />
      )
    })

    it('should update text content when there is a new valid subject', function (done) {
      const onReady = sinon.stub()
      const onError = sinon.stub().callsFake(() => {
        expect.fail('should not error.')
        done()
      })

      function onFirstSubject(event) {
        wrapper.update()
        const stv = wrapper.find(SingleTextViewer)
        expect(stv.prop('content')).to.equal('subject text')
        wrapper.setProps({
          onReady: onReady.callsFake(onSecondSubject),
          subject: nextSubject
        })
      }

      function onSecondSubject(event) {
        wrapper.update()
        const stv = wrapper.find(SingleTextViewer)
        expect(stv.prop('content')).to.equal('next subject text')
        done()
      }

      const wrapper = mount(
        <SingleTextViewerContainer
          onError={onError}
          onReady={onReady.callsFake(onFirstSubject)}
          subject={subject}
        />
      )
    })
  })
})
