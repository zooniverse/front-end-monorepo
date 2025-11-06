import { render, waitFor } from '@testing-library/react'
import { Provider } from 'mobx-react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import SHOWN_MARKS from '@helpers/shownMarks'
import { WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import PreviousMarks from './PreviousMarks'

describe('Component > PreviousMarks', function () {
  const workflow = WorkflowFactory.build({
    tasks: {
      // active transcription task
      'T1': {
        type: 'transcription',
        tools: [{
          type: 'transcriptionLine'
        }]
      },
      // inactive drawing task
      'T2': {
        type: 'drawing',
        tools: [{
          type: 'point'
        }]
      },
      // inactive transcription task
      'T3': {
        type: 'transcription',
        tools: [{
          type: 'transcriptionLine'
        }]
      }
    }
  })
  let store

  beforeEach(function () {
    store = mockStore({ workflow })

    const [ pointTask ] = store.workflowSteps.steps.get('S2').tasks
    const [ lineTask ] = store.workflowSteps.steps.get('S3').tasks
    const [ pointTool ] = pointTask.tools
    const [ lineTool ] = lineTask.tools

    // previous drawing marks
    pointTool.createMark({ id: 'point1', frame: 0, toolIndex: 0, x: 100, y: 200 })
    pointTask.validate()
    store.classifications.addAnnotation(pointTask, ['point1'])

    // previous drawing marks
    lineTool.createMark({ id: 'line1', frame: 0, toolIndex: 0, x1: 100, y1: 200, x2: 150, y2: 200 })
    lineTool.createMark({ id: 'line2', frame: 0, toolIndex: 0, x1: 200, y1: 300, x2: 250, y2: 300 },)
    lineTool.createMark({ id: 'line3', frame: 1, toolIndex: 0, x1: 150, y1: 250, x2: 100, y2: 250 },)
    lineTool.createMark({ id: 'line4', frame: 1, toolIndex: 0, x1: 250, y1: 350, x2: 200, y2: 350 })
    lineTask.validate()
    store.classifications.addAnnotation(lineTask, ['line1', 'line2', 'line3', 'line4'])
  })

  function withStore(store) {
    return function Wrapper({ children }) {
      return (
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            <svg>
              {children}
            </svg>
          </Provider>
        </Grommet>
      )
    }
  }

  it('should render without crashing', function () {
    render(
      <PreviousMarks />,
      {
        wrapper: withStore(store)
      }
    )
  })

  it('should ignore pointer events on all drawn marks', function () {
    render(
      <PreviousMarks scale={2} />,
      {
        wrapper: withStore(store)
      }
    )
    const marksGroups = document.querySelectorAll('g.markGroup')
    marksGroups.forEach( group => {
      expect(group.getAttribute('pointer-events')).to.equal('none')
    })
  })

  describe('when there are no drawing task annotations', function () {
    it('should not render any marks', function () {
      render(
        <PreviousMarks />,
        {
          wrapper: withStore(mockStore({ workflow }))
        }
      )
      const marks = document.querySelectorAll('g.drawingMark')
      expect(marks).to.have.lengthOf(0)
    })
  })

  describe('when there are drawing task annotations', function () {
    it('should render disabled drawing marks per task for frame 0', async function () {
      render(
        <PreviousMarks frame={0} />,
        {
          wrapper: withStore(store)
        }
      )
      let marks = document.querySelectorAll('g.drawingMark')
      expect(marks).to.have.lengthOf(3)
      marks.forEach(mark => {
        expect(mark.getAttribute('aria-disabled')).to.equal('true')
        expect(mark.getAttribute('tabindex')).to.equal('-1')
      })
    })

    it('should render disabled drawing marks per task for frame 1', async function () {
      render(
        <PreviousMarks frame={1} />,
        {
          wrapper: withStore(store)
        }
      )

      const marks = document.querySelectorAll('g.drawingMark')
      expect(marks).to.have.lengthOf(2)
      marks.forEach(mark => {
        expect(mark.getAttribute('aria-disabled')).to.equal('true')
        expect(mark.getAttribute('tabindex')).to.equal('-1')
      })
    })
  })

  describe('when shown transcription marks is USER', function () {
    it('should not render marks if there are no annotations', function () {
      render(
        <PreviousMarks />,
        {
          wrapper: withStore(mockStore({ workflow }))
        }
      )
      expect(store.workflowSteps.interactionTask.shownMarks).to.equal(SHOWN_MARKS.ALL)
      store.workflowSteps.interactionTask.togglePreviousMarks(SHOWN_MARKS.USER)
      expect(store.workflowSteps.interactionTask.shownMarks).to.equal(SHOWN_MARKS.USER)
      let marks = document.querySelectorAll('g.drawingMark')
      expect(marks).to.have.lengthOf(0)
    })

    it('should render marks if there are also annotations', function () {
      render(
        <PreviousMarks />,
        {
          wrapper: withStore(store)
        }
      )
      expect(store.workflowSteps.interactionTask.shownMarks).to.equal(SHOWN_MARKS.ALL)
      store.workflowSteps.interactionTask.togglePreviousMarks(SHOWN_MARKS.USER)
      expect(store.workflowSteps.interactionTask.shownMarks).to.equal(SHOWN_MARKS.USER)
      const marks = document.querySelectorAll('g.drawingMark')
      expect(marks).to.have.lengthOf(3)
    })
  })

  describe('when shown marks is NONE', function () {
    it('should not show any marks', async function ()  {
      render(
        <PreviousMarks />,
        {
          wrapper: withStore(store)
        }
      )
      expect(store.workflowSteps.interactionTask.shownMarks).to.equal(SHOWN_MARKS.ALL)
      store.workflowSteps.interactionTask.togglePreviousMarks(SHOWN_MARKS.NONE)
      expect(store.workflowSteps.interactionTask.shownMarks).to.equal(SHOWN_MARKS.NONE)
      await waitFor(() => {
        const marks = document.querySelectorAll('g.drawingMark')
        expect(marks).to.have.lengthOf(0)
      })
    })
  })
})
