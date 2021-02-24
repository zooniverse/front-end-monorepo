import { mount } from 'enzyme'
import { DropButton } from 'grommet'
import { types } from 'mobx-state-tree'
import React from 'react'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import { default as Task } from '@plugins/tasks/SurveyTask'

import FilterStatus from './FilterStatus'
import Characteristics from '../Characteristics'
import FilterButton from '../Characteristics/components/FilterButton'

describe('Component > FilterStatus', function () {
  let wrapper
  let task = Task.TaskModel.create({
    characteristics: mockTask.characteristics,
    characteristicsOrder: mockTask.characteristicsOrder,
    images: mockTask.images,
    taskKey: 'T0',
    type: 'survey'
  })
  const annotation = task.defaultAnnotation()

  before(function () {
    types.model('MockStore', {
      annotation: Task.AnnotationModel,
      task: Task.TaskModel
    })
      .create({
        annotation,
        task
      })
    task.setAnnotation(annotation)

    wrapper = mount(
      <FilterStatus
        task={task}
      />
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

  describe('with drop content', function () {
    before(function () {
      wrapper.find(DropButton).at(0).simulate('click')
    })

    it('should render the Characteristics component', function () {
      expect(wrapper.find(Characteristics)).to.have.lengthOf(1)
    })
  })

  describe.skip('with selected filters', function () {
    before(function () {
      wrapper.setState({ filter: {
        LK: 'CTDG',
        CLR: 'BLCK',
        TL: 'LNG'
      }})
    })

    it('should show the appropriate checked FilterButtons', function () {
      expect(wrapper.find(FilterButton)).to.have.lengthOf(3)
    })
  })
})
