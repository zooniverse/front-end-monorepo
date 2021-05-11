import { shallow } from 'enzyme'
import { Text } from 'grommet'
import React from 'react'
import sinon from 'sinon'

import CheckBoxInput, { StyledBox } from './CheckBoxInput'

describe('Component > CheckBoxInput', function () {
  let wrapper, handleCheckBoxChangeSpy

  before(function () {
    handleCheckBoxChangeSpy = sinon.spy()
    wrapper = shallow(
      <CheckBoxInput
        handleCheckBoxChange={handleCheckBoxChangeSpy}
        option={{
          label: 'Eating',
          value: 'TNG'
        }}
        questionId='WHTBHVRSDS'
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the label', function () {
    expect(wrapper.find(Text).text()).to.equal('Eating')
  })

  it('should have a background color neutral-6', function () {
    expect(wrapper.find(StyledBox).props().background.color).to.equal('neutral-6')
  })

  it('should have text weight normal', function () {
    expect(wrapper.find(Text).props().weight).to.equal('normal')
  })

  describe('when checked', function () {
    before(function () {
      wrapper.setProps({ isChecked: true })
    })

    it('should have a background color of accent-2', function () {
      expect(wrapper.find(StyledBox).props().background.color).to.equal('accent-2')
    })

    it('should have text weight bold', function () {
      expect(wrapper.find(Text).props().weight).to.equal('bold')
    })
  })

  describe('onChange', function () {
    it('should call handleCheckBoxChange with checked and value', function () {
      expect(handleCheckBoxChangeSpy).to.not.have.been.called()

      wrapper.find('input').simulate('change', { target: { checked: false, value: 'TNG' } })

      expect(handleCheckBoxChangeSpy).to.have.been.calledWith(false, 'TNG')

      handleCheckBoxChangeSpy.resetHistory()
    })
  })
})
