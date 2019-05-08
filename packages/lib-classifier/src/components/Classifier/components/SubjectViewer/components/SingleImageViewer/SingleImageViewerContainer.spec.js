import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'

import SingleImageViewerContainer from './SingleImageViewerContainer'
import SingleImageViewer from './SingleImageViewer'

let wrapper

describe('Component > SingleImageViewerContainer', function () {
  beforeEach(function () {
    wrapper = shallow(<SingleImageViewerContainer />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should render null if there is no subject prop', function () {
    expect(wrapper.type()).to.equal(null)
  })

  describe('SingleImageViewer', function () {
    let imageWrapper
    let onReady = sinon.stub()

    before(function () {
      const subject = {
        id: 'test',
        locations: [
          { 'image/jpeg': 'https://some.domain/image.jpg' }
        ]
      }
      wrapper = shallow(
        <SingleImageViewerContainer
          subject={subject}
          onReady={onReady}
        />
      )
      imageWrapper = wrapper.find(SingleImageViewer)
    })

    afterEach(function () {
      onReady.resetHistory()
    })

    it('should call onReady on image load', function () {
      imageWrapper.simulate('load')
      expect(onReady).to.have.been.calledOnce
    })
  })
})
