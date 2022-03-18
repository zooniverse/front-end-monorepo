import { shallow } from 'enzyme'
import { types } from 'mobx-state-tree'
import React from 'react'

import { default as Task } from '@plugins/tasks/survey'
import Chooser from './Chooser'
import FilterStatus from './components/CharacteristicsFilter/FilterStatus'
import Choices from './components/Choices'

describe('Component > Chooser', function () {
  let wrapper
  const task = Task.TaskModel.create({
    taskKey: 'T0',
    type: 'survey'
  })
  const annotation = task.defaultAnnotation()

  before(function () {
    wrapper = shallow(
      <Chooser
        task={task}
      />
    )
  })
  
  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a FilterStatus component', function () {
    expect(wrapper.find(FilterStatus)).to.have.lengthOf(1)
  })

  it('should render a Choices component', function () {
    expect(wrapper.find(Choices)).to.have.lengthOf(1)
  })
})
