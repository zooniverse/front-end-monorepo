import { mount, shallow } from 'enzyme'
import React from 'react'
import InteractionLayerContainer from './InteractionLayerContainer'
import InteractionLayer from './InteractionLayer'
import DrawingToolMarks from './components/DrawingToolMarks'
import TranscribedLines from './components/TranscribedLines'
import SubTaskPopup from '../../../SubTaskPopup'

describe('Component > InteractionLayerContainer', function () {
  const width = 1024
  const height = 768
  const drawingAnnotations = [{
    task: 'T2',
    value: [
      { id: 'point1', frame: 0, toolIndex: 0, x: 100, y: 200 }
    ]
  }, {
    task: 'T3',
    value: [
      { id: 'line1', frame: 0, toolIndex: 0, x1: 100, y1: 200, x2: 150, y2: 200 }
    ]
  }]
  const transcriptionTask = {
    activeTool: {
      deleteMark: () => {}
    },
    taskKey: 'T1'
  }

  it('should render without crashing', function () {
    const wrapper = shallow(
      <InteractionLayerContainer.wrappedComponent
        activeInteractionTask={transcriptionTask}
        height={height}
        width={width}
      />
    )
    expect(wrapper).to.be.ok()
  })

  describe('with an active drawing task and drawing tool', function () {
    let wrapper

    before(function () {
      wrapper = shallow(
        <InteractionLayerContainer.wrappedComponent
          activeInteractionTask={transcriptionTask}
          height={height}
          width={width}
        />
      )
    })

    it('should render an InteractionLayer', function () {
      expect(wrapper.find(InteractionLayer)).to.have.lengthOf(1)
    })

    it('should render SubTaskPopup', function () {
      expect(wrapper.find(SubTaskPopup)).to.have.lengthOf(1)
    })
  })

  describe('with annotations from previous drawing tasks', function () {
    it('should render DrawingToolMarks', function () {
      const wrapper = shallow(
        <InteractionLayerContainer.wrappedComponent 
          interactionTaskAnnotations={drawingAnnotations}
          height={height}
          width={width}
        />
      )
      expect(wrapper.find(DrawingToolMarks)).to.have.lengthOf(2)
    })
  })

  describe('with transcription task', function () {
    let wrapper

    before(function () {
      wrapper = shallow(
        <InteractionLayerContainer.wrappedComponent
          height={height}
          width={width}
          activeInteractionTask={transcriptionTask}
          workflow={{ usesTranscriptionTask: true }}
        />
      )
    })

    it('should render TranscribedLines', function () {
      expect(wrapper.find(TranscribedLines)).to.have.lengthOf(1)
    })

    it('should render SubTaskPopup', function () {
      expect(wrapper.find(SubTaskPopup)).to.have.lengthOf(1)
    })
  })
})
