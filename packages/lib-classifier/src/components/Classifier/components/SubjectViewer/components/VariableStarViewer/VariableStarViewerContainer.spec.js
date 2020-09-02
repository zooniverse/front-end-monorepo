import asyncStates from '@zooniverse/async-states'
import { shallow } from 'enzyme'
import React from 'react'
import nock from 'nock'
import sinon from 'sinon'
import { Factory } from 'rosie'

import VariableStarViewerContainer from './VariableStarViewerContainer'
import VariableStarViewer from './VariableStarViewer'
import variableStar from '@viewers/helpers/mockLightCurves/variableStar'

const nextSubjectJSON = {
  data: {
    scatterPlot: {
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
            "period": 2.5
          }
        }, {
          "seriesData": [
            {
              "x": 19.92215,
              "y": -0.1976986301,
              "x_error": 2,
              "y_error": 0.5
            }, {
              "x": 35.46347,
              "y": -0.22472
            }
          ],
          "seriesOptions": {
            "color": "#98b6a7",
            "period": 3.5
          }
        }
      ],
      "chartOptions": {
        "xAxisLabel": "Days",
        "yAxisLabel": "Brightness"
      }
    },
    barCharts: {
      period: {
        data: [
          { label: 'A', value: 0.34742 },
          { label: 'B', value: 2.37438 }
        ],
        chartOptions: {
          xAxisLabel: 'Period',
          yAxisLabel: ''
        }
      },
      amplitude: {
        data: [
          { color: 'accent-1', label: 'X', value: 34.3747 },
          { color: 'accent-2', label: 'Y', value: 236.3637 }
        ],
        chartOptions: {
          xAxisLabel: 'Amplitude',
          yAxisLabel: ''
        }
      }
    }
  }
}

const subject = Factory.build('subject', {
  locations: [
    { 'image/png': 'http://localhost:8080/talk-backup.png' },
    { 'application/json': 'http://localhost:8080/variableStar.json' },
    { 'image/png': 'http://localhost:8080/image1.png' }
  ]
})

const nextSubject = Factory.build('subject', {
  locations: [
    { 'image/png': 'http://localhost:8080/talk-backup.png' },
    { 'application/json': 'http://localhost:8080/nextSubject.json' },
    { 'image/png': 'http://localhost:8080/image2.png' }
  ]
})

describe('Component > VariableStarViewerContainer', function () {
  const mockState = {
    allowPanZoom: '',
    barJSON: {
      amplitude: {
        data: [],
        chartOptions: {}
      },
      period: {
        data: [],
        chartOptions: {}
      }
    },
    imageSrc: '',
    invertYAxis: false,
    loadingState: asyncStates.initialized,
    periodMultiple: 1,
    phaseFocusedSeries: 0,
    phasedJSON: {
      data: [],
      chartOptions: {}
    },
    phaseLimit: 0.2,
    rawJSON: {
      data: {
        scatterPlot: {
          data: [],
          chartOptions: {}
        },
        barCharts: {
          amplitude: {
            data: [],
            chartOptions: {}
          },
          period: {
            data: [],
            chartOptions: {}
          }
        }
      }
    },
    visibleSeries: []
  }

  it('should render without crashing', function () {
    const wrapper = shallow(<VariableStarViewerContainer />)
    expect(wrapper).to.be.ok()
  })

  it('should initialize with the default state', function () {
    const wrapper = shallow(
      <VariableStarViewerContainer />,
      { disableLifecycleMethods: true }
    )

    expect(wrapper.state()).to.eql(mockState)
  })

  describe('with an invalid subject', function () {
    let cdmSpy
    let onErrorSpy
    let nockScope
    const imageSubject = Factory.build('subject')
    const failSubject = Factory.build('subject', {
      locations: [
        { 'application/json': 'http://localhost:8080/failure.json' },
        { 'image/png': 'http://localhost:8080/image.png' }
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
    let wrapper
    const onReadySpy = sinon.spy()

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

    beforeEach(function () {
      wrapper = shallow(
        <VariableStarViewerContainer
          onReady={onReadySpy}
          subject={subject}
        />
      )
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
      expect(wrapper.state().rawJSON).to.deep.equal(mockState.rawJSON)
      cdmSpy.returnValues[0].then(() => {
        expect(wrapper.state().rawJSON).to.deep.equal(variableStar)
      }).then(done, done)
    })

    it('should set the component state with the image location source', function (done) {
      expect(wrapper.state().imageSrc).to.be.empty()
      cdmSpy.returnValues[0].then(() => {
        expect(wrapper.state().imageSrc).to.equal('http://localhost:8080/image1.png')
      }).then(done, done)
    })

    xit('should call the onReady prop', function (done) {
      cdmSpy.returnValues[0].then(() => {
        expect(onReadySpy).to.have.been.calledOnceWith({ target: wrapper.instance().viewer.current })
      }).then(done, done)
    })

    it('should update component state when there is a new valid subject', function (done) {
      cdmSpy.returnValues[0].then(() => {
        expect(wrapper.state().rawJSON).to.deep.equal(variableStar)
        expect(wrapper.state().imageSrc).to.equal('http://localhost:8080/image1.png')
      })
      wrapper.setProps({ subject: nextSubject })

      cduSpy.returnValues[0].then(() => {
        expect(wrapper.state().rawJSON).to.deep.equal(nextSubjectJSON)
        expect(wrapper.state().imageSrc).to.equal('http://localhost:8080/image2.png')
      }).then(done, done)
    })
  })

  describe('with series visibility', function () {
    let cdmSpy
    let nockScope
    const visibleStateMock = [
      { [variableStar.data.scatterPlot.data[0].seriesOptions.label]: true },
      { [variableStar.data.scatterPlot.data[1].seriesOptions.label]: true }
    ]

    before(function () {
      cdmSpy = sinon.spy(VariableStarViewerContainer.prototype, 'componentDidMount')
      nockScope = nock('http://localhost:8080')
        .persist(true)
        .get('/variableStar.json')
        .reply(200, variableStar)
        .get('/nextSubject.json')
        .reply(200, nextSubjectJSON)
    })

    afterEach(function () {
      cdmSpy.resetHistory()
    })

    after(function () {
      cdmSpy.restore()
      nock.cleanAll()
      nockScope.persist(false)
    })

    it('should default to visible states of true for each series', function (done) {
      const wrapper = shallow(
        <VariableStarViewerContainer
          subject={subject}
        />
      )

      expect(wrapper.state().visibleSeries).to.be.empty()
      cdmSpy.returnValues[0].then(() => {
        console.log('visibleStateMock', visibleStateMock)
        expect(wrapper.state().visibleSeries).to.deep.equal(visibleStateMock)
      }).then(done, done)
    })

    it('should use the series option label', function (done) {
      const wrapper = shallow(
        <VariableStarViewerContainer
          subject={subject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        const { visibleSeries } = wrapper.state()
        const firstSeriesLabel = Object.keys(visibleSeries[0])[0]
        const secondSeriesLabel = Object.keys(visibleSeries[1])[0]
        expect(firstSeriesLabel).to.equal(variableStar.data.scatterPlot.data[0].seriesOptions.label)
        expect(secondSeriesLabel).to.equal(variableStar.data.scatterPlot.data[1].seriesOptions.label)
      }).then(done, done)
    })

    it('should use a fallback label if series option label is missing', function (done) {
      const wrapper = shallow(
        <VariableStarViewerContainer
          subject={nextSubject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        const { visibleSeries } = wrapper.state()
        const firstSeriesLabel = Object.keys(visibleSeries[0])[0]
        const secondSeriesLabel = Object.keys(visibleSeries[1])[0]
        expect(firstSeriesLabel).to.equal('Filter 1')
        expect(secondSeriesLabel).to.equal('Filter 2')
      }).then(done, done)
    })

    it('should be able to toggle the visible state', function () {
      const eventMock = {
        target: {
          checked: false,
          value: Object.keys(visibleStateMock[0])[0]
        }
      }
      const wrapper = shallow(
        <VariableStarViewerContainer
          subject={subject}
        />
      )

      wrapper.setState({ rawJSON: variableStar, visibleSeries: visibleStateMock })
      expect(wrapper.state().visibleSeries).to.deep.equal(visibleStateMock)
      wrapper.instance().setSeriesVisibility(eventMock)
      expect(wrapper.state().visibleSeries).to.deep.equal([
        { [variableStar.data.scatterPlot.data[0].seriesOptions.label]: false },
        { [variableStar.data.scatterPlot.data[1].seriesOptions.label]: true }
      ])
    })
  })

  describe('when calculating the phased scatter plot JSON', function () {
    let cdmSpy
    let cduSpy
    let nockScope

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


    it('should calculate the phased JSON on initialization', function (done) {
      const wrapper = shallow(
        <VariableStarViewerContainer
          subject={subject}
        />
      )

      expect(wrapper.state().phasedJSON).to.deep.equal(mockState.phasedJSON)

      cdmSpy.returnValues[0].then(() => {
        const phasedJSONState = wrapper.state().phasedJSON
        expect(phasedJSONState.data[0].seriesData.length).to.be.at.least(variableStar.data.scatterPlot.data[0].seriesData.length)
        expect(phasedJSONState.data[0].seriesOptions).to.deep.equal(variableStar.data.scatterPlot.data[0].seriesOptions)
        expect(phasedJSONState.data[1].seriesData.length).to.be.at.least(variableStar.data.scatterPlot.data[1].seriesData.length)
        expect(phasedJSONState.data[1].seriesOptions).to.deep.equal(variableStar.data.scatterPlot.data[1].seriesOptions)
        expect(phasedJSONState.chartOptions).to.deep.equal(variableStar.data.scatterPlot.chartOptions)
      }).then(done, done)
    })

    it('should calculate the phased JSON for the next subject', function (done) {
      const wrapper = shallow(
        <VariableStarViewerContainer
          subject={subject}
        />
      )

      wrapper.setProps({ subject: nextSubject })

      cduSpy.returnValues[0].then(() => {
        const phasedJSONState = wrapper.state().phasedJSON
        expect(phasedJSONState.data[0].seriesData.length).to.be.at.least(nextSubjectJSON.data.scatterPlot.data[0].seriesData.length)
        expect(phasedJSONState.data[0].seriesOptions).to.deep.equal(nextSubjectJSON.data.scatterPlot.data[0].seriesOptions)
        expect(phasedJSONState.data[1].seriesData.length).to.be.at.least(nextSubjectJSON.data.scatterPlot.data[1].seriesData.length)
        expect(phasedJSONState.data[1].seriesOptions).to.deep.equal(nextSubjectJSON.data.scatterPlot.data[1].seriesOptions)
        expect(phasedJSONState.chartOptions).to.deep.equal(nextSubjectJSON.data.scatterPlot.chartOptions)
      }).then(done, done)
    })

    it('should calculate a new phased JSON when setPeriodMultiple is called', function (done) {
      const wrapper = shallow(
        <VariableStarViewerContainer
          subject={subject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        const phasedJSONInitialState = wrapper.state().phasedJSON
        wrapper.instance().setPeriodMultiple({ target: { value: '2' }})
        const phasedJSONNewState = wrapper.state().phasedJSON
        expect(phasedJSONInitialState).to.not.deep.equal(phasedJSONNewState)
      }).then(done, done)
    })

    it('should calculate a new phased JSON when setSeriesPhaseFocus is called', function (done) {
      const wrapper = shallow(
        <VariableStarViewerContainer
          subject={subject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        const phasedJSONInitialState = wrapper.state().phasedJSON
        wrapper.instance().setSeriesPhaseFocus({ target: { value: '1' } })
        const phasedJSONNewState = wrapper.state().phasedJSON
        expect(phasedJSONInitialState).to.not.deep.equal(phasedJSONNewState)
      }).then(done, done)
    })
  })

  describe('when calculating the phased bar charts JSON', function () {
    let cdmSpy
    let cduSpy
    let nockScope

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


    it('should calculate the phased bar chart JSON on initialization', function (done) {
      const wrapper = shallow(
        <VariableStarViewerContainer
          subject={subject}
        />
      )

      expect(wrapper.state().barJSON).to.deep.equal(mockState.barJSON)

      cdmSpy.returnValues[0].then(() => {
        const phasedBarJSONState = wrapper.state().barJSON
        expect(phasedBarJSONState.period.data.length).to.be.at.least(variableStar.data.barCharts.period.data.length)
        expect(phasedBarJSONState.period.chartOptions).to.deep.equal(variableStar.data.barCharts.period.chartOptions)
        expect(phasedBarJSONState.amplitude.data.length).to.deep.equal(variableStar.data.barCharts.amplitude.data.length)
        expect(phasedBarJSONState.amplitude.chartOptions).to.deep.equal(variableStar.data.barCharts.amplitude.chartOptions)
      }).then(done, done)
    })

    it('should calculate the phased bar chart JSON for the next subject', function (done) {
      const wrapper = shallow(
        <VariableStarViewerContainer
          subject={subject}
        />
      )

      wrapper.setProps({ subject: nextSubject })

      cduSpy.returnValues[0].then(() => {
        const phasedBarJSONState = wrapper.state().barJSON
        expect(phasedBarJSONState.period.data.length).to.be.at.least(nextSubjectJSON.data.barCharts.period.data.length)
        expect(phasedBarJSONState.period.chartOptions).to.deep.equal(nextSubjectJSON.data.barCharts.period.chartOptions)
        expect(phasedBarJSONState.amplitude.data.length).to.be.at.least(nextSubjectJSON.data.barCharts.amplitude.data.length)
        expect(phasedBarJSONState.amplitude.chartOptions).to.deep.equal(nextSubjectJSON.data.barCharts.amplitude.chartOptions)
      }).then(done, done)
    })

    it('should calculate a new phased bar chart JSON when setPeriodMultiple is called', function (done) {
      const wrapper = shallow(
        <VariableStarViewerContainer
          subject={subject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        const phasedBarJSONInitialState = wrapper.state().barJSON
        wrapper.instance().setPeriodMultiple({ target: { value: '2' } })
        const phasedBarJSONNewState = wrapper.state().barJSON
        expect(phasedBarJSONInitialState).to.not.deep.equal(phasedBarJSONNewState)
      }).then(done, done)
    })
  })

  describe('with pan and zoom per scatter plot module', function () {
    let wrapper
    before(function () {
      wrapper = shallow(
        <VariableStarViewerContainer
          subject={subject}
        />
      )
    })

    it('should default to not have pan and zoom enabled for either scatter plot', function () {
      expect(wrapper.find(VariableStarViewer).props().allowPanZoom).to.equal('')
    })

    it('should set the state for which module is allowed to zoom when setAllowPanZoom is called', function () {
      wrapper.instance().setAllowPanZoom('rawJSON')
      expect(wrapper.find(VariableStarViewer).props().allowPanZoom).to.equal('rawJSON')
    })
  })
})