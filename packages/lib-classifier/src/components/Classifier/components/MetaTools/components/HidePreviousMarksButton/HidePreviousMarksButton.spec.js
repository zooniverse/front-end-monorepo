import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { MetaToolsButton } from '@zooniverse/react-components'

import { FormView, FormViewHide, Hide } from 'grommet-icons'
import en from './locales/en'
import HidePreviousMarksButton from './HidePreviousMarksButton'
import SHOWN_MARKS from '../../../../../../helpers/shownMarks'

let wrapper

describe('Component > HidePreviousMarksButton', function () {
  before(function () {
    wrapper = shallow(<HidePreviousMarksButton />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should display a FormView icon', function () {
    const button = wrapper.find(MetaToolsButton)
    const { icon } = button.props()
    expect(icon).to.deep.equal(<FormView />)
  })

  it('should display text to hide the marks', function () {
    const button = wrapper.find(MetaToolsButton)
    const { text } = button.props()
    expect(text).to.deep.equal(en.HidePreviousMarksDrawingButton.hide)
  })

  it('should call props.onClick on click', function () {
    const onClick = sinon.stub()
    wrapper = shallow(
      <HidePreviousMarksButton
        onClick={onClick}
      />
    )

    wrapper.find(MetaToolsButton).simulate('click')
    expect(onClick).to.have.been.calledOnce()
  })

  describe('when marks are hidden', function () {
    before(function () {
      wrapper = shallow(<HidePreviousMarksButton shownMarks={SHOWN_MARKS.NONE} />)
    })

    it('should display a FormViewHide icon', function () {
      const button = wrapper.find(MetaToolsButton)
      const { icon } = button.props()
      expect(icon).to.deep.equal(<FormViewHide />)
    })

    it('should display text to hide the marks', function () {
      const button = wrapper.find(MetaToolsButton)
      const { text } = button.props()
      expect(text).to.deep.equal(en.HidePreviousMarksDrawingButton.show)
    })
  })

  describe('when disabled', function () {
    const onClick = sinon.stub()
    wrapper = shallow(
      <HidePreviousMarksButton
        disabled
        onClick={onClick}
      />
    )

    it('should not be clickable', function () {
      wrapper.find(MetaToolsButton).simulate('click')
      expect(onClick).to.not.have.been.called()
    })
  })

  describe('when a transcription task', function () {
    describe('and showing all marks', function () {
      it('should show the correct text and icon', function () {
        wrapper = shallow(
          <HidePreviousMarksButton
            shownMarks={SHOWN_MARKS.ALL}
            type='transcription'
          />)
        const button = wrapper.find(MetaToolsButton)
        const { icon, text } = button.props()
        expect(icon).to.deep.equal(<FormView />)
        expect(text).to.deep.equal(en.HidePreviousMarksTranscriptionButton.showUser)
      })
    })

    describe('and showing user marks', function () {
      it('should show the correct text and icon', function () {
        wrapper = shallow(
          <HidePreviousMarksButton
            shownMarks={SHOWN_MARKS.USER}
            type='transcription'
          />)
        const button = wrapper.find(MetaToolsButton)
        const { icon, text } = button.props()
        expect(icon).to.deep.equal(<Hide />)
        expect(text).to.deep.equal(en.HidePreviousMarksTranscriptionButton.hide)
      })
    })

    describe('and showing no marks', function () {
      it('should show the correct text and icon', function () {
        wrapper = shallow(
          <HidePreviousMarksButton
            shownMarks={SHOWN_MARKS.NONE}
            type='transcription'
          />)
        const button = wrapper.find(MetaToolsButton)
        const { icon, text } = button.props()
        expect(icon).to.deep.equal(<FormViewHide />)
        expect(text).to.deep.equal(en.HidePreviousMarksTranscriptionButton.show)
      })
    })
  })
})
