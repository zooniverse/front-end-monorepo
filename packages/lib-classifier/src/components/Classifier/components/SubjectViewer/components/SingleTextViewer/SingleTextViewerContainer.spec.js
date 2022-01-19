import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'
import nock from 'nock'
import sinon from 'sinon'

import { SingleTextViewerContainer } from './SingleTextViewerContainer'
import { Factory } from 'rosie'

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
    const wrapper = shallow(<SingleTextViewerContainer />, { disableLifecycleMethods: true })
    expect(wrapper).to.be.ok()
  })

  it('should initialize with the default state', function () {
    const wrapper = shallow(
      <SingleTextViewerContainer />,
      { disableLifecycleMethods: true }
    )
    const mockState = {
      content: ''
    }
    expect(wrapper.state()).to.eql(mockState)
  })

  describe('without a subject', function () {
    it('should render null with the default props', function () {
      const wrapper = shallow(<SingleTextViewerContainer />)
      expect(wrapper.html()).to.be.null()
    })
  })

  describe('with an invalid subject', function () {
    let cdmSpy
    let onErrorSpy
    let nockScope
    let wrapper
    before(function () {
      sinon.stub(console, 'error')
      cdmSpy = sinon.spy(SingleTextViewerContainer.prototype, 'componentDidMount')
      onErrorSpy = sinon.spy()
      nockScope = nock('http://localhost:8080')
        .persist(true)
        .get('/failure.txt')
        .reply(404)
    })

    afterEach(function () {
      cdmSpy.resetHistory()
      onErrorSpy.resetHistory()
    })

    after(function () {
      console.error.restore()
      cdmSpy.restore()
      nock.cleanAll()
      nockScope.persist(false)
    })

    it('should error if a text subject location file can\'t be found', function (done) {
      wrapper = shallow(
        <SingleTextViewerContainer
          onError={onErrorSpy}
          subject={imageSubject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        expect(onErrorSpy).to.have.been.calledOnce()
        expect(onErrorSpy.args[0][0].message).to.equal('No text url found for this subject')
      }).then(done, done)
    })

    it('should error if the location request response fails', function (done) {
      wrapper = shallow(
        <SingleTextViewerContainer
          onError={onErrorSpy}
          subject={failSubject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        expect(onErrorSpy).to.have.been.calledOnce()
        expect(onErrorSpy.args[0][0].message).to.equal('Not Found')
      }).then(done, done)
    })

    it('should render null', function (done) {
      wrapper = shallow(
        <SingleTextViewerContainer
          onError={onErrorSpy}
          subject={failSubject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        expect(wrapper.html()).to.be.null()
      }).then(done, done)
    })
  })

  describe('with a subject', function () {
    let nockScope
    let cdmSpy
    let cduSpy
    let wrapper

    before(function () {
      cdmSpy = sinon.spy(SingleTextViewerContainer.prototype, 'componentDidMount')
      cduSpy = sinon.spy(SingleTextViewerContainer.prototype, 'componentDidUpdate')
      nockScope = nock('http://localhost:8080')
        .persist(true)
        .get('/subject.txt')
        .reply(200, 'subject text')
        .get('/nextSubject.txt')
        .reply(200, 'next subject text')
    })

    afterEach(function () {
      cdmSpy.resetHistory()
      cduSpy.resetHistory()
    })

    after(function () {
      cdmSpy.restore()
      cduSpy.restore()
      nock.cleanAll()
      nockScope.persist(false)
    })

    it('should set the component state with the text content', function (done) {
      wrapper = shallow(
        <SingleTextViewerContainer
          subject={subject}
        />
      )

      expect(wrapper.state().content).to.be.empty()
      cdmSpy.returnValues[0].then(() => {
        expect(wrapper.state().content).to.deep.equal('subject text')
      }).then(done, done)
    })

    it('should call the onReady prop', function (done) {
      const onReadySpy = sinon.spy()
      wrapper = shallow(
        <SingleTextViewerContainer
          onReady={onReadySpy}
          subject={subject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        expect(onReadySpy).to.have.been.calledOnceWith({ target: wrapper.instance().viewer.current })
      }).then(done, done)
    })

    it('should update component state when there is a new valid subject', function (done) {
      wrapper = shallow(
        <SingleTextViewerContainer
          subject={subject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        expect(wrapper.state().content).to.deep.equal('subject text')
      })
      wrapper.setProps({ subject: nextSubject })

      cduSpy.returnValues[0].then(() => {
        expect(wrapper.state().content).to.deep.equal('next subject text')
      }).then(done, done)
    })
  })
})
