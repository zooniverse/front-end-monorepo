import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'

import { DraggableImage, MultiFrameViewerContainer } from './MultiFrameViewerContainer'
import FrameCarousel from './FrameCarousel'
import SingleImageViewer from '../SingleImageViewer/SingleImageViewer'
import asyncStates from '@zooniverse/async-states'

describe('Component > MultiFrameViewerContainer', function () {
  let wrapper
  const height = 200
  const width = 400
  const DELAY = 0
  const HTMLImgError = {
    message: 'The HTML img did not load'
  }

  // mock an image that loads after a delay of 0.1s
  class ValidImage {
    constructor () {
      this.naturalHeight = height
      this.naturalWidth = width
      setTimeout(() => this.onload(), DELAY)
    }
  }

  // mock an image that errors after a delay of 0.1s
  class InvalidImage {
    constructor () {
      this.naturalHeight = height
      this.naturalWidth = width
      setTimeout(() => this.onerror(HTMLImgError), DELAY)
    }
  }

  describe('without a subject', function () {
    const onError = sinon.stub()

    before(function () {
      wrapper = shallow(<MultiFrameViewerContainer onError={onError} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render null', function () {
      expect(wrapper.type()).to.be.null()
    })
  })

  describe('with a valid subject', function () {
    let imageWrapper
    const onReady = sinon.stub()
    const onError = sinon.stub()

    beforeEach(function (done) {
      onReady.callsFake(() => done())
      onError.callsFake(() => done())
      const subject = {
        id: 'test',
        locations: [
          { 'image/jpeg': 'https://some.domain/image.jpg' },
          { 'image/jpeg': 'https://some.domain/image.jpg' }
        ],
        metadata: {
          default_frame: 1
        }
      }
      wrapper = shallow(
        <MultiFrameViewerContainer
          ImageObject={ValidImage}
          loadingState={asyncStates.success}
          subject={subject}
          onError={onError}
          onReady={onReady}
        />
      )
      imageWrapper = wrapper.find(SingleImageViewer)
      wrapper.instance().subjectImage = {
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

    it('should render the FrameCarousel', function () {
      expect(wrapper.find(FrameCarousel)).to.have.lengthOf(1)
    })

    it('should record the original image dimensions on load', function () {
      const svg = wrapper.instance().subjectImage.current
      const fakeEvent = {
        target: {
          clientHeight: 0,
          clientWidth: 0
        }
      }
      const expectedEvent = {
        target: {
          clientHeight: svg.clientHeight,
          clientWidth: svg.clientWidth,
          naturalHeight: height,
          naturalWidth: width
        }
      }
      expect(onReady).to.have.been.calledOnceWith(expectedEvent)
      expect(onError).to.not.have.been.called()
    })

    it('should pass the original image dimensions to the SVG image', function () {
      const { height, width } = wrapper.find(SingleImageViewer).props()
      expect(height).to.equal(height)
      expect(width).to.equal(width)
    })

    it('should render an svg image', function () {
      const image = wrapper.find('image')
      expect(image).to.have.lengthOf(1)
      expect(image.prop('xlinkHref')).to.equal('https://some.domain/image.jpg')
    })

    describe('with dragging enabled', function () {
      it('should render a draggable image', function () {
        wrapper.setProps({ move: true })
        const image = wrapper.find(DraggableImage)
        expect(image).to.have.lengthOf(1)
        expect(image.prop('xlinkHref')).to.equal('https://some.domain/image.jpg')
      })
    })

    describe('with marks from an active drawing or transcription task tool', function () {
      const validateSpy = sinon.spy()

      // testMarks is a generic Map, does not represent actual marks from a task tool
      const testMarks = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three']
      ])

      // mock an active drawing or transcription task tool:
      const activeTool = {
        marks: testMarks,
        validate: validateSpy
      }

      it('should validate active tool marks on frame change', function () {
        wrapper.setProps({ activeTool })
        wrapper.instance().onFrameChange(2)
        expect(validateSpy).to.have.been.calledOnce()
      })
    })
  })

  describe('with an invalid subject', function () {
    let imageWrapper
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
        <MultiFrameViewerContainer
          ImageObject={InvalidImage}
          loadingState={asyncStates.success}
          subject={subject}
          onError={onError}
          onReady={onReady}
        />
      )
      imageWrapper = wrapper.find(SingleImageViewer)
      wrapper.instance().imageViewer = {
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
