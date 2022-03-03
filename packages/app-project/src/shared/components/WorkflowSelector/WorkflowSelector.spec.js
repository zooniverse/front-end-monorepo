import asyncStates from '@zooniverse/async-states'
import { shallow } from 'enzyme'

import WorkflowSelector from './WorkflowSelector'
import WorkflowSelectButtons from './components/WorkflowSelectButtons'
import { expect } from 'chai'

describe('Component > WorkflowSelector', function () {
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
  const DEFAULT_WORKFLOW_DESCRIPTION = 'WorkflowSelector.message'
  /** The translation function will simply return keys in a testing env */

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
      const wrapper = shallow(
        <WorkflowSelector
          theme={THEME}
          workflows={WORKFLOWS}
          workflowDescription={WORKFLOW_DESCRIPTION}
        />)
      expect(wrapper.contains(WORKFLOW_DESCRIPTION)).to.be.true()
    })

    it('should use the default message if the `workflowDescription` prop is unset', function () {
      const wrapper = shallow(
        <WorkflowSelector
          theme={THEME}
          workflows={WORKFLOWS}
        />)
      expect(wrapper.contains(DEFAULT_WORKFLOW_DESCRIPTION)).to.be.true()
    })

    it('should use the default message if the `workflowDescription` prop is an empty string', function () {
      const wrapper = shallow(
        <WorkflowSelector
          theme={THEME}
          workflows={WORKFLOWS}
          workflowDescription=''
        />)
      expect(wrapper.contains(DEFAULT_WORKFLOW_DESCRIPTION)).to.be.true()
    })
  })

  describe('when successfully loaded the user state and loaded the user project preferences', function () {
    it('should render workflow select buttons', function () {
      const wrapper = shallow(
        <WorkflowSelector
          uppLoaded={true}
          userReadyState={asyncStates.success}
          theme={THEME}
          workflows={WORKFLOWS}
        />)
        expect(wrapper.find(WorkflowSelectButtons)).to.have.lengthOf(1)
    })
  })
})
