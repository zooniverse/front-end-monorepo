import { mount } from 'enzyme'
import React from 'react';
import nock from 'nock'
import sinon from 'sinon'

import ScatterPlotViewerContainer from './ScatterPlotViewerContainer'
import ScatterPlotViewer from './ScatterPlotViewer'
import { dataSeriesWithXErrors, keplerMockDataWithOptions } from './helpers/mockData'

import { Factory } from 'rosie'



describe('Component > ScatterPlotViewerContainer', function () {
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

  it('should render without crashing', function () {
    const wrapper = mount(<ScatterPlotViewerContainer />)
    expect(wrapper).to.be.ok()
  })

  describe('without a subject', function () {
    it('should render null with the default props', function () {
      const wrapper = mount(<ScatterPlotViewerContainer />)
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
      const onErrorSpy = sinon.stub().callsFake(error => {
        expect(error.message).to.equal('No JSON url found for this subject')
        done()
      })
      wrapper = mount(
        <ScatterPlotViewerContainer
          onError={onErrorSpy}
          subject={imageSubject}
        />
      )
    })

    it('should error if the location request response fails', function (done) {
      const onErrorSpy = sinon.stub().callsFake(error => {
        expect(error.message).to.equal('Not Found')
        done()
      })
      wrapper = mount(
        <ScatterPlotViewerContainer
          onError={onErrorSpy}
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

    it('should call the onReady prop', function (done) {
      const onReadySpy = sinon.stub().callsFake(target => {
        expect(target).to.deep.equal({ clientWidth: undefined, clientHeight: undefined, naturalWidth: 0, naturalHeight: 0 })
        done()
      })
      wrapper = mount(
        <ScatterPlotViewerContainer
          onReady={onReadySpy}
          subject={subject}
        />
      )
    })

    it('should update component state and pass as props when there is a new valid subject', function (done) {
      let onReadySpy = sinon.stub(target => {
        wrapper.update()
        const scatterPlotViewerProps = wrapper.find(ScatterPlotViewer).props()
        const { data, chartOptions } = subjectJSON
        expect(scatterPlotViewerProps.data).to.deep.equal(data)
        expect(scatterPlotViewerProps.margin).to.deep.equal(chartOptions.margin)
        expect(scatterPlotViewerProps.padding).to.deep.equal(chartOptions.padding)
        expect(scatterPlotViewerProps.xAxisLabel).to.equal(chartOptions.xAxisLabel)
        expect(scatterPlotViewerProps.xAxisLabelOffset).to.equal(chartOptions.xAxisLabelOffset)
        expect(scatterPlotViewerProps.yAxisLabel).to.equal(chartOptions.yAxisLabel)
        expect(scatterPlotViewerProps.yAxisLabelOffset).to.equal(chartOptions.yAxisLabelOffset)
        advanceSubject()
      })
      wrapper = mount(
        <ScatterPlotViewerContainer
          onError={error => {
            console.log(error)
            throw error
          }}
          onReady={onReadySpy}
          subject={subject}
        />
      )

      function advanceSubject() {
        onReadySpy = sinon.stub(target => {
          wrapper.update()
          const scatterPlotViewerProps = wrapper.find(ScatterPlotViewer).props()
          // example subject missing chart options. 
          // We set the state to be structured in the expected way
          // undefined options are passed and
          // child component falls back to default props so viewer can still render
          expect(scatterPlotViewerProps.data).to.deep.equal(nextSubjectJSON.data)
          expect(scatterPlotViewerProps.margin).to.be.undefined()
          expect(scatterPlotViewerProps.padding).to.be.undefined()
          expect(scatterPlotViewerProps.xAxisLabel).to.be.undefined()
          expect(scatterPlotViewerProps.xAxisLabelOffset).to.be.undefined()
          expect(scatterPlotViewerProps.yAxisLabel).to.be.undefined()
          expect(scatterPlotViewerProps.yAxisLabelOffset).to.be.undefined()
          done()
        })
        wrapper.setProps({
          onReady: onReadySpy,
          subject: nextSubject
        })
      }
    })
  })

  describe('zoom configuration', function () {
    it('should default to undefined', async function () {
      const wrapper = mount(
        <ScatterPlotViewerContainer
          subject={subject}
        />
      )
      expect(wrapper.find(ScatterPlotViewer).props().zoomConfiguration).to.be.undefined()
    })

    describe('when subject specific zoom configuration is defined', function () {
      let nockScope
      let wrapper
      const subjectZoomConfiguration =  {
        direction: 'both',
        minZoom: 0.5,
        maxZoom: 15,
        zoomInValue: 1.2,
        zoomOutValue: 0.8
      }

      before(function () {
        const subjectWithZoomConfigJSON = { 
          ...keplerMockDataWithOptions,
          chartOptions: { zoomConfiguration:  subjectZoomConfiguration }
        }
        nockScope = nock('http://localhost:8080')
          .persist(true)
          .get('/mockData.json')
          .reply(200, subjectWithZoomConfigJSON)
      })

      after(function () {
        nock.cleanAll()
        nockScope.persist(false)
      })

      it('should pass the configuration as a prop', function (done) {
        const onReadySpy = sinon.stub().callsFake(() => {
          wrapper.update()
          const props = wrapper.find(ScatterPlotViewer).props()
          expect(props.zoomConfiguration).to.deep.equal(subjectZoomConfiguration)
          done()
        })
        wrapper = mount(
          <ScatterPlotViewerContainer
            onReady={onReadySpy}
            subject={subject}
          />
        )
      })

      it('should prefer subject specific configuration over workflow zoom configuration', function (done) {
        const onReadySpy = sinon.stub().callsFake(() => {
          wrapper.update()
          const props = wrapper.find(ScatterPlotViewer).props()
          expect(props.zoomConfiguration).to.deep.equal(subjectZoomConfiguration)
          done()
        })
        wrapper = mount(
          <ScatterPlotViewerContainer
            onReady={onReadySpy}
            subject={subject}
            viewerConfiguration={{
              zoomConfiguration: {
                direction: 'x',
                minZoom: 1,
                maxZoom: 10,
                zoomInValue: 1.2,
                zoomOutValue: 0.8
              }
            }}
          />
        )
      })
    })

    describe('when workflow zoom configuration is defined', function () {
      let nockScope
      let wrapper

      before(function () {
        nockScope = nock('http://localhost:8080')
          .persist(true)
          .get('/mockData.json')
          .reply(200, subjectJSON)
      })

      after(function () {
        nock.cleanAll()
        nockScope.persist(false)
      })

      it('should pass the configuration as a prop', function (done) {
        const zoomConfiguration = {
          direction: 'x',
          minZoom: 1,
          maxZoom: 10,
          zoomInValue: 1.2,
          zoomOutValue: 0.8
        }
        const onReadySpy = sinon.stub().callsFake(() => {
          wrapper.update()
          const props = wrapper.find(ScatterPlotViewer).props()
          expect(props.zoomConfiguration).to.deep.equal(zoomConfiguration)
          done()
        })
        wrapper = mount(
          <ScatterPlotViewerContainer
            onReady={onReadySpy}
            subject={subject}
            viewerConfiguration={{
              zoomConfiguration
            }}
          />
        )
      })
    })
  })
})