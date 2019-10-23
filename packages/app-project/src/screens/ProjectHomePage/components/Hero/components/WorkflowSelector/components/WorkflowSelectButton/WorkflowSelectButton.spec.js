import { render, shallow } from 'enzyme'
import React from 'react'

import { WorkflowSelectButton } from './WorkflowSelectButton'

const WORKFLOW = {
  default: false,
  displayName: 'Workflow name',
  id: '1'
}

const ROUTER = {
  asPath: '/projects/foo/bar',
  query: {
    owner: 'foo',
    project: 'bar'
  }
}

describe('Component > WorkflowSelectButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<WorkflowSelectButton router={ROUTER} workflow={WORKFLOW} />)
    expect(wrapper).to.be.ok()
  })

  describe('when used with a default workflow', function () {
    it('should be a link pointing to `/classify`', function () {
      const wrapper = shallow(<WorkflowSelectButton router={ROUTER} workflow={{
        ...WORKFLOW,
        default: true
      }} />)
      expect(wrapper.name()).to.equal('Link')
      expect(wrapper.prop('as')).to.equal(`${ROUTER.asPath}/classify`)
    })
  })

  describe('when used with a non-default workflow', function () {
    it('should be a link pointing to `/classify/workflow/:workflow_id`', function () {
      const wrapper = shallow(<WorkflowSelectButton router={ROUTER} workflow={WORKFLOW} />)
      expect(wrapper.name()).to.equal('Link')
      expect(wrapper.prop('as')).to.equal(`${ROUTER.asPath}/classify/workflow/${WORKFLOW.id}`)
    })
  })
})
