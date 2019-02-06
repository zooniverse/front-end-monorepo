import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import LabComponent from './lab-component'

describe('feedback drawing: lab component', function () {
  function mockFormState (ruleID) {
    return {
      defaultFailureMessage: 'Nope, please try again.',
      defaultSuccessMessage: 'Correct, nice job!',
      defaultTolerance: '10',
      failureEnabled: true,
      hideSubjectViewer: true,
      id: `${ruleID}`,
      successEnabled: true
    }
  }

  describe('with TextInput', function () {
    const handleTextInputChangeSpy = sinon.spy()
    const wrapper = shallow(<LabComponent formState={mockFormState(1234)} handleInputChange={handleTextInputChangeSpy} />)
    const textInput = wrapper.find('TextInput')

    it('should include a TextInput component', function () {
      expect(textInput).to.have.lengthOf(1)
    })

    it('should include the default tolerance', function () {
      expect(textInput.prop('value')).to.equal('10')
    })

    it('should call handleInputChange on change', function () {
      textInput.simulate('change')
      expect(handleTextInputChangeSpy.calledOnce).to.be.true
    })
  })

  describe('with CheckboxInput', function () {
    const handleCheckboxInputChangeSpy = sinon.spy()
    const wrapper = shallow(<LabComponent formState={mockFormState(5678)} handleInputChange={handleCheckboxInputChangeSpy} />)
    const checkboxInput = wrapper.find('CheckboxInput')

    it('should include a CheckboxInput component', function () {
      expect(checkboxInput).to.have.lengthOf(1)
    })

    it('should reflect the hideSubjectViewer value provided', function () {
      expect(checkboxInput.prop('checked')).to.be.true
    })

    it('should call handleInputChange on change', function () {
      checkboxInput.simulate('change')
      expect(handleCheckboxInputChangeSpy.calledOnce).to.be.true
    })
  })
})
