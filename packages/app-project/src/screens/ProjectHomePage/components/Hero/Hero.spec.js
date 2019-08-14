import { shallow } from 'enzyme'
import React from 'react'

import { Hero } from './Hero'
import Background from './components/Background'
import Introduction from './components/Introduction'
import WorkflowSelector from './components/WorkflowSelector'

let wrapper

describe('Component > Hero', function () {
  before(function () {
    wrapper = shallow(<Hero screenSize='small' />)
  })

  it('should render without crashing', function () {
    console.info(wrapper.debug())
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
