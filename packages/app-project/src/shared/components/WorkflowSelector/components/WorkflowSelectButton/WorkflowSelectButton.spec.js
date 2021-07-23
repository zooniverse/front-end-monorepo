import { render, shallow } from 'enzyme'
import { Button } from 'grommet'
import * as nextRouter from 'next/router'
import sinon from 'sinon'

import WorkflowSelectButton, { WorkflowLink } from './WorkflowSelectButton'

const WORKFLOW = {
  default: false,
  displayName: 'Workflow name',
  id: '1'
}

const router = {
  asPath: '/projects/foo/bar',
  query: {
    owner: 'foo',
    project: 'bar'
  }
}

describe('Component > WorkflowSelectButton', function () {
  const onSelect = sinon.stub()

  before(function () {
    sinon.stub(nextRouter, 'useRouter').callsFake(() => router)
  })

  after(function () {
    nextRouter.useRouter.restore()
  })

  it('should render without crashing', function () {
    const wrapper = shallow(<WorkflowSelectButton onSelect={onSelect} workflow={WORKFLOW} />)
    expect(wrapper).to.be.ok()
  })

  it('should not add "set selection" to the label', function () {
    const wrapper = shallow(<WorkflowSelectButton onSelect={onSelect} workflow={WORKFLOW} />)
    const label = shallow(wrapper.find(Button).prop('label'))
    expect(label.text()).to.satisfy(label => label.endsWith('Workflow name'))
  })

  describe('when used with a default workflow', function () {
    it('should be a link pointing to `/classify/workflow/:workflow_id`', function () {
      const wrapper = shallow(
          <WorkflowSelectButton onSelect={onSelect} workflow={{
          ...WORKFLOW,
          default: true
        }} />
      ).find(WorkflowLink)
      expect(wrapper.prop('href')).to.equal(`${router.asPath}/classify/workflow/${WORKFLOW.id}`)
    })
  })

  describe('when used with a non-default workflow', function () {
    it('should be a link pointing to `/classify/workflow/:workflow_id`', function () {
      const wrapper = shallow(<WorkflowSelectButton onSelect={onSelect} workflow={WORKFLOW} />).find(WorkflowLink)
      expect(wrapper.prop('href')).to.equal(`${router.asPath}/classify/workflow/${WORKFLOW.id}`)
    })
  })

  describe('with a grouped workflow', function () {
    let wrapper

    before(function () {
      const groupedWorkflow = {
        ...WORKFLOW,
        grouped: true
      }
      wrapper = shallow(<WorkflowSelectButton onSelect={onSelect} workflow={groupedWorkflow} />)
    })

    it('should call onSelect when clicked', function () {
      wrapper.find(Button).simulate('click', { preventDefault: () => false })
      expect(onSelect).to.have.been.calledOnce()
    })

    it('should add "set selection" to the label', function () {
      const label = shallow(wrapper.find(Button).prop('label'))
      expect(label.text()).to.satisfy(label => label.endsWith('Workflow name - set selection'))
    })
  })

  xdescribe('with an active user', function () {
    it('should call onSelect on workflow selection', function () {
      const onSelect = sinon.stub()
      const wrapper = shallow(
        <WorkflowSelector
          theme={THEME}
          onSelect={onSelect}
          userReadyState={asyncStates.success}
          workflows={WORKFLOWS}
          workflowDescription={WORKFLOW_DESCRIPTION}
        />)
      const workflowButton = wrapper.find(WorkflowSelectButton).first()
      const buttonSelect = workflowButton.prop('onSelect')
      buttonSelect()
      expect(onSelect).to.have.been.calledOnce()
    })
  })
})
