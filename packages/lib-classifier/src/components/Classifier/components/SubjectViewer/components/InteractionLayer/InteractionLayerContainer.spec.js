import { shallow } from 'enzyme'
import { InteractionLayerContainer } from './InteractionLayerContainer'
import InteractionLayer from './InteractionLayer'
import PreviousMarks from './components/PreviousMarks'
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
    const {
      activeMark,
      activeTool,
      activeToolIndex,
      hidingIndex,
      marks,
      setActiveMark,
      shownMarks,
      taskKey
    } = drawingTask
    const wrapper = shallow(
      <InteractionLayerContainer
        activeMark={activeMark}
        activeTool={activeTool}
        activeToolIndex={activeToolIndex}
        height={height}
        hidingIndex={hidingIndex}
        marks={marks}
        setActiveMark={setActiveMark}
        shownMarks={shownMarks}
        taskKey={taskKey}
        width={width}
      />
    )
    expect(wrapper).to.be.ok()
  })

  it('should render PreviousMarks',  function () {
    const {
      activeMark,
      activeTool,
      activeToolIndex,
      hidingIndex,
      marks,
      setActiveMark,
      shownMarks,
      taskKey
    } = drawingTask
    const wrapper = shallow(
      <InteractionLayerContainer
        activeMark={activeMark}
        activeTool={activeTool}
        activeToolIndex={activeToolIndex}
        height={height}
        hidingIndex={hidingIndex}
        marks={marks}
        setActiveMark={setActiveMark}
        shownMarks={shownMarks}
        taskKey={taskKey}
        width={width}
      />
    )
    expect(wrapper.find(PreviousMarks)).to.have.lengthOf(1)
  })

  describe('with an active drawing task and drawing tool', function () {
    let wrapper

    before(function () {
      const {
        activeMark,
        activeTool,
        activeToolIndex,
        hidingIndex,
        marks,
        setActiveMark,
        shownMarks,
        taskKey
      } = drawingTask
      wrapper = shallow(
        <InteractionLayerContainer
          activeMark={activeMark}
          activeTool={activeTool}
          activeToolIndex={activeToolIndex}
          height={height}
          hidingIndex={hidingIndex}
          marks={marks}
          setActiveMark={setActiveMark}
          shownMarks={shownMarks}
          taskKey={taskKey}
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
      const {
        activeMark,
        activeTool,
        activeToolIndex,
        hidingIndex,
        marks,
        setActiveMark,
        shownMarks,
        taskKey
      } = transcriptionTask
      wrapper = shallow(
        <InteractionLayerContainer
          activeMark={activeMark}
          activeTool={activeTool}
          activeToolIndex={activeToolIndex}
          height={height}
          hidingIndex={hidingIndex}
          marks={marks}
          setActiveMark={setActiveMark}
          shownMarks={shownMarks}
          taskKey={taskKey}
          width={width}
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
      const {
        activeMark,
        activeTool,
        activeToolIndex,
        hidingIndex,
        marks,
        setActiveMark,
        shownMarks,
        taskKey
      } = activeTranscriptionTask
      const wrapper = shallow(
        <InteractionLayerContainer
          activeMark={activeMark}
          activeTool={activeTool}
          activeToolIndex={activeToolIndex}
          frame={0}
          height={height}
          hidingIndex={hidingIndex}
          marks={marks}
          setActiveMark={setActiveMark}
          shownMarks={shownMarks}
          taskKey={taskKey}
          width={width}
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
        const {
          activeMark,
          activeTool,
          activeToolIndex,
          hidingIndex,
          marks,
          setActiveMark,
          shownMarks,
          taskKey
        } = hidingMarksInteractionTask
        wrapper = shallow(
          <InteractionLayerContainer
            activeMark={activeMark}
            activeTool={activeTool}
            activeToolIndex={activeToolIndex}
            height={height}
            hidingIndex={hidingIndex}
            marks={marks}
            setActiveMark={setActiveMark}
            shownMarks={shownMarks}
            taskKey={taskKey}
            width={width}
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
        const {
          activeMark,
          activeTool,
          activeToolIndex,
          hidingIndex,
          marks,
          setActiveMark,
          shownMarks,
          taskKey
        } = hidingUserMarksInteractionTask
        wrapper = shallow(
          <InteractionLayerContainer
            activeMark={activeMark}
            activeTool={activeTool}
            activeToolIndex={activeToolIndex}
            height={height}
            hidingIndex={hidingIndex}
            marks={marks}
            setActiveMark={setActiveMark}
            shownMarks={shownMarks}
            taskKey={taskKey}
            width={width}
          />
        )

        const filteredMarks = wrapper.find(InteractionLayer).props().marks
        expect(filteredMarks).to.have.lengthOf(2)
      })
    })
  })
})
