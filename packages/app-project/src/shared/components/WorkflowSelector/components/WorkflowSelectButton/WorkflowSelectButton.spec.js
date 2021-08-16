import { shallow } from 'enzyme'
import * as nextRouter from 'next/router'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'
import WorkflowSelectButton, { ThemedButton } from './WorkflowSelectButton'
import Link from 'next/link'
import { expect } from 'chai'

describe('Component > WorkflowSelector > WorkflowSelectButton', function () {
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

  before(function () {
    sinon.stub(nextRouter, 'useRouter').callsFake(() => router)
  })

  after(function () {
    nextRouter.useRouter.restore()
  })

  it('should render without crashing', function () {
    const wrapper = shallow(<WorkflowSelectButton theme={zooTheme} workflow={WORKFLOW} />)
    expect(wrapper).to.be.ok()
  })

  it('should not add "set selection" to the label', function () {
    const wrapper = shallow(<WorkflowSelectButton theme={zooTheme} workflow={WORKFLOW} />)
    const label = shallow(wrapper.find(ThemedButton).prop('label'))
    expect(label.text()).to.satisfy(label => label.endsWith('Workflow name'))
  })

  describe('when used with a default workflow', function () {
    it('should be a link pointing to `/classify/workflow/:workflow_id`', function () {
      const wrapper = shallow(
          <WorkflowSelectButton
            theme={zooTheme}
            workflow={{
              ...WORKFLOW,
              default: true
            }}
          />
      )
      expect(wrapper.prop('href')).to.equal(`${router.asPath}/classify/workflow/${WORKFLOW.id}`)
    })
  })

  describe('when used with a non-default workflow', function () {
    it('should be a link pointing to `/classify/workflow/:workflow_id`', function () {
      const wrapper = shallow(<WorkflowSelectButton theme={zooTheme} workflow={WORKFLOW} />)
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
      wrapper = shallow(<WorkflowSelectButton theme={zooTheme} workflow={groupedWorkflow} />)
    })

    it('should add "set selection" to the label', function () {
      const label = shallow(wrapper.find(ThemedButton).prop('label'))
      expect(label.text()).to.satisfy(label => label.endsWith('Workflow name - set selection'))
    })
  })

  describe('when disabled', function () {
    it('should not have an href', function () {
      const wrapper = shallow(<WorkflowSelectButton disabled theme={zooTheme} workflow={WORKFLOW} />)
      expect(wrapper.prop('href')).to.be.undefined()
    })

    it('should not wrap the button with Link', function () {
      const wrapper = shallow(<WorkflowSelectButton disabled theme={zooTheme} workflow={WORKFLOW} />)
      expect(wrapper.find(Link)).to.have.lengthOf(0)
    })
  })
})
