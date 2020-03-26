import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import React from 'react'

import { SubjectGroupViewerContainer } from './SubjectGroupViewerContainer'
import SubjectGroupViewer from './SubjectGroupViewer'

describe.only('Component > SubjectGroupViewerContainer', function () {
  let wrapper
  
  const cellHeight = 80
  const cellWidth = 60
  const gridColumns = 3
  const gridRows = 2
  
  const imageHeight = 200
  const imageWidth = 400
  
  const DELAY = 100
  const HTMLImgError = {
    message: 'The HTML img did not load'
  }

  // mock an image that loads after a delay of 0.1s
  class ValidImage {
    constructor () {
      this.naturalHeight = imageHeight
      this.naturalWidth = imageWidth
      setTimeout(() => this.onload(), DELAY)
    }
  }

  // mock an image that errors after a delay of 0.1s
  class InvalidImage {
    constructor () {
      this.naturalHeight = imageHeight
      this.naturalWidth = imageWidth
      setTimeout(() => this.onerror(HTMLImgError), DELAY)
    }
  }

  describe('without a subject', function () {
    const onError = sinon.stub()

    before(function () {
      wrapper = shallow(<SubjectGroupViewerContainer onError={onError} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render null', function () {
      expect(wrapper.type()).to.be.null()
    })
  })

  describe('with a valid subject', function () {
    let groupWrapper
    const onReady = sinon.stub()
    const onError = sinon.stub()

    beforeEach(function () {
      const subject = {
        id: 'test',
        locations: [
          { 'image/jpeg': 'https://some.domain/image.jpg' },
          { 'image/jpeg': 'https://some.domain/image.jpg' },
          { 'image/jpeg': 'https://some.domain/image.jpg' },
          { 'image/jpeg': 'https://some.domain/image.jpg' },
          { 'image/jpeg': 'https://some.domain/image.jpg' },
          { 'image/jpeg': 'https://some.domain/image.jpg' },
        ],
        metadata: {
          default_frame: "0"
        }
      }
      wrapper = shallow(
        <SubjectGroupViewerContainer
          ImageObject={ValidImage}
          subject={subject}
          onError={onError}
          onReady={onReady}
          cellHeight={cellHeight}
          cellWidth={cellWidth}
          gridColumns={gridColumns}
          gridRows={gridRows}
          setOnZoom={() => {}}
          setOnPan={() => {}}
        />
      )
  
      groupWrapper = wrapper.find(SubjectGroupViewer)
      wrapper.instance().groupViewer = {
        current: {
          clientHeight: 600,
          clientWidth: 800,
          addEventListener: sinon.stub(),
          getBoundingClientRect: sinon.stub().callsFake(() => ({ width: 800, height: 600 })),
          removeEventListener: sinon.stub()
        }
      }
    })

    afterEach(function () {
      onReady.resetHistory()
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render an svg image', function (done) {
      // TODO
      
      console.log('--------')
      console.log(wrapper.debug())
      console.log('--------')
      
    })
  })

  describe('with an invalid subject', function () {
    let groupWrapper
    const onReady = sinon.stub()
    const onError = sinon.stub()

    before(function () {
      sinon.stub(console, 'error')
    })

    beforeEach(function () {
      const subject = {
        id: 'test',
        locations: [
          { 'image/jpeg': '' }
        ]
      }
      wrapper = mount(
        <SubjectGroupViewerContainer
          ImageObject={InvalidImage}
          subject={subject}
          onError={onError}
          onReady={onReady}
          cellHeight={cellHeight}
          cellWidth={cellWidth}
          gridColumns={gridColumns}
          gridRows={gridRows}
          setOnZoom={() => {}}
          setOnPan={() => {}}
        />
      )
  
      groupWrapper = wrapper.find(SubjectGroupViewer)
      wrapper.instance().groupViewer = {
        current: {
          clientHeight: 600,
          clientWidth: 800,
          addEventListener: sinon.stub(),
          getBoundingClientRect: sinon.stub().callsFake(() => ({ width: 800, height: 600 })),
          removeEventListener: sinon.stub()
        }
      }
    })

    afterEach(function () {
      onError.resetHistory()
      onReady.resetHistory()
    })

    after(function () {
      console.error.restore()
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should log an error from an invalid image', function (done) {
      const fakeEvent = {
        target: {
          clientHeight: 0,
          clientWidth: 0
        }
      }
      onError.callsFake(function () {
        expect(onError.withArgs(HTMLImgError)).to.have.been.calledOnce()
        done()
      })
    })

    it('should not call onReady', function (done) {
      onError.callsFake(function () {
        expect(onReady).to.not.have.been.called()
        done()
      })
    })
  })
})
