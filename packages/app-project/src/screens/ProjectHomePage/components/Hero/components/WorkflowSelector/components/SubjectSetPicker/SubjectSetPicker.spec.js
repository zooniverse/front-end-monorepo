import { Modal } from '@zooniverse/react-components'
import { shallow } from 'enzyme'
import { Paragraph } from 'grommet'
import React from 'react'

import SubjectSetPicker, { StyledHeading } from './SubjectSetPicker'
import SubjectSetCard from './components/SubjectSetCard'
import en from './locales/en'
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

    describe('content heading', function () {
      let heading

      before(function () {
        heading = wrapper.find(StyledHeading)
      })

      it('should contain the heading text', function () {
        expect(heading.children().first().text()).to.equal(en.SubjectSetPicker.heading)
      })

      it('should have an xsmall top margin', function () {
        expect(heading.props().margin.top).to.equal('xsmall')
      })

      it('should have no bottom margin', function () {
        expect(heading.props().margin.bottom).to.equal('none')
      })
    })

    describe('content byline', function () {
      let description

      before(function () {
        description = wrapper.find(Paragraph)
      })

      it('should contain the byline text', function () {
        expect(description.children().first().text()).to.equal(en.SubjectSetPicker.byline)
      })

      it('should have a small top margin', function () {
        expect(description.props().margin.top).to.equal('15px')
      })

      it('should have a larger bottom margin', function () {
        expect(description.props().margin.bottom).to.equal('medium')
      })
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