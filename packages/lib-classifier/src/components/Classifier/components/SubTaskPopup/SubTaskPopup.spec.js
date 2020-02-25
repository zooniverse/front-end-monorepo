import { types } from 'mobx-state-tree'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'

import { SubTaskPopup, StyledContainer, TaskBox } from './SubTaskPopup'
import { CloseButton } from '@zooniverse/react-components'
import { PointTool } from '@plugins/drawingTools/models/tools'
import DrawingTask from '@plugins/tasks/DrawingTask'
import TextTask from '@plugins/tasks/TextTask'

describe.only('SubTaskPopup', function () {
  
  const pointTool = PointTool.create({
    color: 'red',
    type: 'point',
    details: [
      {
        instruction: 'Name your favourite fruit.',
        taskKey: 'T0.0',
        type: 'text'
      },
      {
        instruction: 'Name your favourite colour.',
        taskKey: 'T0.1',
        type: 'text'
      },
      {
        instruction: 'Name your favourite animal.',
        taskKey: 'T0.2',
        type: 'text'
      },
    ]
  })

  const mark = pointTool.createMark({
    id: 'point-001',
    toolType: 'point',
    x: 100,
    y: 160
  })

  it('should render without crashing', function () {
    const wrapper = shallow(<SubTaskPopup />)
    expect(wrapper).to.be.ok()
  })
  
  it('should render a container when given an active mark and subtask visibility is true', function () {
    const wrapper = shallow(
      <SubTaskPopup
        activeMark={mark}
        subTaskVisibility={true}
      />
    )
    expect(wrapper.find(StyledContainer)).to.have.lengthOf(1)
  })
  
  it('should render nothing when an active mark isn\'t defined', function () {
    const wrapper = shallow(
      <SubTaskPopup
        activeMark={undefined}
        subTaskVisibility={true}
      />
    )
    expect(wrapper.find(StyledContainer)).to.have.lengthOf(0)
  })
  
  it('should render nothing when subtask visibility isn\t true', function () {
    const wrapper = shallow(
      <SubTaskPopup
        activeMark={mark}
        subTaskVisibility={false}
      />
    )
    expect(wrapper.find(StyledContainer)).to.have.lengthOf(0)
  })
  
  it('should render the correct number of subtasks, according to the active mark provided', function () {
    const wrapper = shallow(
      <SubTaskPopup
        activeMark={mark}
        subTaskVisibility={true}
      />
    )
    expect(wrapper.find(TaskBox)).to.have.lengthOf(3)
  })
})
