import { render } from '@testing-library/react'
import { vi } from 'vitest'
import sinon from 'sinon'
import { Provider } from 'mobx-react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import LineControlsContainer from './LineControlsContainer'
import LineControls from './LineControls'
import mockStore from '@test/mockStore/mockStore.js'
import WorkflowFactory from '@test/factories/WorkflowFactory'
import DrawingTaskFactory from '@test/factories/tasks/DrawingTaskFactory'

vi.mock('./LineControls', () => ({
  default: sinon.stub()
}))

function withStore (store) {
  return function Wrapper ({ children }) {
    return (
      <Grommet theme={zooTheme}>
        <Provider classifierStore={store}>
          {children}
        </Provider>
      </Grommet>
    )
  }
}

function createStore (options = {}) {
  const {
    toolType = 'freehandLine',
    multiImageCloneMarkers = false
  } = options

  const workflowSnapshot = WorkflowFactory.build({
    configuration: {
      multi_image_clone_markers: multiImageCloneMarkers
    },
    strings: {},
    tasks: {
      T0: DrawingTaskFactory.build({
        tools: [
          {
            type: toolType
          }
        ]
      })
    }
  })

  return mockStore({ workflow: workflowSnapshot })
}

describe('Component > LineControlsContainer', () => {
  afterEach(() => {
    LineControls.reset()
  })

  describe('with active freehandLine task and mark', function () {
    let mark
    let onDelete

    before(function () {
      const store = createStore()
      const task = store.workflowSteps.findTasksByType('drawing')[0]
      mark = task.activeTool.createMark({})
      task.setActiveMark(mark)
      onDelete = task.deleteMark

      render(
        <LineControlsContainer />,
        {
          wrapper: withStore(store)
        }
      )
    })

    it('should render LineControls', function () {
      expect(LineControls).to.have.been.calledWith({
        mark,
        onDelete
      })
    })
  })

  describe('with active freehandLine task but no active mark', function () {
    before(function () {
      const store = createStore()
      const task = store.workflowSteps.findTasksByType('drawing')[0]
      task.activeTool.createMark({})

      render(
        <LineControlsContainer />,
        {
          wrapper: withStore(store)
        }
      )
    })

    it('should render nothing', function () {
      expect(LineControls).not.to.have.been.called
    })
  })

  describe('with active drawing task but not freehandLine', function () {
    before(function () {
      const store = createStore({ toolType: 'line' })
      const task = store.workflowSteps.findTasksByType('drawing')[0]
      task.activeTool.createMark({})

      render(
        <LineControlsContainer />,
        {
          wrapper: withStore(store)
        }
      )
    })

    it('should render nothing', function () {
      expect(LineControls).not.to.have.been.called
    })
  })

  describe('with showMarks = SHOWN_MARKS.NONE and hidden mark', function () {
    let task
    let mark

    before(function () {
      const store = createStore()
      task = store.workflowSteps.findTasksByType('drawing')[0]
      mark = task.activeTool.createMark({ id: '1' })
      task.setActiveMark(mark)
      task.togglePreviousMarks()

      render(
        <LineControlsContainer />,
        {
          wrapper: withStore(store)
        }
      )
    })

    it('should render nothing', function () {
      expect(task.hiddenMarkIds.includes(mark.id)).to.be.true
      expect(LineControls).not.to.have.been.called
    })
  })

  describe('with hidden marks not including activeMark', function () {
    before(function () {
      const store = createStore()
      const task = store.workflowSteps.findTasksByType('drawing')[0]
      task.activeTool.createMark({ id: '1' })
      task.togglePreviousMarks() // hide the first mark
      const mark = task.activeTool.createMark({ id: '2' })
      task.setActiveMark(mark)

      render(
        <LineControlsContainer />,
        {
          wrapper: withStore(store)
        }
      )
    })

    it('should render LineControls', function () {
      expect(LineControls).to.have.been.called
    })
  })

  describe('with mark.frame = frame', function () {
    before(function () {
      const store = createStore()
      const task = store.workflowSteps.findTasksByType('drawing')[0]
      const mark = task.activeTool.createMark({ id: '1', frame: 1 })
      task.setActiveMark(mark)

      render(
        <LineControlsContainer frame={1} />,
        {
          wrapper: withStore(store)
        }
      )
    })

    it('should render LineControls', function () {
      expect(LineControls).to.have.been.called
    })
  })

  describe('with mark.frame != frame', function () {
    before(function () {
      const store = createStore()
      const task = store.workflowSteps.findTasksByType('drawing')[0]
      const mark = task.activeTool.createMark({ id: '1', frame: 1 })
      task.setActiveMark(mark)

      render(
        <LineControlsContainer frame={2} />,
        {
          wrapper: withStore(store)
        }
      )
    })

    it('should render nothing', function () {
      expect(LineControls).not.to.have.been.called
    })
  })

  describe('with mark.frame != frame and multiImageCloneMarkers = true', function () {
    before(function () {
      const store = createStore({ multiImageCloneMarkers: true })
      const task = store.workflowSteps.findTasksByType('drawing')[0]
      const mark = task.activeTool.createMark({ id: '1', frame: 1 })
      task.setActiveMark(mark)

      render(
        <LineControlsContainer frame={2} />,
        {
          wrapper: withStore(store)
        }
      )
    })

    it('should render LineControls', function () {
      expect(LineControls).to.have.been.called
    })
  })
})
