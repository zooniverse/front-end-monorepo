import { shallow } from 'enzyme'
import React from 'react'
import nock from 'nock'
import sinon from 'sinon'

import ScatterPlotViewerContainer from './ScatterPlotViewerContainer'
import ScatterPlotViewer from './ScatterPlotViewer'
import { dataSeriesWithXErrors, keplerMockDataWithOptions } from './helpers/mockData'

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

const subjectJSON = keplerMockDataWithOptions
const nextSubjectJSON = dataSeriesWithXErrors

const imageSubject = Factory.build('subject')

const failSubject = Factory.build('subject', {
  locations: [
    { 'application/json': 'http://localhost:8080/failure.json' }
  ]
})

const mockState = {
  JSONData: {
    chartOptions: {},
    data: []
  }
}

describe('Component > ScatterPlotViewerContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ScatterPlotViewerContainer />)
    expect(wrapper).to.be.ok()
  })

  it('should initialize with the default state', function () {
    const wrapper = shallow(
      <ScatterPlotViewerContainer />,
      { disableLifecycleMethods: true }
    )
    expect(wrapper.state()).to.eql(mockState)
  })

  describe('without a subject', function () {
    it('should render null with the default props', function () {
      const wrapper = shallow(<ScatterPlotViewerContainer />)
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
      cdmSpy = sinon.spy(ScatterPlotViewerContainer.prototype, 'componentDidMount')
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
        <ScatterPlotViewerContainer
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
        <ScatterPlotViewerContainer
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
      cdmSpy = sinon.spy(ScatterPlotViewerContainer.prototype, 'componentDidMount')
      cduSpy = sinon.spy(ScatterPlotViewerContainer.prototype, 'componentDidUpdate')
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
        <ScatterPlotViewerContainer
          subject={subject}
        />
      )

      expect(wrapper.state()).to.deep.equal(mockState)
      cdmSpy.returnValues[0].then(() => {
        expect(wrapper.state().JSONData).to.deep.equal(subjectJSON)
      }).then(done, done)
    })

    it('should call the onReady prop', function (done) {
      const onReadySpy = sinon.spy()
      wrapper = shallow(
        <ScatterPlotViewerContainer
          onReady={onReadySpy}
          subject={subject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        expect(onReadySpy).to.have.been.calledOnceWith({ target: {} })
      }).then(done, done)
    })

    it('should update component state and pass as props when there is a new valid subject', function (done) {
      wrapper = shallow(
        <ScatterPlotViewerContainer
          subject={subject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        const scatterPlotViewerProps = wrapper.find(ScatterPlotViewer).props()
        const { data, chartOptions } = subjectJSON
        expect(wrapper.state().JSONData).to.deep.equal(subjectJSON)
        expect(scatterPlotViewerProps.data).to.deep.equal(data)
        expect(scatterPlotViewerProps.margin).to.equal(chartOptions.margin)
        expect(scatterPlotViewerProps.padding).to.equal(chartOptions.padding)
        expect(scatterPlotViewerProps.xAxisLabel).to.equal(chartOptions.xAxisLabel)
        expect(scatterPlotViewerProps.xAxisLabelOffset).to.equal(chartOptions.xAxisLabelOffset)
        expect(scatterPlotViewerProps.yAxisLabel).to.equal(chartOptions.yAxisLabel)
        expect(scatterPlotViewerProps.yAxisLabelOffset).to.equal(chartOptions.yAxisLabelOffset)

      })
      wrapper.setProps({ subject: nextSubject })

      cduSpy.returnValues[0].then(() => {
        const scatterPlotViewerProps = wrapper.find(ScatterPlotViewer).props()
        const wrapperState = wrapper.state()
        // example subject missing chart options. 
        // We set the state to be structured in the expected way
        // undefined options are passed and
        // child component falls back to default props so viewer can still render
        expect(wrapperState.JSONData).to.deep.equal({ chartOptions: {}, data: nextSubjectJSON })
        expect(scatterPlotViewerProps.data).to.deep.equal(nextSubjectJSON)
        expect(scatterPlotViewerProps.margin).to.be.undefined()
        expect(scatterPlotViewerProps.padding).to.be.undefined()
        expect(scatterPlotViewerProps.xAxisLabel).to.be.undefined()
        expect(scatterPlotViewerProps.xAxisLabelOffset).to.be.undefined()
        expect(scatterPlotViewerProps.yAxisLabel).to.be.undefined()
        expect(scatterPlotViewerProps.yAxisLabelOffset).to.be.undefined()
      }).then(done, done)
    })
  })
})