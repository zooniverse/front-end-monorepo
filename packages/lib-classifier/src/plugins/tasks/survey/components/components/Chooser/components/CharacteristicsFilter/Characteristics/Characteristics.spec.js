import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import { task as mockTask } from '@plugins/tasks/survey/mock-data'
import Characteristics from './Characteristics'
import CharacteristicSection from './components/CharacteristicSection'

describe('Component > Characteristics', function () {
  let wrapper, onFilterSpy

  before(function () {
    onFilterSpy = sinon.spy()
    wrapper = shallow(
      <Characteristics
        characteristics={mockTask.characteristics}
        characteristicsOrder={mockTask.characteristicsOrder}
        images={mockTask.images}
        onFilter={onFilterSpy}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render CharacteristicSections for the characteristics', function () {
    expect(wrapper.find(CharacteristicSection)).to.have.lengthOf(mockTask.characteristicsOrder.length)
  })

  it('should render CharacteristicSections in order per characteristicsOrder', function () {
    const sections = wrapper.find(CharacteristicSection)
    sections.forEach((section, index) => {
      expect(section.props().characteristicId).to.equal(mockTask.characteristicsOrder[index])
    })
  })

  /** The translation function will simply return keys in a testing env */
  it('should render a "Clear filters" button', function () {
    expect(wrapper.find('Button').props().label).to.equal('SurveyTask.CharacteristicsFilter.clearFilters')
  })

  it('should call onFilter when the "Clear filters" button is clicked', function () {
    expect(onFilterSpy).to.have.not.been.called()

    wrapper.find('Button').filterWhere((button) => button.props().label === 'SurveyTask.CharacteristicsFilter.clearFilters').at(0).simulate('click')

    expect(onFilterSpy).to.have.been.calledOnceWith()
  })
})
