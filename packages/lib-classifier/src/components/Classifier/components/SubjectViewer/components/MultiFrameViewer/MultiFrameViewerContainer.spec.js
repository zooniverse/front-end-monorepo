import { mount } from 'enzyme'
import { Provider } from 'mobx-react'
import sinon from 'sinon'
import React from 'react'
import asyncStates from '@zooniverse/async-states'

import mockStore from '@test/mockStore'
import TranscriptionLineTool from '@plugins/drawingTools/experimental/models/tools/TranscriptionLineTool/TranscriptionLineTool'
import { DraggableImage } from '../SVGComponents/SVGImage'
import SingleImageViewer from '../SingleImageViewer/SingleImageViewer'
import FrameCarousel from './FrameCarousel'
import { MultiFrameViewerContainer } from './MultiFrameViewerContainer'

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
      wrapper = mount(<MultiFrameViewerContainer onError={onError} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render null', function () {
      expect(wrapper.html()).to.be.null()
    })
  })

  describe('with a valid subject', function () {
    let imageWrapper
    const onReady = sinon.stub()
    const onError = sinon.stub()

    beforeEach(function (done) {
      onReady.callsFake(() => {
        imageWrapper = wrapper.find(SingleImageViewer)
        done()
      })
      onError.callsFake(() => {
        imageWrapper = wrapper.find(SingleImageViewer)
        done()
      })
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
      const classifierStore = mockStore({ subject })
      wrapper = mount(
        <MultiFrameViewerContainer
          enableInteractionLayer={false}
          ImageObject={ValidImage}
          loadingState={asyncStates.success}
          subject={subject}
          onError={onError}
          onReady={onReady}
        />,
        {
          wrappingComponent: Provider,
          wrappingComponentProps: classifierStore
        }
      )
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
      const expectedEvent = {
        target: {
          clientHeight: 0,
          clientWidth: 0,
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
      wrapper.update()
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

    describe('with invalid marks', function () {
      // mock an active transcription task tool:
      const activeTool = TranscriptionLineTool.create({
        color: '#ff0000',
        type: 'transcriptionLine'
      })

      // add a valid first mark:
      const pointerEvent = { x: 10, y: 10 }
      const validMark = activeTool.createMark({ x: 0, y: 0 })
      activeTool.handlePointerDown(pointerEvent, validMark)

      // add an invalid second mark (start, but don't finish a line):
      activeTool.createMark({ x: 15, y: 15 })

      it('should delete invalid marks on frame change', function () {
        wrapper.setProps({ activeTool })
        expect(activeTool.marks.size).to.equal(2)

        wrapper.setProps({ frame: 1 })
        expect(activeTool.marks.size).to.equal(1)
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
      onReady.callsFake(() => {
        imageWrapper = wrapper.find(SingleImageViewer)
        done()
      })
      onError.callsFake(() => {
        imageWrapper = wrapper.find(SingleImageViewer)
        done()
      })
      const subject = {
        id: 'test',
        locations: [
          { 'image/jpeg': 'this is not an image URL' }
        ]
      }
      wrapper = mount(
        <MultiFrameViewerContainer
          enableInteractionLayer={false}
          ImageObject={InvalidImage}
          loadingState={asyncStates.success}
          subject={subject}
          onError={onError}
          onReady={onReady}
        />
      )
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
