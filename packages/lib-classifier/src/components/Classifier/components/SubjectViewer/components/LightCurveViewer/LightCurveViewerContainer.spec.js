import { shallow } from 'enzyme'
import React from 'react'
import nock from 'nock'
import sinon from 'sinon'
import * as d3 from 'd3'
import { zip } from 'lodash'
import asyncStates from '@zooniverse/async-states'

import LightCurveViewerContainer from './LightCurveViewerContainer'
import mockData from './mockData.json'
import { Factory } from 'rosie'

let wrapper

const subject = Factory.build('subject', { locations: [
  { 'application/json': 'http://localhost:8080/mockData.json' }
]})

const nextSubject = Factory.build('subject', { locations: [
  { 'text/plain': 'http://localhost:8080/nextSubject.json' }
] })

const nextSubjectJSON = { x: [1, 2], y: [3, 4] }

const imageSubject = Factory.build('subject')

const failSubject = Factory.build('subject', {
  locations: [
    { 'application/json': 'http://localhost:8080/failure.json' }
  ]
})

describe('Component > LightCurveViewerContainer', function () {
  it('should render without crashing', function () {
    wrapper = shallow(<LightCurveViewerContainer.wrappedComponent />)
    expect(wrapper).to.be.ok
  })

  it('should render null if there is no subject prop', function () {
    wrapper = shallow(<LightCurveViewerContainer.wrappedComponent />)
    expect(wrapper.type()).to.be.null
  })

  it('should mount with an initialized state', function () {
    wrapper = shallow(<LightCurveViewerContainer.wrappedComponent />)
    expect(wrapper.state().loading).to.equal(asyncStates.initialized)
  })

  describe.only('when there is a subject', function () {
    const mockD3XExtent = d3.extent(mockData.x)
    const mockD3YExtent = d3.extent(mockData.y)
    const mockZipData = zip(mockData.x, mockData.y)
    let cdmSpy
    before(function () {
      cdmSpy = sinon.spy(LightCurveViewerContainer.wrappedComponent.prototype, 'componentDidMount')
      nock('http://localhost:8080')
        .get('/mockData.json')
        .reply(200, mockData)
        .get('/failure.json')
        .reply(404)
        .get('/nextSubject.json')
        .reply(200, nextSubjectJSON)

    })

    afterEach(function () {
      cdmSpy.resetHistory()
    })

    after(function () {
      cdmSpy.restore()
      nock.cleanAll()
    })

    it('should error if a json or text subject location file can\'t be found', function (done) {
      wrapper = shallow(
        <LightCurveViewerContainer.wrappedComponent subject={imageSubject} />
      )

      expect(cdmSpy).to.have.been.calledOnce
      cdmSpy.returnValues[0].then(() => {
        expect(wrapper.state().loading).to.equal(asyncStates.error)
        expect(wrapper.state().error).to.equal('No JSON url found for this subject')
      }).then(done, done)
    })

    it('should error if the location request response fails', function (done) {
      wrapper = shallow(
        <LightCurveViewerContainer.wrappedComponent subject={failSubject} />
      )

      cdmSpy.returnValues[0].then(() => {
        expect(wrapper.state().loading).to.equal(asyncStates.error)
        expect(wrapper.state().error).to.equal('Not Found')
      }).then(done, done)
    })

    it('should set the component state with the json data', function (done) {
      wrapper = shallow(
        <LightCurveViewerContainer.wrappedComponent subject={subject} />
      )

      cdmSpy.returnValues[0].then(() => {
        wrapper.state().dataExtent.x.forEach((xDataPoint, index) => {
          expect(xDataPoint).to.equal(mockD3XExtent[index])
        })

        wrapper.state().dataExtent.y.forEach((yDataPoint, index) => {
          expect(yDataPoint).to.equal(mockD3YExtent[index])
        })

        expect(wrapper.state().dataPoints).to.have.lengthOf(mockZipData.length)

        expect(wrapper.state().loading).to.equal(asyncStates.success)
      }).then(done, done)
    })

    it('calls the onReady prop on successful load', function (done) {
      const onReadySpy = sinon.spy()
      wrapper = shallow(
        <LightCurveViewerContainer.wrappedComponent onReady={onReadySpy} subject={subject} />
      )
      
      cdmSpy.returnValues[0].then(() => {
        expect(onReadySpy).to.have.been.calledOnceWith({ target: wrapper.instance().viewer.current })
      })
      .then(done, done)
    })

    it('should update component state when there is a new valid subject prop', function (done) {
      const nextSubjectJSONZip = zip(nextSubjectJSON.x, nextSubjectJSON.y)
      const nextSubjectD3XExtent = d3.extent(nextSubjectJSON.x)
      const nextSubjectD3YExtent = d3.extent(nextSubjectJSON.y)
      const cduSpy = sinon.spy(LightCurveViewerContainer.wrappedComponent.prototype, 'componentDidUpdate')
      wrapper = shallow(
        <LightCurveViewerContainer.wrappedComponent subject={subject} />
      )
      wrapper.setProps({ subject: nextSubject })

      // componentDidUpdate gets called three times
      // only the third is the update to the new props we're expecting for this test
      // Is there a better way to do this? This seems brittle
      const cduReturnedPromise = cduSpy.returnValues.filter(value => Promise.resolve(value) === value)
      cduReturnedPromise[0].then(() => {
        wrapper.state().dataExtent.x.forEach((xDataPoint, index) => {
          expect(xDataPoint).to.equal(nextSubjectD3XExtent[index])
        })

        wrapper.state().dataExtent.y.forEach((yDataPoint, index) => {
          expect(yDataPoint).to.equal(nextSubjectD3YExtent[index])
        })

        expect(wrapper.state().dataPoints).to.have.lengthOf(nextSubjectJSONZip.length)

        expect(wrapper.state().loading).to.equal(asyncStates.success)
      })
      .then(() => {
        cduSpy.restore()
      })
      .then(done, done)
    })
  })
})
