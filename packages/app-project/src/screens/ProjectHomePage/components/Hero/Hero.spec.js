import { shallow } from 'enzyme'
import React from 'react'

import { Hero } from './Hero'
import Background from './components/Background'
import Introduction from './components/Introduction'
import WorkflowSelector from './components/WorkflowSelector'
import { Media } from '../../../../shared/components/Media'


describe('Component > Hero', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<Hero screenSize='small' />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('behaviour on small screens', function () {
    let mediaWrapper

    before(function () {
      mediaWrapper = wrapper.find(Media).find({ at: 'default' })
    })

    it('should have a layout for small screens', function () {
      expect(mediaWrapper).to.have.lengthOf(1)
    })

    it('should render the `Background` component', function () {
      expect(mediaWrapper.find(Background)).to.have.lengthOf(1)
    })

    it('should render the `Introduction` component', function () {
      expect(mediaWrapper.find(Introduction)).to.have.lengthOf(1)
    })

    it('should render the `WorkflowSelector` component', function () {
      expect(mediaWrapper.find(WorkflowSelector)).to.have.lengthOf(1)
    })
  })

  describe('behaviour on larger screens', function () {
    let mediaWrapper

    before(function () {
      mediaWrapper = wrapper.find(Media).find({ greaterThan: 'default' })
    })

    it('should have a layout for larger screens', function () {
      expect(mediaWrapper).to.have.lengthOf(1)
    })

    it('should render the `Background` component', function () {
      expect(mediaWrapper.find(Background)).to.have.lengthOf(1)
    })

    it('should render the `Introduction` component', function () {
      expect(mediaWrapper.find(Introduction)).to.have.lengthOf(1)
    })

    it('should render the `WorkflowSelector` component', function () {
      expect(mediaWrapper.find(WorkflowSelector)).to.have.lengthOf(1)
    })
  })
})
