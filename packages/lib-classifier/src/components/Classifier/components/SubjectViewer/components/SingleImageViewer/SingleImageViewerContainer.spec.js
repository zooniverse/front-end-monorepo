import { mount } from 'enzyme'
import { Provider } from 'mobx-react'
import sinon from 'sinon'
import React from 'react'
import asyncStates from '@zooniverse/async-states'

import mockStore from '@test/mockStore'
import { DraggableImage } from '../SVGComponents/SVGImage'
import SingleImageViewer from './SingleImageViewer'
import { SingleImageViewerContainer } from './SingleImageViewerContainer'

describe('Component > SingleImageViewerContainer', function () {
  let wrapper
  const height = 200
  const width = 400
  const DELAY = 100
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
      wrapper = mount(<SingleImageViewerContainer onError={onError} />)
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

    before(function (done) {
      sinon.replace(window, 'Image', ValidImage)
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
          { 'image/jpeg': 'https://some.domain/image.jpg' }
        ],
        metadata: {
          default_frame: "0"
        }
      }
      const classifierStore = mockStore({ subject })
      wrapper = mount(
        <SingleImageViewerContainer
          enableInteractionLayer={false}
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

    after(function () {
      sinon.restore()
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
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
  })

  describe('with an invalid subject', function () {
    let imageWrapper
    const onReady = sinon.stub()
    const onError = sinon.stub()

    before(function (done) {
      sinon.replace(window, 'Image', InvalidImage)
      sinon.stub(console, 'error')
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
          { 'image/jpeg': 'this is not a URL' }
        ]
      }
      wrapper = mount(
        <SingleImageViewerContainer
          subject={subject}
          onError={onError}
          onReady={onReady}
        />
      )
    })

    after(function () {
      sinon.restore()
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should log an error from an invalid image', function () {
      expect(onError.withArgs(HTMLImgError)).to.have.been.calledOnce()
    })

    it('should not call onReady', function () {
      expect(onReady).to.not.have.been.called()
    })
  })
})
