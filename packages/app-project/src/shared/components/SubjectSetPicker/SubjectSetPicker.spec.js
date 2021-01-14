import { SpacedText } from '@zooniverse/react-components'
import { shallow } from 'enzyme'
import { Button, Paragraph } from 'grommet'
import React from 'react'
import sinon from 'sinon'

import SubjectSetPicker, { BackButton, StyledHeading } from './SubjectSetPicker'
import SubjectSetCard from './components/SubjectSetCard'
import en from './locales/en'
import { mockWorkflow } from './helpers'

describe('Component > SubjectSetPicker', function () {
  let wrapper

  before(function () {
    wrapper = shallow(
      <SubjectSetPicker
        title={mockWorkflow.displayName}
        workflow={mockWorkflow}
      />
    )
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

  it('should render subject set cards', function () {
    const cards = wrapper.find(SubjectSetCard)
    expect(cards.length).to.equal(mockWorkflow.subjectSets.length)
  })

  describe('the onClose callback', function () {

    before(function () {
      wrapper.setProps({
        onClose: sinon.stub()
      })
    })

    it('should show a back button', function () {
      const button = wrapper.find(BackButton).first()
      expect(button).to.have.lengthOf(1)
    })

    it('should be called when the back button is clicked', function () {
      const button = wrapper.find(BackButton).first()
      const onClose = button.prop('onClick')
      button.simulate('click')
      expect(onClose).to.have.been.calledOnce()
    })
  })
})