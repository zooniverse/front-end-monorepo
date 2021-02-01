import { shallow } from 'enzyme'
import React from 'react'
import InteractionLayerContainer from './InteractionLayerContainer'
import InteractionLayer from './InteractionLayer'
import SHOWN_MARKS from '@helpers/shownMarks'

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
      { id: 'line1', frame: 0, toolIndex: 0, x1: 100, y1: 200, x2: 150, y2: 200 },
      { id: 'line2', frame: 0, toolIndex: 0, x1: 200, y1: 300, x2: 250, y2: 300 },
      { id: 'line3', frame: 1, toolIndex: 0, x1: 150, y1: 250, x2: 100, y2: 250 },
      { id: 'line4', frame: 1, toolIndex: 0, x1: 250, y1: 350, x2: 200, y2: 350 }
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
  })

  describe('with transcription task', function () {
    let wrapper
    const hidingTask = {
      shownMarks: SHOWN_MARKS.NONE,
      hidingIndex: 1,
      marks: [{ x: 0, y: 0, frame: 0}, { x: 5, y: 5, frame: 0}]
    }

    const transcriptionTask = {
      activeTool: {
        deleteMark: () => { }
      },
      shownMarks: SHOWN_MARKS.ALL,
      taskKey: 'T1',
      type: 'transcription'
    }

    before(function () {
      wrapper = shallow(
        <InteractionLayerContainer.wrappedComponent
          height={height}
          width={width}
          activeInteractionTask={transcriptionTask}
        />
      )
    })

    it('should render transcription lines exclusively per frame', function () {
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
          shownMarks: SHOWN_MARKS.NONE,
          hidingIndex: 1,
          marks: [{ x: 0, y: 0, frame: 0 }, { x: 5, y: 5, frame: 0 }]
        }
        const hidingMarksInteractionTask = Object.assign({}, transcriptionTask, hidingTask)
        wrapper = shallow(
          <InteractionLayerContainer.wrappedComponent
            height={height}
            width={width}
            activeInteractionTask={hidingMarksInteractionTask}
            interactionTaskAnnotations={drawingAnnotations}
          />
        )
      })

      it('should hide all marks before the hiding index', function () {
        const { marks } = wrapper.find(InteractionLayer).props()
        expect(marks).to.have.lengthOf(1)
      })
    })

    describe('and showing only user marks', function () {
      it('should only show user created marks', function () {
        const userHidingTask = Object.assign({}, hidingTask)
        userHidingTask.shownMarks = SHOWN_MARKS.USER
        const hidingUserMarksInteractionTask = Object.assign({}, transcriptionTask, userHidingTask)
        wrapper = shallow(
          <InteractionLayerContainer.wrappedComponent
            height={height}
            width={width}
            activeInteractionTask={hidingUserMarksInteractionTask}
            interactionTaskAnnotations={drawingAnnotations}
          />
        )

        const marks = wrapper.find(InteractionLayer).props().marks
        expect(marks).to.have.lengthOf(2)
      })
    })
  })
})
