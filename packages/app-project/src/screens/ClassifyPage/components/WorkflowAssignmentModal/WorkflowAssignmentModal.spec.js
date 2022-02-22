import { shallow } from 'enzyme'
import { Modal } from '@zooniverse/react-components'
import { Button, CheckBox } from 'grommet'
import sinon from 'sinon'
import WorkflowAssignmentModal from './WorkflowAssignmentModal'
import NavLink from '@shared/components/NavLink'
import * as nextRouter from 'next/router'
import i18n from '@test/i18n-for-tests'

describe('Component > WorkflowAssignmentModal', function () {
  let wrapper, closeFnSpy, dismissSpy, useTranslationStub
  const router = {
    asPath: '/foo/bar',
    query: {
      owner: 'foo',
      project: 'bar'
    }
  }

  before(function() {
    closeFnSpy = sinon.spy()
    dismissSpy = sinon.spy()
    sinon.stub(nextRouter, 'useRouter').callsFake(() => router)
    useTranslationStub = sinon.stub(i18n, 't').callsFake((key) => key)
    wrapper = shallow(<WorkflowAssignmentModal closeFn={closeFnSpy} dismiss={dismissSpy} assignedWorkflowID='1234' />)
  })

  after(function () {
    nextRouter.useRouter.restore()
    closeFnSpy = null
    dismissSpy = null
    useTranslationStub.restore()
    wrapper = null
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a Modal', function () {
    expect(wrapper.find(Modal)).to.have.lengthOf(1)
  })

  it('should pass the closeFn to the Modal', function () {
    expect(wrapper.find(Modal).props().closeFn).to.equal(closeFnSpy)
  })

  it('should pass the active prop to the Modal', function () {
    expect(wrapper.find(Modal).props().active).to.be.false()
    wrapper.setProps({ active: true })
    expect(wrapper.find(Modal).props().active).to.be.true()
  })

  it('should render rendering messaging', function () {
    expect(useTranslationStub).to.have.been.calledWith('Classify.WorkflowAssignmentModal.content')
  })

  it('should set the modal title', function () {
    expect(useTranslationStub).to.have.been.calledWith('Classify.WorkflowAssignmentModal.title')
  })

  it('should render a confirmation link', function () {
    const button = wrapper.find(NavLink)
    expect(useTranslationStub).to.have.been.calledWith('Classify.WorkflowAssignmentModal.confirm')
    expect(button.props().link.href).to.equal('/foo/bar/classify/workflow/1234')
  })

  it('should render a cancel button', function () {
    const button = wrapper.find(Button)
    expect(useTranslationStub).to.have.been.calledWith('Classify.WorkflowAssignmentModal.cancel')
  })

  it('should call the cancel handler on cancel', function () {
    const button = wrapper.find(Button)
    button.simulate('click')
    expect(closeFnSpy).to.have.been.calledOnce()
  })

  it('should render a dismissal checkbox', function () {
    const checkbox = wrapper.find(CheckBox)
    expect(useTranslationStub).to.have.been.calledWith('Classify.WorkflowAssignmentModal.dismiss')
  })

  it('should call the dismiss function on change', function () {
    const event = { target: { checked: true } }
    const checkbox = wrapper.find(CheckBox)
    checkbox.simulate('change', event)
    expect(dismissSpy.withArgs(event)).to.have.been.calledOnce()
  })

  it('should set the checked state by prop', function () {
    expect(wrapper.find(CheckBox).props().checked).to.be.false()
    wrapper.setProps({ dismissedForSession: true })
    expect(wrapper.find(CheckBox).props().checked).to.be.true()
  })
})
