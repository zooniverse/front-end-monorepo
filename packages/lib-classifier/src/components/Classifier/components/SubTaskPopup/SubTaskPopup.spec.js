import { types } from 'mobx-state-tree'
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { SubTaskPopup } from './SubTaskPopup'
import { PointTool } from '@plugins/drawingTools/models/tools'

describe.only('SubTaskPopup', function () {
  const tool = PointTool.create({
    color: 'red',
    type: 'point',
    details: [
      {
        type: 'text',
        required: false,
        instructions: 'Type in any text',
      }
    ]
  })
  
  const mark = tool.createMark({
    id: 'point1',
    toolType: 'point',
    x: 100,
    y: 160
  })
  
  
  it('should render without crashing', function () {
    const wrapper = shallow(<SubTaskPopup />)
    expect(wrapper).to.be.ok()
  })
  
  it('should render without crashing when given an active mark', function () {
    const wrapper = shallow(<SubTaskPopup activeMark={mark} />)
    expect(wrapper).to.be.ok()
  })
})
