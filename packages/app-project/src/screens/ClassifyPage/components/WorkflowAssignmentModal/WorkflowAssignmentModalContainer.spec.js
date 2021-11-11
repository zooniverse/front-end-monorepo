import { mount } from 'enzyme'
import sinon from 'sinon'
import WorkflowAssignmentModalContainer from './WorkflowAssignmentModalContainer'
import WorkflowAssignmentModal from './WorkflowAssignmentModal'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

describe('Component > WorkflowAssignmentModalContainer', function() {
  let wrapper
  afterEach(function () {
    wrapper.unmount()
  })
  it('should render without crashing', function() {
    wrapper = mount(
      <WorkflowAssignmentModalContainer />, {
      wrappingComponent: Grommet,
      wrappingComponentProps: { theme: zooTheme }
    })
    expect(wrapper).to.be.ok()
  })

  describe('when the project preferences are not loaded and a current workflow selected', function () {
    it('should not display the modal', function () {
      wrapper = mount(
        <WorkflowAssignmentModalContainer />, {
        wrappingComponent: Grommet,
        wrappingComponentProps: { theme: zooTheme }
      })
      expect(wrapper.find(WorkflowAssignmentModal)).to.have.lengthOf(0)
      wrapper.setProps({ currentWorkflowID: '555' })
      wrapper.update()
      expect(wrapper.find(WorkflowAssignmentModal)).to.have.lengthOf(0)
    })
  })

  describe('when there are project preferences but no workflow selected', function () {
    it('should not display the modal', function () {
      const promptAssignment = sinon.stub().callsFake(() => false)
      wrapper = mount(
        <WorkflowAssignmentModalContainer />, {
        wrappingComponent: Grommet,
        wrappingComponentProps: { theme: zooTheme }
      })
      expect(wrapper.find(WorkflowAssignmentModal)).to.have.lengthOf(0)
      wrapper.setProps({ assignedWorkflowID: '555', currentWorkflowID: '', promptAssignment })
      wrapper.update()
      expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.false()
    })
  })

  describe('when there are project preferences and a workflow is selected', function () {
    describe('when the currently selected workflow is the same as the assigned workflow', function () {
      it('should not display the modal', function () {
        wrapper = mount(
          <WorkflowAssignmentModalContainer />, {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        })
        expect(wrapper.find(WorkflowAssignmentModal)).to.have.lengthOf(0)
        const promptAssignment = sinon.stub().callsFake(() => false)
        const assignedWorkflowID = '555'
        wrapper.setProps({ assignedWorkflowID, currentWorkflowID: '555', promptAssignment })
        wrapper.update()
        expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.false()
      })
    })

    describe('when the currently selected workflow is not the same as the assigned workflow', function () {
      it('should display the modal', function () {
        wrapper = mount(
          <WorkflowAssignmentModalContainer />, {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        })
        expect(wrapper.find(WorkflowAssignmentModal)).to.have.lengthOf(0)
        const promptAssignment = sinon.stub().callsFake(() => true)
        const assignedWorkflowID = '555'
        wrapper.setProps({ assignedWorkflowID, promptAssignment, currentWorkflowID: '123' })
        wrapper.update()
        expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.true()
      })
    })

    describe('when the modal has been dismissed for the session', function () {
      it('should not display the modal', function () {
        const promptAssignment = sinon.stub().callsFake(() => {})
        wrapper = mount(<WorkflowAssignmentModalContainer assignedWorkflowID='555' currentWorkflowID='123' promptAssignment={promptAssignment} />, {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        })
        expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.false()
        wrapper.find(WorkflowAssignmentModal).props().dismiss({ target: { checked: true }})
        wrapper.update()
        expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.false()
      })
    })

    describe('when the modal is cancelled', function () {
      it('should remove the modal', function () {
        const promptAssignment = sinon.stub().callsFake(() => true)
        const assignedWorkflowID = '555'
        wrapper = mount(
          <WorkflowAssignmentModalContainer
            assignedWorkflowID={assignedWorkflowID}
            currentWorkflowID='123'
            promptAssignment={promptAssignment}
          />, {
            wrappingComponent: Grommet,
            wrappingComponentProps: { theme: zooTheme }
          }
        )
        expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.true()
        wrapper.find(WorkflowAssignmentModal).props().closeFn()
        wrapper.update()
        expect(wrapper.find(WorkflowAssignmentModal).props().active).to.be.false()
      })
    })
  })
})