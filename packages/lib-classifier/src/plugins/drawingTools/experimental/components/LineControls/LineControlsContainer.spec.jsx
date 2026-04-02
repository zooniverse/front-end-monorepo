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

function withStore(store) {
  return function Wrapper({ children }) {
    return (
      <Grommet theme={zooTheme}>
        <Provider classifierStore={store}>
          {children}
        </Provider>
      </Grommet>
    )
  }
}

describe('Component > LineControlsContainer', () => {
  afterEach(() => {
    LineControls.reset()
  })

  describe('with active freehandLine task and mark', function () {
    const workflowSnapshot = WorkflowFactory.build({
      strings: {},
      tasks: {
        T0: DrawingTaskFactory.build({
          tools: [
            {
              type: 'freehandLine'
            }
          ]
        })
      }
    })

    let mark
    let onDelete

    before(function () {
      const store = mockStore({workflow: workflowSnapshot})
      const task = store.workflowSteps.findTasksByType('drawing')[0]
      mark = task.activeTool.createMark({})
      task.setActiveMark(mark)
      onDelete = task.deleteMark
      
      render(
        <LineControlsContainer/>,
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
    const workflowSnapshot = WorkflowFactory.build({
      strings: {},
      tasks: {
        T0: DrawingTaskFactory.build({
          tools: [
            {
              type: 'freehandLine'
            }
          ]
        })
      }
    })

    before(function () {
      const store = mockStore({workflow: workflowSnapshot})
      const task = store.workflowSteps.findTasksByType('drawing')[0]
      task.activeTool.createMark({})
      
      render(
        <LineControlsContainer/>,
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
    const workflowSnapshot = WorkflowFactory.build({
      strings: {},
      tasks: {
        T0: DrawingTaskFactory.build({
          tools: [
            {
              type: 'line'
            }
          ]
        })
      }
    })

    before(function () {
      const store = mockStore({workflow: workflowSnapshot})
      const task = store.workflowSteps.findTasksByType('drawing')[0]
      task.activeTool.createMark({})
      
      render(
        <LineControlsContainer/>,
        {
          wrapper: withStore(store)
        }
      )

    })

    it('should render nothing', function () {
      expect(LineControls).not.to.have.been.called
    })
  })
})
