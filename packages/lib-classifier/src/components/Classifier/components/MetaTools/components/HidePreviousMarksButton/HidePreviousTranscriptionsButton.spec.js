import { mount, shallow } from 'enzyme'
import React from 'react'

import { Grommet, Menu } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { HidePreviousTranscriptionsButton, StyledDrop } from './HidePreviousTranscriptionsButton'
import SHOWN_MARKS from '@helpers/shownMarks'

let wrapper

describe('Component > HidePreviousTranscriptionsButton', function () {
  before(function () {
    wrapper = shallow(<HidePreviousTranscriptionsButton />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should show the correct aria title', function () {
    wrapper = shallow(
      <HidePreviousTranscriptionsButton
        shownMarks={SHOWN_MARKS.ALL}
      />)
    const drop = wrapper.find(StyledDrop).first()
    const { a11yTitle } = drop.props()
    expect(a11yTitle).to.equal("Show All Marks")
  })

  describe('and showing user marks', function () {
    it('should show the correct aria title', function () {
      wrapper = shallow(
        <HidePreviousTranscriptionsButton
          shownMarks={SHOWN_MARKS.USER}
        />)
      const drop = wrapper.find(StyledDrop).first()
      const { a11yTitle } = drop.props()
      expect(a11yTitle).to.equal("Show Your Marks")
    })
  })

  describe('and showing no marks', function () {
    it('should show the correct aria title', function () {
      wrapper = shallow(
        <HidePreviousTranscriptionsButton
          shownMarks={SHOWN_MARKS.NONE}
        />)
      const drop = wrapper.find(StyledDrop).first()
      const { a11yTitle } = drop.props()
      expect(a11yTitle).to.equal("Hide All Marks")
    })
  })

  describe('isOpen state', function () {
    it('should default to false', function () {
      const drop = wrapper.find(StyledDrop).first()
      const { open } = drop.props()
      expect(open).to.be.false()
    })

    describe('when clicking the button to open and close', function () {
      it('should toggle isOpen state', function () {
        const firstInstance = wrapper.find(StyledDrop).first()
        firstInstance.props().onOpen()
        const secondInstance = wrapper.find(StyledDrop).first()
        expect(secondInstance.props().open).to.be.true()
        secondInstance.props().onClose()
        const thirdInstance = wrapper.find(StyledDrop).first()
        expect(thirdInstance.props().open).to.be.false()
      })
    })
  })
})
