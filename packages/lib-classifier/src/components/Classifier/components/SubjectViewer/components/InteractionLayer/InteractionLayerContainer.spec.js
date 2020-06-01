import { mount, shallow } from 'enzyme'
import React from 'react'
import InteractionLayerContainer from './InteractionLayerContainer'
import InteractionLayer from './InteractionLayer'
import DrawingToolMarks from './components/DrawingToolMarks'
import TranscribedLines from './components/TranscribedLines'
import SubTaskPopup from './components/SubTaskPopup'

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
  const drawingTask = {
    activeTool: {
      deleteMark: () => {}
    },
    taskKey: 'T1',
    type: 'drawing'
  }

  it('should render without crashing', function () {
    const wrapper = shallow(
      <InteractionLayerContainer.wrappedComponent
        activeInteractionTask={drawingTask}
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
          activeInteractionTask={drawingTask}
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

    it('should not render TranscribedLines', function () {
      expect(wrapper.find(TranscribedLines)).to.have.lengthOf(0)
    })
  })

  describe('with annotations from previous reduced drawing or transcription tasks', function () {
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
    const transcriptionTask = {
      activeTool: {
        deleteMark: () => { }
      },
      taskKey: 'T1',
      type: 'transcription'
    }

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

    it('should render TranscribedLines exclusively per frame', function () {
      const activeTask = {
        hidePreviousMarks: false,
        hidingIndex: 0,
        marks: [
          {
            id: '1',
            frame: 0,
            toolIndex: 0,
            toolType: 'transcriptionLine',
            x1: 100,
            y1: 100,
            x2: 400,
            y2: 101
          },
          {
            id: '2',
            frame: 0,
            toolIndex: 0,
            toolType: 'transcriptionLine',
            x1: 100,
            y1: 200,
            x2: 400,
            y2: 201
          },
          {
            id: '3',
            frame: 1,
            toolIndex: 0,
            toolType: 'transcriptionLine',
            x1: 100,
            y1: 100,
            x2: 400,
            y2: 101
          }
        ]
      }
      const activeTranscriptionTask = Object.assign({}, activeTask, transcriptionTask)

      const wrapper = shallow(
        <InteractionLayerContainer.wrappedComponent
          height={height}
          width={width}
          frame={0}
          activeInteractionTask={activeTranscriptionTask}
          workflow={{ usesTranscriptionTask: true }}
        />
      )

      const firstFrameMarks = wrapper.find(InteractionLayer).prop('marks')
      expect(firstFrameMarks).to.have.lengthOf(2)
      wrapper.setProps({ frame: 1 })
      const secondFrameMarks = wrapper.find(InteractionLayer).prop('marks')
      expect(secondFrameMarks).to.have.lengthOf(1)
    })

    describe('and hiding previous marks', function () {
      let wrapper

      before(function () {
        const hidingTask = {
          hidePreviousMarks: true,
          hidingIndex: 1,
          marks: [{ x: 0, y: 0, frame: 0 }, { x: 5, y: 5, frame: 0 }]
        }
        const hidingMarksInteractionTask = Object.assign(hidingTask, transcriptionTask)
        wrapper = shallow(
          <InteractionLayerContainer.wrappedComponent
            height={height}
            width={width}
            activeInteractionTask={hidingMarksInteractionTask}
            interactionTaskAnnotations={drawingAnnotations}
            workflow={{ usesTranscriptionTask: true }}
          />
        )
      })

      it('should hide previous annotations', function () {
        expect(wrapper.find(DrawingToolMarks)).to.have.lengthOf(0)
      })

      it('should hide all marks before the hiding index', function () {
        const { marks } = wrapper.find(InteractionLayer).props()
        expect(marks).to.have.lengthOf(1)
      })
    })
  })
})
