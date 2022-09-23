import { shallow } from 'enzyme'
import WorkflowSelectorConnector from './WorkflowSelectorConnector'
import WorkflowSelector from './WorkflowSelector'
import { expect } from 'chai'

describe('Component > Hero > WorkflowSelector > WorkflowSelectorConnector', function () {
  const WORKFLOW_DESCRIPTION = 'Sit nulla mi metus tellus aenean lobortis litora'
  let wrapper, mockStore, componentWrapper, workflows

  before(function () {
    mockStore = {
      store: {
        project: {
          experimental_tools: [],
          workflow_description: WORKFLOW_DESCRIPTION
        },
        user: {
          loadingState: 'success',
          personalization: { 
            projectPreferences: {
              isLoaded: true,
              settings: { workflow_id: '5' }
            }
          }
        }
      }
    }
    workflows = [{ id: '5' }]
    wrapper = shallow(
      <WorkflowSelectorConnector
        mockStore={mockStore.store}
        workflows={workflows}
      />
    )
    componentWrapper = wrapper.find(WorkflowSelector)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `WorkflowSelector` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the `workflowDescription`', function () {
    expect(componentWrapper.prop('workflowDescription')).to.equal(WORKFLOW_DESCRIPTION)
  })

  it('should pass down the user loading state', function () {
    expect(componentWrapper.prop('userReadyState')).to.equal('success')
  })

  it('should pass down the user project preferences isLoaded state', function () {
    expect(componentWrapper.prop('uppLoaded')).to.be.true()
  })

  it('should pass down the assigned workflow id', function () {
    expect(componentWrapper.prop('assignedWorkflowID')).to.equal(mockStore.store.user.personalization.projectPreferences.settings.workflow_id)
  })

  it('should pass down if workflow assignment is enabled for the project', function () {
    expect(componentWrapper.prop('workflowAssignmentEnabled')).to.be.false()
  })

  it('should pass down parent props', function () {
    expect(componentWrapper.prop('workflows')).to.deep.equal(workflows)
  })
})
