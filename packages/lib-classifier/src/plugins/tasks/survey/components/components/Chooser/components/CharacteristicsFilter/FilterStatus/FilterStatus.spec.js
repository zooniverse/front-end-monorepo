import { mount } from 'enzyme'
import { DropButton, Grommet } from 'grommet'
import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'

import { task as mockTask } from '@plugins/tasks/survey/mock-data'
import { default as Task } from '@plugins/tasks/survey'

import FilterStatus from './FilterStatus'
import Characteristics from '../Characteristics'
import FilterButton from '../components/FilterButton'

describe('Component > FilterStatus', function () {
  let wrapper
  let task = Task.TaskModel.create({
    characteristics: mockTask.characteristics,
    characteristicsOrder: mockTask.characteristicsOrder,
    images: mockTask.images,
    taskKey: 'T0',
    type: 'survey'
  })

  before(function () {
    wrapper = mount(
      <FilterStatus
        task={task}
      />, {
        wrappingComponent: Grommet,
        wrappingComponentProps: { theme: zooTheme }
      }
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should not show drop content on initial render', function () {
    expect(wrapper.find(Characteristics)).to.have.lengthOf(0)
  })

  it('should not show selected filters if there are no selected filters', function () {
    expect(wrapper.find(FilterButton)).to.have.lengthOf(0)
  })

  describe('when disabled, on click', function () {
    before(function () {
      wrapper.setProps({ disabled: true })
      wrapper.find(DropButton).at(0).simulate('click')
    })

    after(function () {
      wrapper.setProps({ disabled: false })
    })

    it('should not show Characteristics on click', function () {
      expect(wrapper.find(Characteristics)).to.have.lengthOf(0)
    })
  })

  describe('on click', function () {
    before(function () {
      wrapper.find(DropButton).at(0).simulate('click')
    })

    it('should render the Characteristics component', function () {
      expect(wrapper.find(Characteristics)).to.have.lengthOf(1)
    })
  })

  describe('with selected filters', function () {
    it('should show the appropriate checked FilterButtons', function () {
      const characteristicIds = ['LK', 'CLR', 'TL']
      const selectedValueIds = ['CTDG', 'BLCK', 'LNG']
      let filterButtons = wrapper.find({ buttonSize: 'small' })
      expect(filterButtons).to.have.lengthOf(0)
      wrapper.setProps({
        filters: {
          LK: 'CTDG',
          CLR: 'BLCK',
          TL: 'LNG'
        }
      })
      filterButtons = wrapper.find({ buttonSize: 'small' })
      expect(filterButtons).to.have.lengthOf(3)
      filterButtons.forEach((button, index) => {
        expect(button.key()).to.equal(`${characteristicIds[index]}-${selectedValueIds[index]}`)
      })
    })
  })
})
