import { mount } from 'enzyme'
import React from 'react'
import nock from 'nock'
import sinon from 'sinon'
import * as d3 from 'd3'
import { zip } from 'lodash'

import { LightCurveViewerContainer } from './LightCurveViewerContainer'
import LightCurveViewer from './LightCurveViewer'
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
    wrapper = mount(<LightCurveViewerContainer onKeyDown={() => {}} setOnPan={() => {}} setOnZoom={() => {}} />)
    expect(wrapper).to.be.ok()
  })

  describe('without a subject', function () {
    it('should render null with the default props', function () {
      wrapper = mount(<LightCurveViewerContainer onKeyDown={() => { }} setOnPan={() => { }} setOnZoom={() => { }} />)
      expect(wrapper.html()).to.be.null()
    })
  })

  describe('with an invalid subject', function () {
    let nockScope
    before(function () {
      sinon.stub(console, 'error')
      nockScope = nock('http://localhost:8080')
        .persist(true)
        .get('/failure.json')
        .reply(404)
    })

    after(function () {
      console.error.restore()
      nock.cleanAll()
      nockScope.persist(false)
    })

    it('should error if a json or text subject location file can\'t be found', function (done) {
      const onError = sinon.stub().callsFake((error) => {
        expect(error.message).to.equal('No JSON url found for this subject')
        done()
      })
      const onReady = sinon.stub().callsFake(() => {
        expect.fail('should not call onReady')
        done()
      })
      wrapper = mount(
        <LightCurveViewerContainer
          onError={onError}
          onReady={onReady}
          subject={imageSubject}
          onKeyDown={() => { }}
          setOnPan={() => { }}
          setOnZoom={() => { }}
        />
      )
    })

    it('should error if the location request response fails', function (done) {
      const onError = sinon.stub().callsFake((error) => {
        expect(error.message).to.equal('Not Found')
        expect(error.status).to.equal(404)
        done()
      })
      const onReady = sinon.stub().callsFake(() => {
        expect.fail('should not call onReady')
        done()
      })
      wrapper = mount(
        <LightCurveViewerContainer
          onError={onError}
          onReady={onReady}
          subject={failSubject}
          onKeyDown={() => { }}
          setOnPan={() => { }}
          setOnZoom={() => { }}
        />
      )
    })
  })

  describe('with a subject', function () {
    const mockD3XExtent = d3.extent(mockData.x)
    const mockD3YExtent = d3.extent(mockData.y)
    const mockZipData = zip(mockData.x, mockData.y)
    let nockScope

    before(function () {
      nockScope = nock('http://localhost:8080')
        .persist(true)
        .get('/mockData.json')
        .reply(200, mockData)
        .get('/nextSubject.json')
        .reply(200, nextSubjectJSON)
    })

    after(function () {
      nock.cleanAll()
      nockScope.persist(false)
    })

    it('should set the component state with the json data', function (done) {
      const onReady = sinon.stub().callsFake(() => {
        wrapper.update()
        const lcv = wrapper.find(LightCurveViewer)
        const { dataExtent, dataPoints } = lcv.props()

        dataExtent.x.forEach((xDataPoint, index) => {
          expect(xDataPoint).to.equal(mockD3XExtent[index])
        })

        dataExtent.y.forEach((yDataPoint, index) => {
          expect(yDataPoint).to.equal(mockD3YExtent[index])
        })

        expect(dataPoints).to.have.lengthOf(mockZipData.length)
        done()
      })
      const onError = sinon.stub().callsFake(() => {
        expect.fail('should not call onError')
        done()
      })
      const wrapper = mount(
        <LightCurveViewerContainer
          subject={subject}
          onError={onError}
          onKeyDown={() => { }}
          onReady={onReady}
          setOnPan={() => { }}
          setOnZoom={() => { }}
        />
      )
    })

    it('should update component state when there is a new valid subject', function (done) {
      const nextSubjectJSONZip = zip(nextSubjectJSON.x, nextSubjectJSON.y)
      const nextSubjectD3XExtent = d3.extent(nextSubjectJSON.x)
      const nextSubjectD3YExtent = d3.extent(nextSubjectJSON.y)

      const onError = sinon.stub().callsFake(() => {
        expect.fail('should not call onError')
        done()
      })
      const wrapper = mount(
        <LightCurveViewerContainer
          subject={subject}
          onError={onError}
          onKeyDown={() => { }}
          setOnPan={() => { }}
          setOnZoom={() => { }}
        />
      )
      const onReady = sinon.stub().callsFake(() => {
        wrapper.update()
        const lcv = wrapper.find(LightCurveViewer)
        const { dataExtent, dataPoints } = lcv.props()

        dataExtent.x.forEach((xDataPoint, index) => {
          expect(xDataPoint).to.equal(nextSubjectD3XExtent[index])
        })

        dataExtent.y.forEach((yDataPoint, index) => {
          expect(yDataPoint).to.equal(nextSubjectD3YExtent[index])
        })

        expect(dataPoints).to.have.lengthOf(nextSubjectJSONZip.length)
        done()
      })
      wrapper.setProps({ onReady, subject: nextSubject })
    })
  })
})
