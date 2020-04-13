import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { SubTaskPopup, StyledContainer, TaskBox } from './SubTaskPopup'
import { PointTool, TranscriptionLineTool } from '@plugins/drawingTools/models/tools'

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

  describe('with drawing mark', function () {
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
        }
      ]
    })

    const pointMark = pointTool.createMark({
      id: 'point-001',
      toolType: 'point',
      x: 100,
      y: 160
    })

    it('should render a container when given an active mark and subtask visibility is true', function () {
      const wrapper = shallow(
        <SubTaskPopup
          activeMark={pointMark}
          subTaskVisibility
        />
      )
      expect(wrapper.find(StyledContainer)).to.have.lengthOf(1)
    })

    it('should render nothing when subtask visibility isn\'t true', function () {
      const wrapper = shallow(
        <SubTaskPopup
          activeMark={pointMark}
          subTaskVisibility={false}
        />
      )
      expect(wrapper.find(StyledContainer)).to.have.lengthOf(0)
    })

    it('should render the correct number of subtasks, according to the active mark provided', function () {
      const wrapper = shallow(
        <SubTaskPopup
          activeMark={pointMark}
          subTaskVisibility
        />
      )
      expect(wrapper.find(TaskBox)).to.have.lengthOf(3)
    })
  })

  describe('with transcription mark', function () {
    const transcriptionTool = TranscriptionLineTool.create({
      type: 'transcriptionLine'
    })

    const transcriptionMark = transcriptionTool.createMark({
      id: 'transcription-001',
      x1: 100,
      y1: 150,
      x2: 300,
      y2: 160
    })

    it('should render a container when given an active mark and subtask visibility is true', function () {
      const wrapper = shallow(
        <SubTaskPopup
          activeMark={transcriptionMark}
          subTaskVisibility
        />
      )
      expect(wrapper.find(StyledContainer)).to.have.lengthOf(1)
    })

    it('should render nothing when subtask visibility isn\'t true', function () {
      const wrapper = shallow(
        <SubTaskPopup
          activeMark={transcriptionMark}
          subTaskVisibility={false}
        />
      )
      expect(wrapper.find(StyledContainer)).to.have.lengthOf(0)
    })
  })
})
