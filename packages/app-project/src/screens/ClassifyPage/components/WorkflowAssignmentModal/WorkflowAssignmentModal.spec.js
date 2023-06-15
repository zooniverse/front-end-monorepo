import { shallow } from 'enzyme'
import { Button, CheckBox } from 'grommet'
import sinon from 'sinon'
import WorkflowAssignmentModal from './WorkflowAssignmentModal'
import NavLink from '@shared/components/NavLink'

describe('Component > WorkflowAssignmentModal', function () {
  let wrapper, closeFnSpy, dismissSpy
  const router = {
    asPath: '/foo/bar',
    query: {
      owner: 'foo',
      project: 'bar'
    }
  }

  // change this to RTL and router Provider, get the extra code out of the component

  before(function() {
    closeFnSpy = sinon.spy()
    dismissSpy = sinon.spy()
    wrapper = shallow(
      <WorkflowAssignmentModal
        closeFn={closeFnSpy}
        dismiss={dismissSpy}
        assignedWorkflowID='1234'
        router={router}
      />
    )
  })

  after(function () {
    closeFnSpy = null
    dismissSpy = null
    wrapper = null
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a confirmation link', function () {
    const button = wrapper.find(NavLink)
    expect(button.props().link.href).to.equal('/foo/bar/classify/workflow/1234')
  })

  it('should call the cancel handler on cancel', function () {
    const button = wrapper.find(Button)
    button.simulate('click')
    expect(closeFnSpy).to.have.been.calledOnce()
  })

  it('should set the checked state by prop', function () {
    expect(wrapper.find(CheckBox).props().checked).to.be.false()
    wrapper.setProps({ dismissedForSession: true })
    expect(wrapper.find(CheckBox).props().checked).to.be.true()
  })
})
