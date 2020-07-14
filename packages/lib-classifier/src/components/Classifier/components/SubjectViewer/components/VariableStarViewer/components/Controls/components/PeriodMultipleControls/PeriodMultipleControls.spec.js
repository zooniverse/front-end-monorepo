import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { SpacedText } from '@zooniverse/react-components'
import { FormField } from 'grommet'
import { PeriodMultipleControls, StyledRadioButtonGroup } from './PeriodMultipleControls'
import en from '../../../../locales/en'

const options = ['0.5', '1', '2', '3'].map((option) => {
  return {
    label: <SpacedText size='10px' style={{ width: '1ch' }} weight='bold'>{option}</SpacedText>,
    value: option
  }
})

describe('Controls > Components > PeriodMultipleControls', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <PeriodMultipleControls
        options={options}
        periodMultiple={1}
        setPeriodMultiple={() => {}}
      />
    )
    expect(wrapper).to.be.ok()
  })

  describe('FormField', function () {
    let wrapper, formField
    before(function () {
      wrapper = shallow(
        <PeriodMultipleControls
          options={options}
          periodMultiple={1}
          setPeriodMultiple={() => { }}
        />
      )
      formField = wrapper.find(FormField)
    })

    it('should render a FormField for the group', function () {
      const group = wrapper.find(StyledRadioButtonGroup)
      expect(formField.props().htmlFor).to.equal(group.props().id)
    })

    it('should have a label for the FormField', function () {
      const label = <SpacedText size='10px' weight='bold'>{en.VariableStarViewer.periodMultiple}</SpacedText>
      expect(formField.props().label).to.deep.equal(label)
    })
  })

  describe('RadioButtonGroup', function () {
    let wrapper, group, setPeriodMultipleSpy
    before(function () {
      setPeriodMultipleSpy = sinon.spy()
      wrapper = shallow(
        <PeriodMultipleControls
          options={options}
          periodMultiple={1}
          setPeriodMultiple={setPeriodMultipleSpy}
        />
      )
      group = wrapper.find(StyledRadioButtonGroup)
    })

    it('should render a RadioButtonGroup', function () {
      expect(group).to.have.lengthOf(1)
    })

    it('should pass the periodMultiple prop as a string', function () {
      expect(group.props().value).to.equal('1')
    })

    it('should call setPeriodMultiple on change', function () {
      group.simulate('change', { target: {} })

      expect(setPeriodMultipleSpy).to.have.been.calledOnceWith({ target: {} })
    })
  })
})