import { shallow } from 'enzyme'
import React from 'react'

import WorkflowMenu from './'

import WorkflowSelector from '@shared/components/WorkflowSelector'
import SubjectSetPicker from '@shared/components/SubjectSetPicker'
import SubjectPicker from '@shared/components/SubjectPicker'

describe('Component > ClassifyPage > WorkflowMenu', function () {
  describe('without a selected workflow', function () {
    let wrapper
    let workflows = [{
      id: '1234',
    }]

    before(function () {
      wrapper = shallow(<WorkflowMenu workflows={workflows} />)
    })

    it('should show a workflow selector', function () {
      expect(wrapper.find(WorkflowSelector)).to.have.lengthOf(1)
    })
  })

  describe('with a selected workflow', function () {
    let wrapper
    let workflows = [{
      id: '1234',
      grouped: true
    }]

    before(function () {
      wrapper = shallow(<WorkflowMenu workflowFromUrl={workflows[0]} workflows={workflows} />)
    })

    it('should not show a workflow selector', function () {
      expect(wrapper.find(WorkflowSelector)).to.have.lengthOf(0)
    })

    it('should show a subject set picker', function () {
      expect(wrapper.find(SubjectSetPicker)).to.have.lengthOf(1)
    })
  })

  describe('with a selected workflow and subject set', function () {
    let wrapper
    let workflows = [{
      id: '1234',
      grouped: true
    }]
    let subjectSet = {
      id: '345',
      displayName: 'test set'
    }

    before(function () {
      wrapper = shallow(
        <WorkflowMenu
          subjectSetFromUrl={subjectSet}
          workflowFromUrl={workflows[0]}
          workflows={workflows}
        />
      )
    })

    it('should not show a workflow selector', function () {
      expect(wrapper.find(WorkflowSelector)).to.have.lengthOf(0)
    })

    it('should show a subject picker', function () {
      expect(wrapper.find(SubjectPicker)).to.have.lengthOf(1)
    })
  })
})