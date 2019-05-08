import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'

import SingleImageViewerContainer from './SingleImageViewerContainer'
import SingleImageViewer from './SingleImageViewer'

describe('Component > SingleImageViewerContainer', function () {
  let wrapper
  const height = 200
  const width = 400

  // mock an image that loads after a delay of 0.1s
  class MockImage {
    constructor() {
      this.naturalHeight = height
      this.naturalWidth = width
      setTimeout(() => this.onload(), 100)
    }
  }

  describe('without a subject', function () {
    beforeEach(function () {
      wrapper = shallow(<SingleImageViewerContainer />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok
    })

    it('should render null', function () {
      expect(wrapper.type()).to.equal(null)
    })
  })
  

  describe('with a subject', function () {
    let imageWrapper
    let onReady = sinon.stub()

    before(function () {
      const subject = {
        id: 'test',
        locations: [
          { 'image/jpeg': 'https://some.domain/image.jpg'}
        ]
      }
      wrapper = shallow(
        <SingleImageViewerContainer
          ImageObject={MockImage}
          subject={subject}
          onReady={onReady}
        />
      )
      imageWrapper = wrapper.find(SingleImageViewer)
    })

    afterEach(function () {
      onReady.resetHistory()
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok
    })

    it('should record the original image dimensions on load', function (done) {
      setTimeout(function() {
        const fakeEvent = {
          target: {
            clientHeight: 0,
            clientWidth: 0
          }
        }
        const expectedEvent = {
          target: {
            clientHeight: 0,
            clientWidth: 0,
            naturalHeight: height,
            naturalWidth: width
          }
        }
        imageWrapper.simulate('load', fakeEvent)
        expect(onReady).to.have.been.calledOnceWith(expectedEvent)
        done()
      }, 150)
    })
  })
})
