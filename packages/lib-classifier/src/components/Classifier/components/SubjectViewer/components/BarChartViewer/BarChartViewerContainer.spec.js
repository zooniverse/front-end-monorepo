import { shallow } from 'enzyme'
import React from 'react'
import nock from 'nock'
import sinon from 'sinon'

import { BarChartViewerContainer } from './BarChartViewerContainer'
import {
  variableStarAmplitudeMockData,
  variableStarPeriodMockData
} from './mockData'
import { Factory } from 'rosie'

const subject = Factory.build('subject', {
  locations: [
    { 'application/json': 'http://localhost:8080/mockData.json' }
  ]
})

const nextSubject = Factory.build('subject', {
  locations: [
    { 'application/json': 'http://localhost:8080/nextSubject.json' }
  ]
})

const subjectJSON = variableStarAmplitudeMockData
const nextSubjectJSON = variableStarPeriodMockData

const imageSubject = Factory.build('subject')

const failSubject = Factory.build('subject', {
  locations: [
    { 'application/json': 'http://localhost:8080/failure.json' }
  ]
})

describe('Component > BarChartViewerContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<BarChartViewerContainer />)
    expect(wrapper).to.be.ok()
  })

  it('should mount with an initialized state', function () {
    const wrapper = shallow(
      <BarChartViewerContainer />,
      { disableLifecycleMethods: true }
    )
    const mockState = {
      JSONdata: null
    }
    expect(wrapper.state()).to.eql(mockState)
  })

  describe('without a subject', function () {
    it('should render null with the default props', function () {
      const wrapper = shallow(<BarChartViewerContainer />)
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
      cdmSpy = sinon.spy(BarChartViewerContainer.prototype, 'componentDidMount')
      onErrorSpy = sinon.spy()
      nockScope = nock('http://localhost:8080')
        .persist(true)
        .get('/failure.json')
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

    it('should error if a json subject location file can\'t be found', function (done) {
      wrapper = shallow(
        <BarChartViewerContainer
          onError={onErrorSpy}
          subject={imageSubject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        expect(onErrorSpy).to.have.been.calledOnce()
        expect(onErrorSpy.args[0][0].message).to.equal('No JSON url found for this subject')
      }).then(done, done)
    })

    it('should error if the location request response fails', function (done) {
      wrapper = shallow(
        <BarChartViewerContainer
          onError={onErrorSpy}
          subject={failSubject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        expect(onErrorSpy).to.have.been.calledOnce()
        expect(onErrorSpy.args[0][0].message).to.equal('Not Found')
      }).then(done, done)
    })
  })

  describe('with a subject', function () {
    let nockScope
    let cdmSpy
    let cduSpy
    let wrapper

    before(function () {
      cdmSpy = sinon.spy(BarChartViewerContainer.prototype, 'componentDidMount')
      cduSpy = sinon.spy(BarChartViewerContainer.prototype, 'componentDidUpdate')
      nockScope = nock('http://localhost:8080')
        .persist(true)
        .get('/mockData.json')
        .reply(200, subjectJSON)
        .get('/nextSubject.json')
        .reply(200, nextSubjectJSON)
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

    it('should set the component state with the json data', function (done) {
      wrapper = shallow(
        <BarChartViewerContainer
          subject={subject}
        />
      )

      expect(wrapper.state().JSONdata).to.be.null()
      cdmSpy.returnValues[0].then(() => {
        expect(wrapper.state().JSONdata).to.deep.equal(subjectJSON)
      }).then(done, done)
    })

    it('should call the onReady prop', function (done) {
      const onReadySpy = sinon.spy()
      wrapper = shallow(
        <BarChartViewerContainer
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
        <BarChartViewerContainer
          subject={subject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        expect(wrapper.state().JSONdata).to.deep.equal(subjectJSON)
      })
      wrapper.setProps({ subject: nextSubject })

      cduSpy.returnValues[0].then(() => {
        expect(wrapper.state().JSONdata).to.deep.equal(nextSubjectJSON)
      }).then(done, done)
    })
  })
})