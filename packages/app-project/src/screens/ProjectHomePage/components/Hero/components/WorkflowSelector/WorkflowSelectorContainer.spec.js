import { shallow } from 'enzyme'
import React from 'react'

import { WorkflowSelectorContainer } from './WorkflowSelectorContainer'
import WorkflowSelector from './WorkflowSelector'

describe('Component > Hero > WorkflowSelector > WorkflowSelectorContainer', function () {
  let wrapper
  let componentWrapper

  before(function () {
    wrapper = shallow(<WorkflowSelectorContainer workflowDescription={WORKFLOW_DESCRIPTION} />)
    componentWrapper = wrapper.find(WorkflowSelector)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `WorkflowSelector` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the `workflowDescription` prop', function () {
    expect(componentWrapper.prop('workflowDescription')).to.equal(WORKFLOW_DESCRIPTION)
  })
})
