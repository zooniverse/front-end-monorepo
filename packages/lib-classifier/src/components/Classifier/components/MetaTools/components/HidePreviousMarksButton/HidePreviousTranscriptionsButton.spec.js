import { shallow } from 'enzyme'
import React from 'react'

import { Menu } from 'grommet'
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

  it('should show the correct text and icon', function () {
    wrapper = shallow(
      <HidePreviousTranscriptionsButton
        shownMarks={SHOWN_MARKS.ALL}
      />)
    const drop = wrapper.find(StyledDrop).first()
    const { a11yTitle } = drop.props()
    expect(a11yTitle).to.equal("Show All Marks")
  })

  describe('and showing user marks', function () {
    it('should show the correct text and icon', function () {
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
    it('should show the correct text and icon', function () {
      wrapper = shallow(
        <HidePreviousTranscriptionsButton
          shownMarks={SHOWN_MARKS.NONE}
        />)
      const drop = wrapper.find(StyledDrop).first()
      const { a11yTitle } = drop.props()
      expect(a11yTitle).to.equal("Hide All Marks")
    })
  })
})
