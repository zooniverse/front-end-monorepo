import { mount, shallow } from 'enzyme'
import { RadioButtonGroup } from 'grommet'
import React from 'react'
import sinon from 'sinon'

import { task as mockTask } from '@plugins/tasks/survey/mock-data'
import CharacteristicSection from './CharacteristicSection'
import FilterButton from '../../components/FilterButton'

const characteristicTail = mockTask.characteristics.TL

describe('Component > CharacteristicSection', function () {
  let wrapper, onFilterSpy

  before(function () {
    onFilterSpy = sinon.spy()
    wrapper = mount(
      <CharacteristicSection
        characteristic={characteristicTail}
        characteristicId='TL'
        images={mockTask.images}
        onFilter={onFilterSpy}
        selectedValueId=''
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
    expect(wrapper.find(FilterButton)).to.have.lengthOf(characteristicTail.valuesOrder.length)
  })

  it('should render FilterButtons in order per the characteristic valuesOrder', function () {
    const filterButtons = wrapper.find(FilterButton)
    filterButtons.forEach((filterButton, index) => {
      const valueIdPerTask = characteristicTail.valuesOrder[index]

      expect(filterButton.props().valueLabel).to.equal(characteristicTail.values[valueIdPerTask].label)
    })
  })

  describe('onChange', function () {
    it('should call onFilter with characteristic and value IDs', function () {
      wrapper = shallow(
        <CharacteristicSection
          characteristic={characteristicTail}
          characteristicId='TL'
          images={mockTask.images}
          onFilter={onFilterSpy}
          selectedValueId=''
        />
      )

      expect(onFilterSpy).to.have.not.been.called()

      wrapper.find(RadioButtonGroup).at(0).simulate('change', {
        target: { value: 'LNG' }
      })

      expect(onFilterSpy).to.have.been.calledOnceWith('TL', 'LNG')
    })
  })
})
