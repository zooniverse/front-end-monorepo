import asyncStates from '@zooniverse/async-states'
import { shallow } from 'enzyme'
import React from 'react'
import nock from 'nock'
import sinon from 'sinon'
import { Factory } from 'rosie'

import { VariableStarViewerContainer } from './VariableStarViewerContainer'
import variableStar from '../../helpers/mockLightCurves/variableStar'

const nextSubjectJSON = {
  "data": [
    {
      "seriesData": [
        {
          "x": 1.46,
          "y": 6.37,
          "x_error": 2,
          "y_error": 0.5
        }, {
          "x": 7.58,
          "y": 9.210
        }
      ],
      "seriesOptions": {
        "color": "accent-2",
        "label": "Filter 1"
      }
    }, {
      "seriesData": [
        {
          "x": 700,
          "y": 500,
          "x_error": 2,
          "y_error": 0.5
        }, {
          "x": 701,
          "y": 900
        }
      ],
      "seriesOptions": {
        "color": "#98b6a7",
        "label": "Filter 2"
      }
    }
  ],
  "chartOptions": {
    "xAxisLabel": "Days",
    "yAxisLabel": "Brightness"
  }
}

describe('Component > VariableStarViewerContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<VariableStarViewerContainer />)
    expect(wrapper).to.be.ok()
  })

  it('should initialize with the default state', function () {
    const wrapper = shallow(
      <VariableStarViewerContainer />,
      { disableLifecycleMethods: true }
    )
    const mockState = {
      barJSON: {
        amplitude: {
          data: [],
          options: {}
        },
        period: {
          data: [],
          options: {}
        }
      },
      focusedSeries: [],
      imageSrc: '',
      invertYAxis: false,
      loadingState: asyncStates.initialized,
      periodMultiple: 1,
      phasedJSON: {
        data: [],
        chartOptions: {}
      },
      rawJSON: {
        data: [],
        chartOptions: {}
      }
    }
    expect(wrapper.state()).to.eql(mockState)
  })

  describe('with an invalid subject', function () {
    let cdmSpy
    let onErrorSpy
    let nockScope
    const imageSubject = Factory.build('subject')
    const failSubject = Factory.build('subject', {
      locations: [
        { 'application/json': 'http://localhost:8080/failure.json' }
      ]
    })
    before(function () {
      sinon.stub(console, 'error')
      cdmSpy = sinon.spy(VariableStarViewerContainer.prototype, 'componentDidMount')
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
      shallow(
        <VariableStarViewerContainer
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
      shallow(
        <VariableStarViewerContainer
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
    let cdmSpy
    let cduSpy
    let nockScope
    const subject = Factory.build('subject', {
      locations: [
        { 'application/json': 'http://localhost:8080/variableStar.json' }
      ]
    })

    const nextSubject = Factory.build('subject', {
      locations: [
        { 'application/json': 'http://localhost:8080/nextSubject.json' }
      ]
    })
    before(function () {
      cdmSpy = sinon.spy(VariableStarViewerContainer.prototype, 'componentDidMount')
      cduSpy = sinon.spy(VariableStarViewerContainer.prototype, 'componentDidUpdate')
      nockScope = nock('http://localhost:8080')
        .persist(true)
        .get('/variableStar.json')
        .reply(200, variableStar)
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
      const wrapper = shallow(
        <VariableStarViewerContainer
          subject={subject}
        />
      )

      expect(wrapper.state().rawJSON).to.deep.equal({
        data: [],
        chartOptions: {}
      })
      cdmSpy.returnValues[0].then(() => {
        expect(wrapper.state().rawJSON).to.deep.equal(variableStar)
      }).then(done, done)
    })

    it('should call the onReady prop', function (done) {
      const onReadySpy = sinon.spy()
      const wrapper = shallow(
        <VariableStarViewerContainer
          onReady={onReadySpy}
          subject={subject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        expect(onReadySpy).to.have.been.calledOnceWith({ target: wrapper.instance().viewer.current })
      }).then(done, done)
    })

    it('should update component state when there is a new valid subject', function (done) {
      const wrapper = shallow(
        <VariableStarViewerContainer
          subject={subject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        expect(wrapper.state().rawJSON).to.deep.equal(variableStar)
      })
      wrapper.setProps({ subject: nextSubject })

      cduSpy.returnValues[0].then(() => {
        expect(wrapper.state().rawJSON).to.deep.equal(nextSubjectJSON)
      }).then(done, done)
    })
  })
})