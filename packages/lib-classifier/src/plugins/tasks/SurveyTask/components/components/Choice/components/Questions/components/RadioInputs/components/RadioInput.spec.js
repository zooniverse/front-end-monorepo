import { shallow } from 'enzyme'
import { Text } from 'grommet'
import React from 'react'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'

import { RadioInput, StyledBox } from './RadioInput'

describe('Component > RadioInput', function () {
  let wrapper, handleRadioChangeSpy, handleRadioKeyDownSpy

  before(function () {
    handleRadioChangeSpy = sinon.spy()
    handleRadioKeyDownSpy = sinon.spy()
    wrapper = shallow(
      <RadioInput
        handleRadioChange={handleRadioChangeSpy}
        handleRadioKeyDown={handleRadioKeyDownSpy}
        option={{
          label: 'Yes',
          value: 'S'
        }}
        questionId='RTHRNNGPRSNT'
        theme={zooTheme}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the label', function () {
    expect(wrapper.find(Text).text()).to.equal('Yes')
  })

  it('should have a background color neutral-6', function () {
    expect(wrapper.find(StyledBox).props().background.color).to.equal('neutral-6')
  })

  it('should have text weight normal', function () {
    expect(wrapper.find(Text).props().weight).to.equal('normal')
  })

  it('should have input autoFocus false', function () {
    expect(wrapper.find('input').props().autoFocus).to.be.false()
  })

  describe('when checked', function () {
    before(function () {
      wrapper.setProps({ isChecked: true })
    })

    it('should have a background color of accent-1', function () {
      expect(wrapper.find(StyledBox).props().background.color).to.equal('accent-1')
    })

    it('should have text weight bold', function () {
      expect(wrapper.find(Text).props().weight).to.equal('bold')
    })
  })

  describe('with hasFocus true', function () {
    before(function () {
      wrapper.setProps({ hasFocus: true })
    })

    it('should have input autoFocus true', function () {
      expect(wrapper.find('input').props().autoFocus).to.be.true()
    })
  })

  describe('onChange', function () {
    it('should call handleRadioChange with checked and value', function () {
      expect(handleRadioChangeSpy).to.not.have.been.called()

      wrapper.find('input').simulate('change', { target: { checked: true, value: 'S' } })

      expect(handleRadioChangeSpy).to.have.been.calledWith('S')

      handleRadioChangeSpy.resetHistory()
    })
  })

  describe('onClick', function () {
    it('should call handleRadioChange with checked and value', function () {
      expect(handleRadioChangeSpy).to.not.have.been.called()

      wrapper.find('input').simulate('click', { target: { checked: true, value: 'S' } })

      expect(handleRadioChangeSpy).to.have.been.calledWith('S')

      handleRadioChangeSpy.resetHistory()
    })
  })

  describe('onKeyDown', function () {
    it('should call handleRadioKeyDown on keyDown of the input', function () {
      const backspaceEventMock = { key: 'Backspace', preventDefault: sinon.spy() }
      wrapper.find('input').simulate('keydown', backspaceEventMock)
      expect(handleRadioKeyDownSpy).to.have.been.calledOnce()
    })
  })
})
