import { mount } from 'enzyme'
import sinon from 'sinon'
import WorkflowAssignmentModalContainer from './WorkflowAssignmentModalContainer'
import WorkflowAssignmentModal from './WorkflowAssignmentModal'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

describe('Component > WorkflowAssignmentModalContainer', function() {
  let wrapper
  before(function () {
    wrapper = mount(
      <WorkflowAssignmentModalContainer />, {
        wrappingComponent: Grommet,
        wrappingComponentProps: { theme: zooTheme }
      }
    )
  })
  it('should render without crashing', function() {
    expect(wrapper).to.be.ok()
  })

  describe('when there are no project preferences and a current workflow selected', function () {
    it('should not display the modal', function () {
      expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.false()
      wrapper.setProps({ workflowID: '555' })
      wrapper.update()
      expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.false()
    })
  })

  describe('when there are project preferences but no workflow selected', function () {
    const projectPreferences = {
      promptAssignment: sinon.stub().callsFake(() => false)
    }

    it('should not display the modal', function () {
      expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.false()
      wrapper.setProps({ projectPreferences, workflowID: '' })
      wrapper.update()
      expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.false()
    })
  })

  describe('when there are project preferences and a workflow is selected', function () {
    beforeEach(function () {
      wrapper.setProps({ projectPreferences: undefined, workflowID: '' })
    })

    describe('when the currently selected workflow is the same as the assigned workflow', function () {
      it('should not display the modal', function () {
        expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.false()
        const projectPreferences = {
          promptAssignment: sinon.stub().callsFake(() => false),
          settings: {
            workflow_id: '555'
          }
        }
        wrapper.setProps({ projectPreferences, workflowID: '555' })
        wrapper.update()
        expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.false()
      })
    })

    describe('when the currently selected workflow is not the same as the assigned workflow', function () {
      it('should display the modal', function () {
        expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.false()
        const projectPreferences = {
          promptAssignment: sinon.stub().callsFake(() => true),
          settings: {
            workflow_id: '555'
          }
        }
        wrapper.setProps({ projectPreferences, workflowID: '123' })
        wrapper.update()
        expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.true()
      })
    })

    describe('when the modal has been dismissed for the session', function () {
      it('should not display the modal', function () {
        wrapper = mount(<WorkflowAssignmentModalContainer />, {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        })
        expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.false()
        const projectPreferences = {
          promptAssignment: sinon.stub().callsFake(() => true),
          settings: {
            workflow_id: '555'
          }
        }
        wrapper.find(WorkflowAssignmentModal).props().dismiss({ target: { checked: true }})
        wrapper.setProps({ projectPreferences, workflowID: '123' })
        wrapper.update()
        expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.false()
      })
    })

    describe('when the modal is cancelled', function () {
      it('should remove the modal', function () {
        const projectPreferences = {
          promptAssignment: sinon.stub().callsFake(() => true),
          settings: {
            workflow_id: '555'
          }
        }
        wrapper = mount(<WorkflowAssignmentModalContainer projectPreferences={projectPreferences} workflowID='123' />, {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        })
        expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.true()
        wrapper.find(WorkflowAssignmentModal).props().closeFn()
        wrapper.update()
        expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.false()
      })
    })
  })
})