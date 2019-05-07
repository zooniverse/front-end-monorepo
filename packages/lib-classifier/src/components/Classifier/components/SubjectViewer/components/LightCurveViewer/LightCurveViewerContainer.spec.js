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
  beforeEach(function () {
    wrapper = shallow(<LightCurveViewerContainer.wrappedComponent />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should render null if there is no subject prop', function () {
    expect(wrapper.type()).to.be.null
  })

  describe.only('when there is a subject', function () {
    const mockD3XExtent = d3.extent(mockData.x)
    const mockD3YExtent = d3.extent(mockData.y)
    const mockZipData = zip(mockData.x, mockData.y)

    before(function () {
      nock('http://localhost:8080')
        .get('/mockData.json')
        .reply(200, mockData)
        .get('/failure.json')
        .reply(404)
        .get('/nextSubject.json')
        .reply(200, nextSubjectJSON)

    })

    after(function () {
      nock.cleanAll()
    })

    // In these tests, the shallow rendering doesn't seem to be calling componentDidMount... why?
    // Let's call it manually to test the component lifecycle behavior
    it('should error if a json or text subject location file can\'t be found', function (done) {
      wrapper = shallow(
        <LightCurveViewerContainer.wrappedComponent subject={imageSubject} />
      )

      expect(wrapper.state().loading).to.equal(asyncStates.initialized)
      wrapper.instance().componentDidMount()
        .then(() => {
          // It's setting the component state to error
          // but the actual thrown error isn't bubbling up
          expect(wrapper.state().loading).to.equal(asyncStates.error)
        }).then(done, done)
    })

    it('should error if the location request response fails', function (done) {
      wrapper = shallow(
        <LightCurveViewerContainer.wrappedComponent subject={failSubject} />
      )
      
      expect(wrapper.state().loading).to.equal(asyncStates.initialized)
      wrapper.instance().componentDidMount()
        .then(() => {
          // It's setting the component state to error
          // but the actual thrown error isn't bubbling up
          expect(wrapper.state().loading).to.equal(asyncStates.error)
        }).then(done, done)
    })

    it('should set the component state with the json data', function (done) {
      wrapper = shallow(
        <LightCurveViewerContainer.wrappedComponent subject={subject} />
      )

      expect(wrapper.state().loading).to.equal(asyncStates.initialized)

      wrapper.instance().componentDidMount()
        .then(() => {
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

    it('should update component state when there is a new valid subject prop', function (done) {
      const nextSubjectJSONZip = zip(nextSubjectJSON.x, nextSubjectJSON.y)
      const nextSubjectD3XExtent = d3.extent(nextSubjectJSON.x)
      const nextSubjectD3YExtent = d3.extent(nextSubjectJSON.y)
      wrapper = shallow(
        <LightCurveViewerContainer.wrappedComponent subject={subject} />
      )

      expect(wrapper.state().loading).to.equal(asyncStates.initialized)

      wrapper.instance().componentDidMount()
        .then(() => {
          wrapper.setProps({ subject: nextSubject })
        }).then(() => {
          wrapper.state().dataExtent.x.forEach((xDataPoint, index) => {
            expect(xDataPoint).to.equal(nextSubjectD3XExtent[index])
          })

          wrapper.state().dataExtent.y.forEach((yDataPoint, index) => {
            expect(yDataPoint).to.equal(nextSubjectD3YExtent[index])
          })

          // expect(wrapper.state().dataPoints).to.have.lengthOf(nextSubjectJSONZip)

          expect(wrapper.state().loading).to.equal(asyncStates.success)
        })
        .then(done, done)
    })
  })
})
