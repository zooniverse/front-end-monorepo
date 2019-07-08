import asyncStates from '@zooniverse/async-states'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'

import SingleImageViewerContainer from './SingleImageViewerContainer'
import SingleImageViewer from './SingleImageViewer'

describe('Component > SingleImageViewerContainer', function () {
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

  before(function () {
    sinon.stub(console, 'error')
  })

  after(function () {
    console.error.restore()
  })

  describe('without a subject', function () {
    const onError = sinon.stub()

    before(function () {
      wrapper = shallow(<SingleImageViewerContainer onError={onError} />)
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

    before(function () {
      const subject = {
        id: 'test',
        locations: [
          { 'image/jpeg': 'https://some.domain/image.jpg' }
        ]
      }
      wrapper = shallow(
        <SingleImageViewerContainer
          ImageObject={ValidImage}
          subject={subject}
          onError={onError}
          onReady={onReady}
        />
      )
      imageWrapper = wrapper.find(SingleImageViewer)
      wrapper.instance().imageViewer = {
        current: {
          clientHeight: 100,
          clientWidth: 200
        }
      }
    })

    afterEach(function () {
      onReady.resetHistory()
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
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
      imageWrapper.simulate('load', fakeEvent)
    })
  })

  describe('with an invalid subject', function () {
    let imageWrapper
    const onReady = sinon.stub()
    const onError = sinon.stub()

    before(function () {
      const subject = {
        id: 'test',
        locations: [
          { 'image/jpeg': '' }
        ]
      }
      wrapper = shallow(
        <SingleImageViewerContainer
          ImageObject={InvalidImage}
          subject={subject}
          onError={onError}
          onReady={onReady}
        />
      )
      imageWrapper = wrapper.find(SingleImageViewer)
      wrapper.instance().imageViewer = {
        current: {
          clientHeight: 100,
          clientWidth: 200
        }
      }
    })

    after(function () {
      onError.resetHistory()
      onReady.resetHistory()
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should log an error from an invalid SVG image', function (done) {
      const fakeSVGError = {
        message: 'the SVG image failed to load'
      }
      onError.callsFake(function () {
        expect(onError.withArgs(fakeSVGError)).to.have.been.calledOnce
        done()
      })
      imageWrapper.simulate('error', fakeSVGError)
    })

    it('should log an error from an invalid HTML img', function (done) {
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
      imageWrapper.simulate('load', fakeEvent)
    })

    it('should not call onReady', function (done) {
      const fakeSVGError = {
        message: 'the SVG image failed to load'
      }
      onError.callsFake(function () {
        expect(onReady).to.not.have.been.called()
        done()
      })
      imageWrapper.simulate('error', fakeSVGError)
    })
  })
})
