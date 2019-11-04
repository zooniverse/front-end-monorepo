import { shallow } from 'enzyme'
import React from 'react'

import NarrowLayout from './NarrowLayout'
import Background from '../Background'
import Introduction from '../Introduction'
import WorkflowSelector from '../WorkflowSelector'

describe('Component > Hero > NarrowLayout', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<NarrowLayout />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `Background` component', function () {
    expect(wrapper.find(Background)).to.have.lengthOf(1)
  })

  it('should render the `Introduction` component', function () {
    expect(wrapper.find(Introduction)).to.have.lengthOf(1)
  })

  it('should render the `WorkflowSelector` component', function () {
    expect(wrapper.find(WorkflowSelector)).to.have.lengthOf(1)
  })

})
