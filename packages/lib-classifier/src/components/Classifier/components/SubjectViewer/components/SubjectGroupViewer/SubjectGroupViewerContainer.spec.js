import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'

import { DraggableImage, SubjectGroupViewerContainer } from './SubjectGroupViewerContainer'
import SubjectGroupViewer from './SubjectGroupViewer'

describe('Component > SubjectGroupViewerContainer', function () {
  let wrapper

  const cellWidth = 200
  const cellHeight = 160
  const gridColumns = 3
  const gridRows = 2
  
  const imageHeight = 500
  const imageWidth = 400
  const DELAY = 0
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

    beforeEach(function (done) {
      onReady.callsFake(() => done())
      onError.callsFake(() => done())
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
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          gridColumns={gridColumns}
          gridRows={gridRows}
        />
      )
      groupWrapper = wrapper.find(SubjectGroupViewer)
      wrapper.instance().groupViewer = {
        current: {
          clientHeight: 50,
          clientWidth: 100,
          addEventListener: sinon.stub(),
          getBoundingClientRect: sinon.stub().callsFake(() => ({ width: 100, height: 50 })),
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

    it('should render a SubjectGroupViewer', function () {
      expect(wrapper.find(SubjectGroupViewer)).to.have.lengthOf(1)
    })
    
    it('should pass the correct number of images to the SubjectGroupViewer', function () {
      expect(wrapper.find(SubjectGroupViewer).prop('images')).to.have.lengthOf(6)
    })
  })

  describe('with an invalid subject', function () {
    let groupWrapper
    const onReady = sinon.stub()
    const onError = sinon.stub()

    before(function () {
      sinon.stub(console, 'error')
    })

    beforeEach(function (done) {
      onReady.callsFake(() => done())
      onError.callsFake(() => done())
      const subject = {
        id: 'test',
        locations: [
          { 'image/jpeg': '' }
        ]
      }
      wrapper = shallow(
        <SubjectGroupViewerContainer
          ImageObject={InvalidImage}
          subject={subject}
          onError={onError}
          onReady={onReady}
        />
      )
      groupWrapper = wrapper.find(SubjectGroupViewer)
      wrapper.instance().groupViewer = {
        current: {
          clientHeight: 50,
          clientWidth: 100,
          addEventListener: sinon.stub(),
          getBoundingClientRect: sinon.stub().callsFake(() => ({ width: 100, height: 50 })),
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

    it('should log an error from an invalid image', function () {
      const fakeEvent = {
        target: {
          clientHeight: 0,
          clientWidth: 0
        }
      }
      expect(onError.withArgs(HTMLImgError)).to.have.been.calledOnce()
    })

    it('should not call onReady', function () {
      expect(onReady).to.not.have.been.called()
    })
  })
})