import asyncStates from '@zooniverse/async-states'
import { shallow, render } from 'enzyme'
import React from 'react'

import { WorkflowSelector } from './WorkflowSelector'
import WorkflowSelectButton from './components/WorkflowSelectButton'

const THEME = {
  global: {
    colors: {
      brand: '#000'
    }
  }
}

const WORKFLOWS = [
  {
    id: '1234',
    displayName: 'a test workflow'
  },
  {
    id: '3456',
    displayName: 'another test workflow'
  }
]

const WORKFLOW_DESCRIPTION = 'Sit nulla mi metus tellus aenean lobortis litora'
const DEFAULT_WORKFLOW_DESCRIPTION = 'You can do real research by clicking to get started here!'

describe('Component > Hero > WorkflowSelector > WorkflowSelector', function () {

  it('should render without crashing', function () {
    const wrapper = shallow(
      <WorkflowSelector
        theme={THEME}
        workflows={WORKFLOWS}
        workflowDescription={WORKFLOW_DESCRIPTION}
      />)
    expect(wrapper).to.be.ok()
  })

  describe('workflow description', function () {
    it('should use the `workflowDescription` prop if available', function () {
      const wrapper = render(
        <WorkflowSelector
          theme={THEME}
          workflows={WORKFLOWS}
          workflowDescription={WORKFLOW_DESCRIPTION}
        />)
      expect(wrapper.text()).to.include(WORKFLOW_DESCRIPTION)
    })

    it('should use the default message if the `workflowDescription` prop is unset', function () {
      const wrapper = render(
        <WorkflowSelector
          theme={THEME}
          workflows={WORKFLOWS}
        />)
      expect(wrapper.text()).to.include(DEFAULT_WORKFLOW_DESCRIPTION)
    })

    it('should use the default message if the `workflowDescription` prop is an empty string', function () {
      const wrapper = render(
        <WorkflowSelector
          theme={THEME}
          workflows={WORKFLOWS}
          workflowDescription=''
        />)
      expect(wrapper.text()).to.include(DEFAULT_WORKFLOW_DESCRIPTION)
    })
  })

  describe('with an active workflow', function () {
    it('should flag that workflow as selected', function () {
      const wrapper = shallow(
        <WorkflowSelector
          theme={THEME}
          activeWorkflow={WORKFLOWS[0]}
          userReadyState={asyncStates.success}
          workflows={WORKFLOWS}
          workflowDescription={WORKFLOW_DESCRIPTION}
        />)
      const selectedWorkflowButtons = wrapper.find(WorkflowSelectButton).find('[selected=true]')
      expect(selectedWorkflowButtons).to.have.lengthOf(1)
      const selectedWorkflow = selectedWorkflowButtons.first().prop('workflow')
      expect(selectedWorkflow).to.equal(WORKFLOWS[0])
    })
  })
})
