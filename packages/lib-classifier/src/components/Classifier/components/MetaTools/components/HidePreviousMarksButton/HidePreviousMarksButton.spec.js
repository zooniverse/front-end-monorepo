import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { MetaToolsButton } from '@zooniverse/react-components'
import i18n from '@test/i18n/i18n-for-tests'

import { FormView, FormViewHide } from 'grommet-icons'
import HidePreviousMarksButton from './HidePreviousMarksButton'
import SHOWN_MARKS from '@helpers/shownMarks'

describe('Component > HidePreviousMarksButton', function () {
  let wrapper, useTranslationStub

  before(function () {
    useTranslationStub = sinon.stub(i18n, 't').callsFake((key) => key)
    wrapper = shallow(<HidePreviousMarksButton />)
  })

  after(function () {
    useTranslationStub.restore()
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
    expect(useTranslationStub).to.have.been.calledWith('MetaTools.HidePreviousMarksDrawingButton.hide')
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
      expect(useTranslationStub).to.have.been.calledWith('MetaTools.HidePreviousMarksDrawingButton.show')
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
})
