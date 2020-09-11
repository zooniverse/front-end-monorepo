import { Modal } from '@zooniverse/react-components'
import { shallow } from 'enzyme'
import React from 'react'

import SubjectSetPicker from './'
import SubjectSetCard from './components/SubjectSetCard'
import { mockWorkflow } from './helpers'

describe('Component > SubjectSetPicker', function () {
  describe('when inactive', function () {
    it('should not be active', function () {
      const wrapper = shallow(
        <SubjectSetPicker
          title={mockWorkflow.displayName}
          workflow={mockWorkflow}
        />
      ).find(Modal)
      expect(wrapper.props().active).to.be.false()
    })
  })

  describe('when active', function () {
    let wrapper

    before(function () {
      wrapper = shallow(
        <SubjectSetPicker
          active
          title={mockWorkflow.displayName}
          workflow={mockWorkflow}
        />
      )
    })

    it('should be active', function () {
      const modal = wrapper.find(Modal)
      expect(modal.props().active).to.be.true()
    })

    it('should use the workflow name as the modal title', function () {
      const modal = wrapper.find(Modal)
      expect(modal.props().title).to.equal(mockWorkflow.displayName)
    })

    it('should render subject set cards', function () {
      const cards = wrapper.find(SubjectSetCard)
      expect(cards.length).to.equal(mockWorkflow.subjectSets.length)
    })
  })
})