import { types } from 'mobx-state-tree'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'

import { SubTaskPopup } from './SubTaskPopup'
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
        instruction: 'Type something here',
        taskKey: 'T0.0',
        type: 'text'
      }
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
  
  it('should render without crashing when given an active mark', function () {
    const wrapper = shallow(
      <SubTaskPopup
        activeMark={mark}
        subTaskVisibility={true}
      />
    )
    expect(wrapper).to.be.ok()
  })
})
