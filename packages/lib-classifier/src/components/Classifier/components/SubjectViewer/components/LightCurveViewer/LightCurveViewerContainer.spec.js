import { shallow } from 'enzyme'
import React from 'react'
import nock from 'nock'
import sinon from 'sinon'
import * as d3 from 'd3'
import { zip } from 'lodash'

import { LightCurveViewerContainer } from './LightCurveViewerContainer'
import kepler from '../../helpers/mockLightCurves/kepler'
import { Factory } from 'rosie'

let wrapper

const mockData = kepler

const subject = Factory.build('subject', { locations: [
  { 'application/json': 'http://localhost:8080/mockData.json' }
] })

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
    wrapper = shallow(<LightCurveViewerContainer onKeyDown={() => {}} setOnPan={() => {}} setOnZoom={() => {}} />)
    expect(wrapper).to.be.ok()
  })

  it('should mount with an initialized state', function () {
    wrapper = shallow(
      <LightCurveViewerContainer onKeyDown={() => { }} setOnPan={() => { }} setOnZoom={() => { }} />,
      { disableLifecycleMethods: true }
    )
    const mockState = {
      dataExtent: { x: [], y: [] },
      dataPoints: []
    }
    expect(wrapper.state()).to.eql(mockState)
  })

  describe('without a subject', function () {
    it('should render null with the default props', function () {
      wrapper = shallow(<LightCurveViewerContainer onKeyDown={() => { }} setOnPan={() => { }} setOnZoom={() => { }} />)
      expect(wrapper.html()).to.be.null()
    })
  })

  describe('with an invalid subject', function () {
    let cdmSpy
    let onErrorSpy
    let nockScope
    before(function () {
      sinon.stub(console, 'error')
      cdmSpy = sinon.spy(LightCurveViewerContainer.prototype, 'componentDidMount')
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

    it('should error if a json or text subject location file can\'t be found', function (done) {
      wrapper = shallow(
        <LightCurveViewerContainer
          onError={onErrorSpy}
          subject={imageSubject}
          onKeyDown={() => { }}
          setOnPan={() => { }}
          setOnZoom={() => { }}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        expect(onErrorSpy).to.have.been.calledOnce()
        expect(onErrorSpy.args[0][0].message).to.equal('No JSON url found for this subject')
      }).then(done, done)
    })

    it('should error if the location request response fails', function (done) {
      wrapper = shallow(
        <LightCurveViewerContainer
          onError={onErrorSpy}
          subject={failSubject}
          onKeyDown={() => { }}
          setOnPan={() => { }}
          setOnZoom={() => { }}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        expect(onErrorSpy).to.have.been.calledOnce()
        expect(onErrorSpy.args[0][0].message).to.equal('Not Found')
      }).then(done, done)
    })
  })

  describe('with a subject', function () {
    const mockD3XExtent = d3.extent(mockData.x)
    const mockD3YExtent = d3.extent(mockData.y)
    const mockZipData = zip(mockData.x, mockData.y)
    let nockScope
    let cdmSpy
    let cduSpy

    before(function () {
      cdmSpy = sinon.spy(LightCurveViewerContainer.prototype, 'componentDidMount')
      cduSpy = sinon.spy(LightCurveViewerContainer.prototype, 'componentDidUpdate')
      nockScope = nock('http://localhost:8080')
        .persist(true)
        .get('/mockData.json')
        .reply(200, mockData)
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
        <LightCurveViewerContainer
          subject={subject}
          onKeyDown={() => { }}
          setOnPan={() => { }}
          setOnZoom={() => { }}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        wrapper.state().dataExtent.x.forEach((xDataPoint, index) => {
          expect(xDataPoint).to.equal(mockD3XExtent[index])
        })

        wrapper.state().dataExtent.y.forEach((yDataPoint, index) => {
          expect(yDataPoint).to.equal(mockD3YExtent[index])
        })

        expect(wrapper.state().dataPoints).to.have.lengthOf(mockZipData.length)
      }).then(done, done)
    })

    it('should call the onReady prop', function (done) {
      const onReadySpy = sinon.spy()
      wrapper = shallow(
        <LightCurveViewerContainer
          onReady={onReadySpy}
          subject={subject}
          onKeyDown={() => { }}
          setOnPan={() => { }}
          setOnZoom={() => { }}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        expect(onReadySpy).to.have.been.calledOnceWith({ target: wrapper.instance().viewer.current })
      }).then(done, done)
    })

    it('should update component state when there is a new valid subject', function (done) {
      const nextSubjectJSONZip = zip(nextSubjectJSON.x, nextSubjectJSON.y)
      const nextSubjectD3XExtent = d3.extent(nextSubjectJSON.x)
      const nextSubjectD3YExtent = d3.extent(nextSubjectJSON.y)

      wrapper = shallow(
        <LightCurveViewerContainer
          subject={subject}
          onKeyDown={() => { }}
          setOnPan={() => { }}
          setOnZoom={() => { }}
        />
      )
      wrapper.setProps({ subject: nextSubject })

      cduSpy.returnValues[0].then(() => {
        wrapper.state().dataExtent.x.forEach((xDataPoint, index) => {
          expect(xDataPoint).to.equal(nextSubjectD3XExtent[index])
        })

        wrapper.state().dataExtent.y.forEach((yDataPoint, index) => {
          expect(yDataPoint).to.equal(nextSubjectD3YExtent[index])
        })

        expect(wrapper.state().dataPoints).to.have.lengthOf(nextSubjectJSONZip.length)
      }).then(done, done)
    })
  })
})
