import { mount } from 'enzyme'
import nock from 'nock'
import sinon from 'sinon'

import { BarChartViewerContainer } from './BarChartViewerContainer'
import BarChartViewer from './BarChartViewer'
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
    const wrapper = mount(<BarChartViewerContainer />)
    expect(wrapper).to.be.ok()
  })

  describe('without a subject', function () {
    it('should render null with the default props', function () {
      const wrapper = mount(<BarChartViewerContainer />)
      expect(wrapper.html()).to.be.null()
    })
  })

  describe('with an invalid subject', function () {
    let nockScope
    let wrapper
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

    it('should error if a json subject location file can\'t be found', function (done) {
      const onError = sinon.stub().callsFake((error) => {
        expect(error.message).to.equal('No JSON url found for this subject')
        done()
      })
      const onReady = sinon.stub().callsFake(() => {
        expect.fail('should not call onReady')
        done()
      })
      wrapper = mount(
        <BarChartViewerContainer
          onError={onError}
          onReady={onReady}
          subject={imageSubject}
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
        <BarChartViewerContainer
          onError={onError}
          onReady={onReady}
          subject={failSubject}
        />
      )
    })

    it('should render null', function (done) {
      const onError = sinon.stub().callsFake((error) => {
        expect(wrapper.html()).to.be.null()
        done()
      })
      const onReady = sinon.stub().callsFake(() => {
        expect.fail('should not call onReady')
        done()
      })
      wrapper = mount(
        <BarChartViewerContainer
          onError={onError}
          onReady={onReady}
          subject={failSubject}
        />
      )
    })
  })

  describe('with a subject', function () {
    let nockScope
    let wrapper

    before(function () {
      nockScope = nock('http://localhost:8080')
        .persist(true)
        .get('/mockData.json')
        .reply(200, subjectJSON)
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
        const bcv = wrapper.find(BarChartViewer)
        const { data, chartOptions } = subjectJSON
        const { margin, xAxisLabel, yAxisLabel } = chartOptions
      
        expect(bcv.props()).to.deep.equal({ data, margin, xAxisLabel, yAxisLabel })
        done()
      })
      const onError = sinon.stub().callsFake(() => {
        expect.fail('should not call onError')
        done()
      })
      wrapper = mount(
        <BarChartViewerContainer
          onError={onError}
          onReady={onReady}
          subject={subject}
        />
      )
    })

    it('should update subject data when there is a new valid subject', function (done) {
      const onError = sinon.stub().callsFake(() => {
        expect.fail('should not call onError')
        done()
      })
      wrapper = mount(
        <BarChartViewerContainer
          onError={onError}
          subject={subject}
        />
      )
      const onReady = sinon.stub().callsFake(() => {
        wrapper.update()
        const bcv = wrapper.find(BarChartViewer)
        const { data, chartOptions } = nextSubjectJSON
        const { margin, xAxisLabel, yAxisLabel } = chartOptions
      
        expect(bcv.props()).to.deep.equal({ data, margin, xAxisLabel, yAxisLabel })
        done()
      })
      wrapper.setProps({ onReady, subject: nextSubject })
    })
  })
})