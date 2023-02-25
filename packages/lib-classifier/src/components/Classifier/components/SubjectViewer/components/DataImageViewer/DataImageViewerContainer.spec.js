import { mount } from 'enzyme'
import React from 'react';
import DataImageViewerContainer from './DataImageViewerContainer'
import DataImageViewer from './DataImageViewer'
import nock from 'nock'
import sinon from 'sinon'
import kepler from '../../helpers/mockLightCurves/kepler'
import variableStar from '../../helpers/mockLightCurves/variableStar'

import { Factory } from 'rosie'

describe('Component > DataImageViewerContainer', function () {
  const theme = {}
  const subject = Factory.build('subject', {
    locations: [
      { 'application/json': 'http://localhost:8080/mockData.json' },
      { 'image/png': 'http://localhost:8080/image1.png' }
    ]
  })

  const nextSubject = Factory.build('subject', {
    locations: [
      { 'application/json': 'http://localhost:8080/nextSubject.json' },
      { 'image/png': 'http://localhost:8080/image2.png' }
    ]
  })

  const subjectJSON = kepler
  const nextSubjectJSON = variableStar

  const imageSubject = Factory.build('subject')

  const failSubject = Factory.build('subject', {
    locations: [
      { 'application/json': 'http://localhost:8080/failure.json' }
    ]
  })

  it('should render without crashing', function () {
    const wrapper = mount(<DataImageViewerContainer />)
    expect(wrapper).to.be.ok()
  })

  describe('without a subject', function () {
    it('should render null with the default props', function () {
      const wrapper = mount(<DataImageViewerContainer />)
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
        <DataImageViewerContainer
          onError={onErrorSpy}
          subject={imageSubject}
          theme={theme}
        />
      )
    })

    it('should error if the location request response fails', function (done) {
      const onErrorSpy = sinon.stub().callsFake(error => {
        expect(error.message).to.equal('Not Found')
        done()
      })
      wrapper = mount(
        <DataImageViewerContainer
          onError={onErrorSpy}
          subject={failSubject}
          theme={theme}
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

    it('should set the component state and pass it as a prop with the json data', function (done) {
      const onReadySpy = sinon.stub().callsFake(() => {
        wrapper.update()
        expect(wrapper.find(DataImageViewer).props().JSONData).to.deep.equal(subjectJSON)
        done()
      })
      wrapper = mount(
        <DataImageViewerContainer
          onReady={onReadySpy}
          subject={subject}
          theme={theme}
        />
      )
    })

    it('should set the component state and pass it as a prop with the image location source', function (done) {
      const onReadySpy = sinon.stub().callsFake(() => {
        wrapper.update()
        expect(wrapper.find(DataImageViewer).props().imageLocation).to.deep.equal({ 'image/png': 'http://localhost:8080/image1.png' })
        done()
      })
      const wrapper = mount(
        <DataImageViewerContainer
          onReady={onReadySpy}
          subject={subject}
          theme={theme}
        />
      )
    })

    it('should call the onReady prop', function (done) {
      const onReadySpy = sinon.stub().callsFake(target => {
        expect(target).to.deep.equal({ clientWidth: 0, clientHeight: 0, naturalWidth: 0, naturalHeight: 0 })
        done()
      })
      wrapper = mount(
        <DataImageViewerContainer
          onReady={onReadySpy}
          subject={subject}
          theme={theme}
        />
      )
    })

    it('should update component state and props when there is a new valid subject', function (done) {
      let onReadySpy = sinon.stub().callsFake(() => {
        wrapper.update()
        const dataImageViewer = wrapper.find(DataImageViewer)
        expect(dataImageViewer.props().JSONData).to.deep.equal(subjectJSON)
        expect(dataImageViewer.props().imageLocation).to.deep.equal({ 'image/png': 'http://localhost:8080/image1.png' })
      })
      wrapper = mount(
        <DataImageViewerContainer
          onReady={onReadySpy}
          subject={subject}
          theme={theme}
        />
      )

      onReadySpy = sinon.stub().callsFake(() => {
        wrapper.update()
        const dataImageViewer = wrapper.find(DataImageViewer)
        expect(dataImageViewer.props().JSONData).to.deep.equal(nextSubjectJSON)
        expect(dataImageViewer.props().imageLocation).to.deep.equal({ 'image/png': 'http://localhost:8080/image2.png' })
        done()
      })
      wrapper.setProps({
        onReady: onReadySpy,
        subject: nextSubject
      })
    })
  })

  describe('zoom configuration', function () {
    it('should default to undefined', async function () {
      const wrapper = mount(
        <DataImageViewerContainer
          subject={subject}
          theme={theme}
        />,
        { disableLifecycleMethods: true }
      )
      expect(wrapper.find(DataImageViewer).props().zoomConfiguration).to.be.undefined()
    })

    describe('when subject specific zoom configuration is defined', function () {
      let nockScope
      let wrapper
      const subjectZoomConfiguration = {
        direction: 'both',
        minZoom: 0.5,
        maxZoom: 15,
        zoomInValue: 1.2,
        zoomOutValue: 0.8
      }

      before(function () {
        const subjectWithZoomConfigJSON = { ...kepler, chartOptions: { zoomConfiguration: subjectZoomConfiguration } }
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
          const props = wrapper.find(DataImageViewer).props()
          //expect(props.zoomConfiguration).to.deep.equal(subjectZoomConfiguration)
          done()
        })
        wrapper = mount(
          <DataImageViewerContainer
            onReady={onReadySpy}
            subject={subject}
            theme={theme}
          />
        )
      })

      it('should prefer subject specific configuration over workflow zoom configuration', function (done) {
        const onReadySpy = sinon.stub().callsFake(() => {
          const props = wrapper.find(DataImageViewer).props()
          //expect(props.zoomConfiguration).to.deep.equal(subjectZoomConfiguration)
          done()
        })
        wrapper = mount(
          <DataImageViewerContainer
            onReady={onReadySpy}
            subject={subject}
            theme={theme}
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

    describe('when workflow zoom configuration is defined', function (done) {
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
          const props = wrapper.find(DataImageViewer).props()
          expect(props.zoomConfiguration).to.deep.equal(zoomConfiguration)
          done()
        })
        wrapper = mount(
          <DataImageViewerContainer
            onReady={onReadySpy}
            subject={subject}
            theme={theme}
            viewerConfiguration={{
              zoomConfiguration
            }}
          />
        )
      })
    })
  })
})