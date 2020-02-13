import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'

import { MultiFrameViewerContainer } from './MultiFrameViewerContainer'
import FrameCarousel from './FrameCarousel'
import SingleImageViewer from '../SingleImageViewer/SingleImageViewer'

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

    beforeEach(function () {
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
          frame={0}
          ImageObject={ValidImage}
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
      onReady.resetHistory()
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render the FrameCarousel', function (done) {
      onReady.callsFake(function () {
        expect(wrapper.find(FrameCarousel)).to.have.lengthOf(1)
        done()
      })
    })

    it('should record the original image dimensions on load', function (done) {
      const svg = wrapper.instance().imageViewer.current
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
      onReady.callsFake(function () {
        expect(onReady).to.have.been.calledOnceWith(expectedEvent)
        expect(onError).to.not.have.been.called()
        done()
      })
    })

    it('should pass the original image dimensions to the SVG image', function (done) {
      const svg = wrapper.instance().imageViewer.current
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
      onReady.callsFake(function () {
        const { height, width } = wrapper.find(SingleImageViewer).props()
        expect(height).to.equal(height)
        expect(width).to.equal(width)
        done()
      })
    })

    it('should render an svg image', function (done) {
      const svg = wrapper.instance().imageViewer.current
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
      onReady.callsFake(function () {
        const image = wrapper.find('draggable(image)')
        expect(image).to.have.lengthOf(1)
        expect(image.prop('xlinkHref')).to.equal('https://some.domain/image.jpg')
        done()
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

    beforeEach(function () {
      const subject = {
        id: 'test',
        locations: [
          { 'image/jpeg': '' }
        ]
      }
      wrapper = shallow(
        <MultiFrameViewerContainer
          frame={0}
          ImageObject={InvalidImage}
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

  describe('with pan and zoom', function () {
    const onError = sinon.stub()
    const onReady = sinon.stub()
    let onPan
    let onZoom

    beforeEach(function () {
      const subject = {
        id: 'test',
        locations: [
          { 'image/jpeg': 'https://some.domain/image.jpg' },
          { 'image/jpeg': 'https://some.domain/image.jpg' }
        ]
      }
      wrapper = shallow(
        <MultiFrameViewerContainer
          frame={0}
          ImageObject={ValidImage}
          subject={subject}
          onError={onError}
          onReady={onReady}
          setOnPan={callback => { onPan = callback }}
          setOnZoom={callback => { onZoom = callback }}
        />
      )
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

    it('should enable zoom in', function (done) {
      onReady.callsFake(function () {
        onZoom('zoomin', 1)
        const viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
        expect(viewBox).to.equal('18.5 9.5 363 181')
        done()
      })
    })

    it('should enable zoom out', function (done) {
      onReady.callsFake(function () {
        onZoom('zoomin', 1)
        let viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
        expect(viewBox).to.equal('18.5 9.5 363 181')
        onZoom('zoomout', -1)
        viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
        expect(viewBox).to.equal('0 0 400 200')
        done()
      })
    })

    it('should enable horizontal panning', function (done) {
      onReady.callsFake(function () {
        onPan(-1, 0)
        const viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
        expect(viewBox).to.equal('10 0 400 200')
        done()
      })
    })

    it('should enable vertical panning', function (done) {
      onReady.callsFake(function () {
        onPan(0, -1)
        const viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
        expect(viewBox).to.equal('0 -10 400 200')
        done()
      })
    })

    it('should should pan horizontally on drag', function (done) {
      onReady.callsFake(function () {
        const dragMove = wrapper.find('draggable(image)').prop('dragMove')
        dragMove({}, { x: -15, y: 0 })
        const viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
        expect(viewBox).to.equal('10 0 400 200')
        done()
      })
    })

    it('should should pan vertically on drag', function (done) {
      onReady.callsFake(function () {
        const dragMove = wrapper.find('draggable(image)').prop('dragMove')
        dragMove({}, { x: 0, y: -15 })
        const viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
        expect(viewBox).to.equal('0 10 400 200')
        done()
      })
    })

    it('should should zoom out on wheel scroll up', function (done) {
      onReady.callsFake(function () {
        const { onWheel } = wrapper.instance()
        onWheel({ deltaY: 10, preventDefault: sinon.stub() })
        let viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
        expect(viewBox).to.equal('18.5 9.5 363 181')
        onWheel({ deltaY: -10, preventDefault: sinon.stub() })
        viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
        expect(viewBox).to.equal('0 0 400 200')
        done()
      })
    })

    it('should should zoom in on wheel scroll down', function (done) {
      onReady.callsFake(function () {
        const { onWheel } = wrapper.instance()
        let viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
        expect(viewBox).to.equal('0 0 400 200')
        onWheel({ deltaY: 10, preventDefault: sinon.stub() })
        viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
        expect(viewBox).to.equal('18.5 9.5 363 181')
        done()
      })
    })
  })
})
