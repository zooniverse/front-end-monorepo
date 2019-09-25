import { shallow } from 'enzyme'
import React from 'react'

import WorkflowSelector from './WorkflowSelector'

let wrapper

describe('Component > WorkflowSelector', function () {
  before(function () {
    wrapper = shallow(<WorkflowSelector />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
