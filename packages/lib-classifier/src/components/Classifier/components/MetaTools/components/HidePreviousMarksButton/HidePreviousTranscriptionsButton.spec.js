import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import { FormView, FormViewHide, Hide } from 'grommet-icons'
import { Menu } from 'grommet'
import en from './locales/en'
import { HidePreviousTranscriptionsButton } from './HidePreviousTranscriptionsButton'
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
    const menu = wrapper.find(Menu).first()
    const { label, items } = menu.props()
    expect(items.length).to.equal(2)
    expect(label.props.children).to.equal("Show All Marks")
  })

  describe('and showing user marks', function () {
    it('should show the correct text and icon', function () {
      wrapper = shallow(
        <HidePreviousTranscriptionsButton
          shownMarks={SHOWN_MARKS.USER}
        />)
      const menu = wrapper.find(Menu).first()
      const { label, items } = menu.props()
      expect(items.length).to.equal(2)
      expect(label.props.children).to.equal("Show Your Marks")
    })
  })

  describe('and showing no marks', function () {
    it('should show the correct text and icon', function () {
      wrapper = shallow(
        <HidePreviousTranscriptionsButton
          shownMarks={SHOWN_MARKS.NONE}
        />)
      const menu = wrapper.find(Menu).first()
      const { label, items } = menu.props()
      expect(items.length).to.equal(2)
      expect(label.props.children).to.equal("Hide All Marks")
    })
  })
})
