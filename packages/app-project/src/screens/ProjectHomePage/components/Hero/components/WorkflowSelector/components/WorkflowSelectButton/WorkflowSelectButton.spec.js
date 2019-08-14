import { shallow } from 'enzyme'
import React from 'react'

import WorkflowSelectButton from './WorkflowSelectButton'

let wrapper

describe('Component > WorkflowSelectButton', function () {
  before(function () {
    wrapper = shallow(<WorkflowSelectButton />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
