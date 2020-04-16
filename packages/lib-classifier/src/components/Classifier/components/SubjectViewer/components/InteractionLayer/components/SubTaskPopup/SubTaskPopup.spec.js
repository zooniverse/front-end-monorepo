import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import cuid from 'cuid'
import { SubTaskPopup, StyledContainer, TaskBox } from './SubTaskPopup'
import * as Tools from '@plugins/drawingTools/models/tools'

describe('SubTaskPopup', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<SubTaskPopup />)
    expect(wrapper).to.be.ok()
  })

  it('should render nothing when an active mark isn\'t defined', function () {
    const wrapper = shallow(
      <SubTaskPopup
        activeMark={undefined}
        subTaskVisibility
      />
    )
    expect(wrapper.find(StyledContainer)).to.have.lengthOf(0)
  })

  Object.keys(Tools).forEach((toolKey) => {
    // We don't need to test the generic Tool model since the others are a composite with it.
    if (toolKey !== 'Tool') {
      const type = toolKey.split('Tool')[0]
      const camelCaseType = type.charAt(0).toLowerCase() + type.slice(1)
      const tool = Tools[toolKey].create({
        color: 'red',
        type: camelCaseType,
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
          }
        ]
      })
      const mark = tool.createMark({
        id: cuid(),
        toolType: tool.type,
      })

      describe(`with ${tool.type} drawing mark`, function () {
        it('should render a container when given an active drawing mark and subtask visibility is true', function () {
          const wrapper = shallow(
            <SubTaskPopup
              activeMark={mark}
              subTaskVisibility
            />
          )
          expect(wrapper.find(StyledContainer)).to.have.lengthOf(1)
        })

        it('should render nothing when subtask visibility isn\'t true', function () {
          const wrapper = shallow(
            <SubTaskPopup
              activeMark={mark}
              subTaskVisibility={false}
            />
          )
          expect(wrapper.find(StyledContainer)).to.have.lengthOf(0)
        })

        it('should render the correct number of subtasks, according to the active drawing mark provided', function () {
          const wrapper = shallow(
            <SubTaskPopup
              activeMark={mark}
              subTaskVisibility
            />
          )
          expect(wrapper.find(TaskBox)).to.have.lengthOf(3)
        })
      })
    }
  })
})
