import { render, shallow } from 'enzyme'
import { Button } from 'grommet'
import * as nextRouter from 'next/router'
import React from 'react'
import sinon from 'sinon'

import WorkflowSelectButton, { WorkflowLink } from './WorkflowSelectButton'
import SubjectSetPicker from '../SubjectSetPicker'

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
  before(function () {
    sinon.stub(nextRouter, 'useRouter').callsFake(() => router)
  })

  after(function () {
    nextRouter.useRouter.restore()
  })

  it('should render without crashing', function () {
    const wrapper = shallow(<WorkflowSelectButton workflow={WORKFLOW} />)
    expect(wrapper).to.be.ok()
  })

  describe('when used with a default workflow', function () {
    it('should be a link pointing to `/classify`', function () {
      const wrapper = shallow(
          <WorkflowSelectButton workflow={{
          ...WORKFLOW,
          default: true
        }} />
      ).find(WorkflowLink)
      expect(wrapper.prop('as')).to.equal(`${router.asPath}/classify`)
    })
  })

  describe('when used with a non-default workflow', function () {
    it('should be a link pointing to `/classify/workflow/:workflow_id`', function () {
      const wrapper = shallow(<WorkflowSelectButton workflow={WORKFLOW} />).find(WorkflowLink)
      expect(wrapper.prop('as')).to.equal(`${router.asPath}/classify/workflow/${WORKFLOW.id}`)
    })
  })

  describe('with a grouped workflow', function () {
    it('should open a subject set picker when clicked', function () {
      const groupedWorkflow = {
        ...WORKFLOW,
        grouped: true
      }
      const wrapper = shallow(<WorkflowSelectButton workflow={groupedWorkflow} />)
      expect(wrapper.find(SubjectSetPicker)).to.be.empty()
      wrapper.find(Button).simulate('click', { preventDefault: () => false })
      expect(wrapper.find(SubjectSetPicker).prop('active')).to.be.true()
    })
  })
})
