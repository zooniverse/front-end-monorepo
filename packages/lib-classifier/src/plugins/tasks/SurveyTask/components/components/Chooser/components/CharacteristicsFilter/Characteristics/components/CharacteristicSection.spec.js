import { mount, shallow } from 'enzyme'
import { Grommet, RadioButtonGroup } from 'grommet'
import React from 'react'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import CharacteristicSection from './CharacteristicSection'
import FilterButton from './FilterButton'

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
      />, {
        wrappingComponent: Grommet,
        wrappingComponentProps: { theme: zooTheme }
      }
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a RadioButtonGroup', function () {
    expect(wrapper.find(RadioButtonGroup)).to.have.lengthOf(1)
  })

  it('should render FilterButton for characteristic values', function () {
    expect(wrapper.find(FilterButton)).to.have.lengthOf(5)
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
      
      wrapper.find(RadioButtonGroup).at(0).simulate('change', { target: { value: 'LNG' }})

      expect(onFilterSpy).to.have.been.calledOnceWith('TL', 'LNG')
    })
  })
})
