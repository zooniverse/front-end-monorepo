import { render } from 'enzyme'
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
  let wrapper

  before(function () {
    wrapper = render(<WorkflowSelectButton router={ROUTER} workflow={WORKFLOW} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('when used with a default workflow', function () {
    it('should be a link pointing to `/classify`', function () {
      const wrapper = render(<WorkflowSelectButton router={ROUTER} workflow={{
        ...WORKFLOW,
        default: true
      }} />)
      expect(wrapper[0].name).to.equal('a')
      expect(wrapper.prop('href')).to.equal(`${ROUTER.asPath}/classify`)
    })
  })

  describe('when used with a non-default workflow', function () {
    it('should be a link pointing to `/classify/workflow/:workflow_id`', function () {
      expect(wrapper[0].name).to.equal('a')
      expect(wrapper.prop('href')).to.equal(`${ROUTER.asPath}/classify/workflow/${WORKFLOW.id}`)
    })
  })
})
