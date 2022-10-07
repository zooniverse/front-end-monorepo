import { mount, shallow } from 'enzyme'
import { RadioButtonGroup } from 'grommet'
import React from 'react'
import sinon from 'sinon'

import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'
import CharacteristicSection from './CharacteristicSection'
import FilterButton from '../../components/FilterButton'

describe('Component > CharacteristicSection', function () {
  const mockTask = SurveyTask.TaskModel.create(task)
  const characteristicPattern = mockTask.characteristics.PTTRN

  let wrapper, onFilterSpy

  before(function () {
    onFilterSpy = sinon.spy()
    wrapper = mount(
      <CharacteristicSection
        characteristic={characteristicPattern}
        characteristicId='PTTRN'
        images={mockTask.images}
        onFilter={onFilterSpy}
        selectedValueId=''
        strings={mockTask.strings}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a RadioButtonGroup', function () {
    expect(wrapper.find(RadioButtonGroup)).to.have.lengthOf(1)
  })

  it('should render FilterButtons for the characteristic values', function () {
    expect(wrapper.find(FilterButton)).to.have.lengthOf(characteristicPattern.valuesOrder.length)
  })

  it('should render FilterButtons in order per the characteristic valuesOrder', function () {
    const filterButtons = wrapper.find(FilterButton)
    filterButtons.forEach((filterButton, index) => {
      const valueIdPerTask = characteristicPattern.valuesOrder[index]

      expect(filterButton.props().valueLabel).to.equal(characteristicPattern.values[valueIdPerTask].label)
    })
  })

  describe('onChange', function () {
    it('should call onFilter with characteristic and value IDs', function () {
      wrapper = shallow(
        <CharacteristicSection
          characteristic={characteristicPattern}
          characteristicId='PTTRN'
          images={mockTask.images}
          onFilter={onFilterSpy}
          selectedValueId=''
          strings={mockTask.strings}
        />
      )

      expect(onFilterSpy).to.have.not.been.called()

      wrapper.find(RadioButtonGroup).at(0).simulate('change', {
        target: { value: 'SPTS' }
      })

      expect(onFilterSpy).to.have.been.calledOnceWith('PTTRN', 'SPTS')
    })
  })
})
