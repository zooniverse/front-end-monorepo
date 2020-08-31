import { shallow, mount } from 'enzyme'
import React from 'react'
import DataImageViewerContainer from './DataImageViewerContainer'
import DataImageViewer from './DataImageViewer'
import nock from 'nock'
import sinon from 'sinon'
import kepler from '../../helpers/mockLightCurves/kepler'
import variableStar from '../../helpers/mockLightCurves/variableStar'

import { Factory } from 'rosie'

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

describe('Component > DataImageViewerContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<DataImageViewerContainer />)
    expect(wrapper).to.be.ok()
  })

  it('should initialize with the default state', function () {
    const wrapper = shallow(
      <DataImageViewerContainer />,
      { disableLifecycleMethods: true }
    )
    const mockState = {
      allowPanZoom: '',
      imageSrc: '',
      JSONData: {
        data: [],
        chartOptions: {}
      }
    }
    expect(wrapper.state()).to.eql(mockState)
  })

  describe('without a subject', function () {
    it('should render null with the default props', function () {
      const wrapper = shallow(<DataImageViewerContainer />)
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
      cdmSpy = sinon.spy(DataImageViewerContainer.prototype, 'componentDidMount')
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
        <DataImageViewerContainer
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
        <DataImageViewerContainer
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
      cdmSpy = sinon.spy(DataImageViewerContainer.prototype, 'componentDidMount')
      cduSpy = sinon.spy(DataImageViewerContainer.prototype, 'componentDidUpdate')
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

    it('should set the component state and pass it as a prop with the json data', function (done) {
      wrapper = shallow(
        <DataImageViewerContainer
          subject={subject}
        />
      )

      const mockInitialState = {
        data: [],
        chartOptions: {}
      }
      expect(wrapper.state().JSONData).to.deep.equal(mockInitialState)
      expect(wrapper.find(DataImageViewer).props().JSONData).to.deep.equal(mockInitialState)
      cdmSpy.returnValues[0].then(() => {
        expect(wrapper.state().JSONData).to.deep.equal(subjectJSON)
        expect(wrapper.find(DataImageViewer).props().JSONData).to.deep.equal(subjectJSON)
      }).then(done, done)
    })

    it('should set the component state and pass it as a prop with the image location source', function (done) {
      const wrapper = shallow(
        <DataImageViewerContainer
          subject={subject}
        />
      )

      expect(wrapper.state().imageSrc).to.be.empty()
      expect(wrapper.find(DataImageViewer).props().imageSrc).to.be.empty()
      cdmSpy.returnValues[0].then(() => {
        expect(wrapper.state().imageSrc).to.equal('http://localhost:8080/image1.png')
        expect(wrapper.find(DataImageViewer).props().imageSrc).to.equal('http://localhost:8080/image1.png')
      }).then(done, done)
    })

    it('should call the onReady prop', function (done) {
      const onReadySpy = sinon.spy()
      wrapper = shallow(
        <DataImageViewerContainer
          onReady={onReadySpy}
          subject={subject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        expect(onReadySpy).to.have.been.calledOnceWith({ target: wrapper.instance().viewer.current })
      }).then(done, done)
    })

    it('should update component state and props when there is a new valid subject', function (done) {
      wrapper = shallow(
        <DataImageViewerContainer
          subject={subject}
        />
      )

      cdmSpy.returnValues[0].then(() => {
        const dataImageViewer = wrapper.find(DataImageViewer)
        expect(wrapper.state().JSONData).to.deep.equal(subjectJSON)
        expect(wrapper.state().imageSrc).to.equal('http://localhost:8080/image1.png')
        expect(dataImageViewer.props().JSONData).to.deep.equal(subjectJSON)
        expect(dataImageViewer.props().imageSrc).to.equal('http://localhost:8080/image1.png')
      })
      wrapper.setProps({ subject: nextSubject })

      cduSpy.returnValues[0].then(() => {
        const dataImageViewer = wrapper.find(DataImageViewer)
        expect(wrapper.state().JSONData).to.deep.equal(nextSubjectJSON)
        expect(wrapper.state().imageSrc).to.equal('http://localhost:8080/image2.png')
        expect(dataImageViewer.props().JSONData).to.deep.equal(nextSubjectJSON)
        expect(dataImageViewer.props().imageSrc).to.equal('http://localhost:8080/image2.png')
      }).then(done, done)
    })
  })

  describe('setAllowPanZoom', function () {
    it('should set the allowPanZoom state when setAllowPanZoom is called', function () {
      const wrapper = shallow(
        <DataImageViewerContainer
          subject={subject}
        />
      )
      expect(wrapper.state().allowPanZoom).to.be.empty()
      wrapper.instance().setAllowPanZoom('image')
      expect(wrapper.state().allowPanZoom).to.equal('image')
    })
  })
})