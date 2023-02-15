import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { when } from 'mobx'
import { Provider } from 'mobx-react'
import sinon from 'sinon'

import TranscribedLines from './'

import SHOWN_MARKS from '@helpers/shownMarks'
import RootStore from '@store'
import { reducedSubject } from '@store/subjects/Subject/TranscriptionReductions/mocks'
import { WorkflowFactory } from '@test/factories'
import mockStore, { defaultClient } from '@test/mockStore/mockStore.js'

describe('Component > TranscribedLinesConnector', function () {
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

  const workflowSnapshot = WorkflowFactory.build({
    id: '5339',
    display_name: 'A test workflow',
    steps: [
      ['S1', { stepKey: 'S1', taskKeys: ['T0']}]
    ],
    strings: {
      display_name: 'a test workflow',
      'tasks.T0.instruction': 'Transcribe a line',
      'tasks.T0.tools.0.details.0.instruction': 'Transcribe the text'
    },
    tasks: {
      T0: {
        instruction: 'Transcribe a line',
        type: 'transcription',
        tools: [
          {
            details: [
              {
                instruction: 'Transcribe the text',
                required: 'true',
                taskKey: 'T0.0',
                type: 'text'
              },
            ],
            type: 'transcriptionLine'
          }
        ]
      }
    },
    version: '0.0'
  })
  const mockReductions = {
    workflow: {
      subject_reductions: [{ data: reducedSubject }]
    }
  }
  const client = {
    caesar: {
      request: sinon.stub().resolves(mockReductions)
    }
  }

  it('should render without crashing', function () {
    const store = mockStore({
      client,
      workflow: workflowSnapshot
    })
    render(<TranscribedLines />, { wrapper: withStore(store) })
  })

  describe('when the workflow does not have a transcription task', function () {
    it('should hide TranscribedLines', function () {
      const store = mockStore({
        client
      })
      render(<TranscribedLines />, { wrapper: withStore(store) })
      const lines = document.querySelectorAll('g.line')
      expect(lines).to.have.lengthOf(0)
    })
  })

  describe('when the workflow does have a transcription task and subject does have consensus lines', function () {
    it('should show TranscribedLines', async function () {
      const store = mockStore({
        client,
        workflow: workflowSnapshot
      })
      render(<TranscribedLines />, { wrapper: withStore(store) })
      const { transcriptionReductions } = store.subjects.active
      await when(() => transcriptionReductions.reductions.length > 0)
      const lines = document.querySelectorAll('g.line')
      const completeLines = document.querySelectorAll('g.complete.line')
      const transcribedLines = document.querySelectorAll('g.transcribed.line')
      // Frame 0 has seven finished lines and two transcribed lines.
      expect(lines).to.have.lengthOf(9)
      expect(completeLines).to.have.lengthOf(7)
      expect(transcribedLines).to.have.lengthOf(2)
    })

    it('should render lines per frame', async function () {
      const store = mockStore({
        client,
        workflow: workflowSnapshot
      })
      store.subjectViewer.setFrame(1)
      render(<TranscribedLines />, { wrapper: withStore(store) })
      const { transcriptionReductions } = store.subjects.active
      await when(() => transcriptionReductions.reductions.length > 0)
      const lines = document.querySelectorAll('g.line')
      // Frame 1 has one line.
      expect(lines).to.have.lengthOf(1)
    })

    it('should hide TranscribedLines if no lines per frame', async function () {
      const store = mockStore({
        client,
        workflow: workflowSnapshot
      })
      store.subjectViewer.setFrame(3)
      render(<TranscribedLines />, { wrapper: withStore(store) })
      const { transcriptionReductions } = store.subjects.active
      await when(() => transcriptionReductions.reductions.length > 0)
      const lines = document.querySelectorAll('g.line')
      // Frame 3 has no lines.
      expect(lines).to.have.lengthOf(0)
    })

    it('should hide TranscribedLines if showing only user marks', async function () {
      const store = mockStore({
        client,
        workflow: workflowSnapshot
      })
      const [task] = store.workflowSteps.findTasksByType('transcription')
      task.togglePreviousMarks(SHOWN_MARKS.USER)
      render(<TranscribedLines />, { wrapper: withStore(store) })
      const { transcriptionReductions } = store.subjects.active
      await when(() => transcriptionReductions.reductions.length > 0)
      const lines = document.querySelectorAll('g.line')
      expect(lines).to.have.lengthOf(0)
    })

    it('should hide TranscribedLines if hiding all marks', async function () {
      const store = mockStore({
        client,
        workflow: workflowSnapshot
      })
      const [task] = store.workflowSteps.findTasksByType('transcription')
      task.togglePreviousMarks(SHOWN_MARKS.NONE)
      render(<TranscribedLines />, { wrapper: withStore(store) })
      const { transcriptionReductions } = store.subjects.active
      await when(() => transcriptionReductions.reductions.length > 0)
      const lines = document.querySelectorAll('g.line')
      expect(lines).to.have.lengthOf(0)
    })

    it('should disable transcribed lines when a new mark is being created', function () {
      const store = mockStore({
        client,
        workflow: workflowSnapshot
      })
      const [task] = store.workflowSteps.findTasksByType('transcription')
      task.activeTool.createMark()
      expect(store.workflowSteps.active.isValid).to.be.false()
      render(<TranscribedLines />, { wrapper: withStore(store) })
      const lines = document.querySelectorAll('g.transcribed.line')
      lines.forEach(line => {
        expect(line.getAttribute('aria-disabled')).to.equal('true')
        expect(line.tabIndex).to.equal(-1)
        expect(line.onclick).to.be.null()
      })
    })
  })
})
