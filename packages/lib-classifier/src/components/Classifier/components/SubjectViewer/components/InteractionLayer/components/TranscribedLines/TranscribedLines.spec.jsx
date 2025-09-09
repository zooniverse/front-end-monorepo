import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'
import { auth } from '@zooniverse/panoptes-js'
import { Grommet } from 'grommet'
import { when } from 'mobx'
import { Provider } from 'mobx-react'
import sinon from 'sinon'

import SHOWN_MARKS from '@helpers/shownMarks'
// import * as tasks from '@plugins/tasks'
import { reducedSubject } from '@store/subjects/Subject/TranscriptionReductions/mocks'
import { WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore/mockStore.js'

// import TranscribedLines from '.'

// Must be skipped due to unexpect behavior of the above import in Vitest env
// https://github.com/zooniverse/front-end-monorepo/issues/7018
describe.skip('Component > TranscribedLines', function () {
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
      ['S1', { stepKey: 'S1', taskKeys: ['T0']}],
      ['S2', { stepKey: 'S2', taskKeys: ['T1']}]
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
      },
      T1: {
        instruction: 'Have you finished?',
        type: 'single',
        answers: ['yes', 'no']
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

  // const { TaskModel } = tasks.transcription

  it('should render without crashing', function () {
    const store = mockStore({ client, workflow: workflowSnapshot })
    const task = store.workflowSteps.findTasksByType('transcription')[0]
    task.setActiveTool(0)
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
      const subject = store.subjects.active
      await when(() => subject.caesarReductions?.reductions.length > 0)
      // Frame 0 has seven finished lines and two transcribed lines.
      await waitFor(() => expect(document.querySelectorAll('g.line')).to.have.lengthOf(9))
      const completeLines = document.querySelectorAll('g.complete.line')
      const transcribedLines = document.querySelectorAll('g.transcribed.line')
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
      const subject = store.subjects.active
      await when(() => subject.caesarReductions?.reductions.length > 0)
      // Frame 1 has one line.
      await waitFor(() => expect(document.querySelectorAll('g.line')).to.have.lengthOf(1))
    })

    it('should hide TranscribedLines if no lines per frame', async function () {
      const store = mockStore({
        client,
        workflow: workflowSnapshot
      })
      store.subjectViewer.setFrame(3)
      render(<TranscribedLines />, { wrapper: withStore(store) })
      const subject = store.subjects.active
      await when(() => subject.caesarReductions?.reductions.length > 0)
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
      const subject = store.subjects.active
      await when(() => subject.caesarReductions?.reductions.length > 0)
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
      const subject = store.subjects.active
      await when(() => subject.caesarReductions?.reductions.length > 0)
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
      expect(store.workflowSteps.active.isValid).to.equal(false)
      render(<TranscribedLines />, { wrapper: withStore(store) })
      const lines = document.querySelectorAll('g.transcribed.line')
      lines.forEach(line => {
        expect(line.getAttribute('aria-disabled')).to.equal('true')
        expect(line.tabIndex).to.equal(-1)
        expect(line.onclick).to.equal(null)
      })
    })
  })

  describe('when on a step without the transcription task', function () {
    let task

    beforeEach(async function () {
      const store = mockStore({ client, workflow: workflowSnapshot })
      task = store.workflowSteps.findTasksByType('transcription')[0]
      task.setActiveTool(0)
      render(<TranscribedLines />, { wrapper: withStore(store) })
      const subject = store.subjects.active
      await when(() => subject.caesarReductions?.reductions.length > 0)
      store.workflowSteps.selectStep('S2')
    })

    it('should disable the incomplete lines', async function () {
      await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
      const transcribedLines = document.querySelectorAll('g.transcribed.line')
      transcribedLines.forEach((line) => {
        expect(line.getAttribute('aria-disabled')).to.equal('true')
      })
    })

    it('should not create a mark', async function () {
      await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
      const user = userEvent.setup({ delay: null })
      const line = document.querySelector('g.transcribed.line')
      expect(task.activeMark).to.equal(undefined)
      await user.click(line)
      expect(task.activeMark).to.equal(undefined)
      line.focus()
      await user.keyboard('{Enter}')
      expect(task.activeMark).to.equal(undefined)
      line.focus()
      await user.keyboard('{ }')
      expect(task.activeMark).to.equal(undefined)
    })

    it('should not disable the complete lines', function () {
      const completedLines = document.querySelectorAll('g.complete.line')
      completedLines.forEach((line) => {
        expect(line.getAttribute('aria-disabled')).to.equal('false')
      })
    })
  })

  describe('incomplete lines', function () {
    let consensusLines
    let task

    describe('default behaviour', function () {
      beforeEach(async function () {
        const store = mockStore({ client, workflow: workflowSnapshot })
        task = store.workflowSteps.findTasksByType('transcription')[0]
        task.setActiveTool(0)
        render(<TranscribedLines />, { wrapper: withStore(store) })
        const subject = store.subjects.active
        await when(() => subject.caesarReductions?.reductions.length > 0)
        consensusLines = subject.caesarReductions.consensusLines(0)
      })

      it('should render', async function () {
        await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
        const lines = document.querySelectorAll('g.transcribed.line')
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        expect(lines).to.have.lengthOf(transcribedLines.length)
      })

      it('should not be disabled', async function () {
        await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
        const lines = document.querySelectorAll('g.transcribed.line')
        lines.forEach(line => {
          expect(line.getAttribute('aria-disabled')).to.equal('false')
        })
      })

      it('should be focusable', async function () {
        await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
        const lines = document.querySelectorAll('g.transcribed.line')
        lines.forEach(line => {
          expect(line.tabIndex).to.equal(0)
        })
      })
    })

    describe('when there is an existing invalid mark', function () {
      let task

      beforeEach(async function () {
        const store = mockStore({ client, workflow: workflowSnapshot })
        task = store.workflowSteps.findTasksByType('transcription')[0]
        task.setActiveTool(0)
        render(<TranscribedLines />, { wrapper: withStore(store) })
        const subject = store.subjects.active
        await when(() => subject.caesarReductions?.reductions.length > 0)
        await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
        consensusLines = subject.caesarReductions.consensusLines(0)
        const [ transcribedLine ] = consensusLines.filter(line => !line.consensusReached)
        const { id, x1, y1 } = transcribedLine
        task.activeTool.createMark({ id, x1, y1, toolIndex: 0 })
      })

      it('should disable the lines', async function () {
        await waitFor(() => expect(document.querySelectorAll('g.line[aria-disabled="true"]')).to.not.be.empty())
        document.querySelectorAll('g.transcribed.line').forEach(line => {
          expect(line.getAttribute('aria-disabled')).to.equal('true')
          expect(line.tabIndex).to.equal(-1)
        })
      })
    })

    describe('when there is an existing volunteer mark created from a previous consensus mark', function () {
      beforeEach(async function () {
        const store = mockStore({ client, workflow: workflowSnapshot })
        render(<TranscribedLines />, { wrapper: withStore(store) })
        const subject = store.subjects.active
        await when(() => subject.caesarReductions?.reductions.length > 0)
        await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
        const consensusLines = store.subjects.active.caesarReductions.consensusLines(0)
        const [ transcribedLine ] = consensusLines.filter(line => !line.consensusReached)
        const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = transcribedLine.points
        const { id } = transcribedLine
        const [task] = store.workflowSteps.findTasksByType('transcription')
        task.activeTool.createMark({ id, x1, y1, x2, y2, toolIndex: 0 })
      })

      it('should disable the existing mark', async function () {
        await waitFor(() => expect(document.querySelectorAll('g.line[aria-disabled="true"]')).to.not.be.empty())
        const previousMark = document.querySelector('[aria-describedby=transcribed-0]')
        expect(previousMark.getAttribute('aria-disabled')).to.equal('true')
      })

      it('should leave other previous marks interactive', async function () {
        await waitFor(() => expect(document.querySelectorAll('g.line[aria-disabled="true"]')).to.not.be.empty())
        const previousMark = document.querySelector('[aria-describedby=transcribed-1]')
        expect(previousMark.getAttribute('aria-disabled')).to.equal('false')
        expect(previousMark.onclick).to.be.a('function')
      })
    })

    describe('on click', function () {
      let consensusLines, store, task, user

      beforeEach(async function () {
        store = mockStore({ client, workflow: workflowSnapshot })
        render(<TranscribedLines />, { wrapper: withStore(store) })
        const subject = store.subjects.active
        await when(() => subject.caesarReductions?.reductions.length > 0)
        task = store.workflowSteps.findTasksByType('transcription')[0]
        task.setActiveTool(0)
        user = userEvent.setup({ delay: null })
        task.reset()
        consensusLines = store.subjects.active.caesarReductions.consensusLines(0)
      })

      it('should create a new mark', async function () {
        await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
        let line = document.querySelector('g.transcribed.line')
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        expect(task.marks.length).to.equal(0)
        expect(task.activeMark).to.equal(undefined)
        expect(line.getAttribute('aria-disabled')).to.equal('false')
        expect(line.tabIndex).to.equal(0)
        await user.click(line)
        await waitFor(() => {
          const line = document.querySelector('g.transcribed.line')
          expect(line.getAttribute('aria-disabled')).to.equal('true')
          expect(line.tabIndex).to.equal(-1)
        })
        await when(() => task.marks.length > 0)
        expect(task.marks.length).to.equal(1)
        expect(task.activeMark).to.exist
        expect(task.activeMark.x1).to.equal(transcribedLines[0].points[0].x)
        expect(task.activeMark.y1).to.equal(transcribedLines[0].points[0].y)
        expect(task.activeMark.x2).to.equal(transcribedLines[0].points[1].x)
        expect(task.activeMark.y2).to.equal(transcribedLines[0].points[1].y)
        expect(task.activeMark.frame).to.equal(transcribedLines[0].frame)
        task.setActiveMark(undefined)
      })

      it('should create only one mark per transcribed line', async function () {
        await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
        let line = document.querySelector('g.transcribed.line')
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        await user.click(line)
        expect(task.marks.length).to.equal(1)
        expect(task.activeMark).to.exist
        await waitFor(() => {
          const line = document.querySelector('g.transcribed.line')
          expect(line.getAttribute('aria-disabled')).to.equal('true')
          expect(line.tabIndex).to.equal(-1)
        })
        await user.click(line)
        await when(() => task.activeMark !== undefined)
        expect(task.marks.length).to.equal(1)
        expect(task.activeMark).to.exist
        expect(task.activeMark.x1).to.equal(transcribedLines[0].points[0].x)
        expect(task.activeMark.y1).to.equal(transcribedLines[0].points[0].y)
        expect(task.activeMark.x2).to.equal(transcribedLines[0].points[1].x)
        expect(task.activeMark.y2).to.equal(transcribedLines[0].points[1].y)
        expect(task.activeMark.frame).to.equal(transcribedLines[0].frame)
        task.setActiveMark(undefined)
      })

      it('should create a mark for the correct frame', async function () {
        store.subjectViewer.setFrame(1)
        const consensusLines = store.subjects.active.caesarReductions.consensusLines(1)
        task = store.workflowSteps.findTasksByType('transcription')[0]
        task.setActiveTool(0)
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        expect(task.activeMark).to.equal(undefined)
        await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
        let line = document.querySelector('g.transcribed.line')
        await user.click(line)
        await waitFor(() => {
          const line = document.querySelector('g.transcribed.line')
          expect(line.getAttribute('aria-disabled')).to.equal('true')
          expect(line.tabIndex).to.equal(-1)
        })
        await when(() => task.marks.length > 0)
        expect(task.marks.length).to.equal(1)
        expect(task.activeMark).to.exist
        expect(task.activeMark.frame).to.equal(1)
        expect(task.activeMark.frame).to.equal(transcribedLines[0].frame)
        task.setActiveMark(undefined)
      })
    })

    describe('on Enter', function () {
      let consensusLines, store, task, user

      beforeEach(async function () {
        store = mockStore({ client, workflow: workflowSnapshot })
        render(<TranscribedLines />, { wrapper: withStore(store) })
        const subject = store.subjects.active
        await when(() => subject.caesarReductions?.reductions.length > 0)
        user = userEvent.setup({ delay: null })
        consensusLines = store.subjects.active.caesarReductions.consensusLines(0)
        task = store.workflowSteps.findTasksByType('transcription')[0]
        task.setActiveTool(0)
      })

      it('should create new marks', async function () {
        await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
        let line = document.querySelector('g.transcribed.line')
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        expect(task.marks.length).to.equal(0)
        expect(task.activeMark).to.equal(undefined)
        line.focus()
        expect(line.getAttribute('aria-disabled')).to.equal('false')
        expect(line.tabIndex).to.equal(0)
        await user.keyboard('{Enter}')
        await waitFor(() => {
          const line = document.querySelector('g.transcribed.line')
          expect(line.getAttribute('aria-disabled')).to.equal('true')
          expect(line.tabIndex).to.equal(-1)
        })
        await when(() => task.marks.length === 1)
        expect(task.activeMark).to.exist
        expect(task.activeMark.x1).to.equal(transcribedLines[0].points[0].x)
        expect(task.activeMark.y1).to.equal(transcribedLines[0].points[0].y)
        expect(task.activeMark.x2).to.equal(transcribedLines[0].points[1].x)
        expect(task.activeMark.y2).to.equal(transcribedLines[0].points[1].y)
        expect(task.activeMark.frame).to.equal(transcribedLines[0].frame)
        expect(task.marks.length).to.equal(1)
        task.setActiveMark(undefined)
      })

      it('should create only one mark per transcribed line', async function () {
        await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
        let line = document.querySelector('g.transcribed.line')
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        line.focus()
        await user.keyboard('{Enter}')
        expect(task.marks.length).to.equal(1)
        expect(task.activeMark).to.exist
        await waitFor(() => {
          const line = document.querySelector('g.transcribed.line')
          expect(line.getAttribute('aria-disabled')).to.equal('true')
          expect(line.tabIndex).to.equal(-1)
        })
        await user.keyboard('{Enter}')
        await when(() => task.activeMark !== undefined)
        expect(task.activeMark).to.exist
        expect(task.activeMark.x1).to.equal(transcribedLines[0].points[0].x)
        expect(task.activeMark.y1).to.equal(transcribedLines[0].points[0].y)
        expect(task.activeMark.x2).to.equal(transcribedLines[0].points[1].x)
        expect(task.activeMark.y2).to.equal(transcribedLines[0].points[1].y)
        expect(task.marks.length).to.equal(1)
        task.setActiveMark(undefined)
      })

      it('should create a mark for the correct frame', async function () {
        const consensusLines = store.subjects.active.caesarReductions.consensusLines(1)
        store.subjectViewer.setFrame(1)
        task = store.workflowSteps.findTasksByType('transcription')[0]
        task.setActiveTool(0)
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
        let line = document.querySelector('g.transcribed.line')
        line.focus()
        await user.keyboard('{Enter}')
        await waitFor(() => {
          const line = document.querySelector('g.transcribed.line')
          expect(line.getAttribute('aria-disabled')).to.equal('true')
          expect(line.tabIndex).to.equal(-1)
        })
        await when(() => task.marks.length === 1)
        expect(task.activeMark).to.exist
        expect(task.activeMark.frame).to.equal(1)
        expect(task.activeMark.frame).to.equal(transcribedLines[0].frame)
        task.setActiveMark(undefined)
      })
    })

    describe('on Space', function () {
      let consensusLines, store, task, user

      beforeEach(async function () {
        store = mockStore({ client, workflow: workflowSnapshot })
        render(<TranscribedLines />, { wrapper: withStore(store) })
        const subject = store.subjects.active
        await when(() => subject.caesarReductions?.reductions.length > 0)
        user = userEvent.setup({ delay: null })
        consensusLines = store.subjects.active.caesarReductions.consensusLines(0)
        task = store.workflowSteps.findTasksByType('transcription')[0]
        task.setActiveTool(0)
      })

      it('should create a new mark', async function () {
        await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
        let line = document.querySelector('g.transcribed.line')
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        expect(task.marks.length).to.equal(0)
        expect(task.activeMark).to.equal(undefined)
        line.focus()
        expect(line.getAttribute('aria-disabled')).to.equal('false')
        expect(line.tabIndex).to.equal(0)
        await user.keyboard('{ }')
        await waitFor(() => {
          const line = document.querySelector('g.transcribed.line')
          expect(line.getAttribute('aria-disabled')).to.equal('true')
          expect(line.tabIndex).to.equal(-1)
        })
        await when(() => task.marks.length === 1)
        expect(task.activeMark).to.exist
        expect(task.activeMark.x1).to.equal(transcribedLines[0].points[0].x)
        expect(task.activeMark.y1).to.equal(transcribedLines[0].points[0].y)
        expect(task.activeMark.x2).to.equal(transcribedLines[0].points[1].x)
        expect(task.activeMark.y2).to.equal(transcribedLines[0].points[1].y)
        expect(task.activeMark.frame).to.equal(transcribedLines[0].frame)
        expect(task.marks.length).to.equal(1)
        task.setActiveMark(undefined)
      })

      it('should create only one mark per transcribed line', async function () {
        await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
        let line = document.querySelector('g.transcribed.line')
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        line.focus()
        await user.keyboard(' ')
        expect(task.marks.length).to.equal(1)
        expect(task.activeMark).to.exist
        await waitFor(() => {
          const line = document.querySelector('g.transcribed.line')
          expect(line.getAttribute('aria-disabled')).to.equal('true')
          expect(line.tabIndex).to.equal(-1)
        })
        await user.keyboard(' ')
        await when(() => task.activeMark !== undefined)
        expect(task.activeMark).to.exist
        expect(task.activeMark.x1).to.equal(transcribedLines[0].points[0].x)
        expect(task.activeMark.y1).to.equal(transcribedLines[0].points[0].y)
        expect(task.activeMark.x2).to.equal(transcribedLines[0].points[1].x)
        expect(task.activeMark.y2).to.equal(transcribedLines[0].points[1].y)
        expect(task.marks.length).to.equal(1)
        task.setActiveMark(undefined)
      })

      it('should create a mark for the correct frame', async function () {
        const consensusLines = store.subjects.active.caesarReductions.consensusLines(1)
        store.subjectViewer.setFrame(1)
        task = store.workflowSteps.findTasksByType('transcription')[0]
        task.setActiveTool(0)
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
        let line = document.querySelector('g.transcribed.line')
        line.focus()
        await user.keyboard('{ }')
        await waitFor(() => {
          const line = document.querySelector('g.transcribed.line')
          expect(line.getAttribute('aria-disabled')).to.equal('true')
          expect(line.tabIndex).to.equal(-1)
        })
        await when(() => task.marks.length === 1)
        expect(task.activeMark).to.exist
        expect(task.activeMark.frame).to.equal(1)
        expect(task.activeMark.frame).to.equal(transcribedLines[0].frame)
        task.setActiveMark(undefined)
      })
    })

    it.skip('should have an explanatory tooltip', function () {
      lines.forEach((component, index) => {
        const tooltip = document.querySelector(`#transcribed-${index}`)
        expect(tooltip).to.have.lengthOf(1)
      })
    })
  })

  describe('completed lines', function () {
    let completeLines, lines, task

    before(async function () {
      const store = mockStore({ client, workflow: workflowSnapshot })
      render(<TranscribedLines />, { wrapper: withStore(store) })
      const subject = store.subjects.active
      await when(() => subject.caesarReductions?.reductions.length > 0)
      task = store.workflowSteps.findTasksByType('transcription')[0]
      task.setActiveTool(0)
      await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
      lines = document.querySelectorAll('g.complete.line')
      const consensusLines = subject.caesarReductions.consensusLines(0)
      completeLines = consensusLines.filter(line => line.consensusReached)
    })

    it('should render', function () {
      expect(lines).to.have.lengthOf(completeLines.length)
    })

    it('should be labelled with the consensus text', function () {
      lines.forEach((line, index) => {
        expect(line.getAttribute('aria-label')).to.equal(completeLines[index].consensusText)
      })
    })

    it('should be focusable', function () {
      lines.forEach(line => {
        expect(line.tabIndex).to.equal(0)
      })
    })

    it.skip('should have an explanatory tooltip', function () {
      lines.forEach((component, index) => {
        const tooltip = document.querySelector(`#complete-${index}`)
        expect(tooltip).to.have.lengthOf(1)
      })
    })

    it('should show the ConsensusPopup onClick', async function () {
      const user = userEvent.setup({ delay: null })
      const store = mockStore({ client, workflow: workflowSnapshot })
      render(<TranscribedLines />, { wrapper: withStore(store) })
      const subject = store.subjects.active
      await when(() => subject.caesarReductions?.reductions.length > 0)
      await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
      const task = store.workflowSteps.findTasksByType('transcription')[0]
      task.setActiveTool(0)
      const line = document.querySelector('g.complete.line')
      const popupTitle = 'SubjectViewer.InteractionLayer.TranscribedLines.ConsensusPopup.title'
      let popup = screen.queryByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.equal(null)
      await user.click(line)
      popup = await screen.findByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.exist
      const closeButton = screen.queryByRole('button', { name: 'Close' })
      await user.click(closeButton)
      popup = screen.queryByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.equal(null)
    })

    it('should show the ConsensusPopup onKeyDown with enter', async function () {
      const user = userEvent.setup({ delay: null })
      const store = mockStore({ client, workflow: workflowSnapshot })
      render(<TranscribedLines />, { wrapper: withStore(store) })
      const subject = store.subjects.active
      await when(() => subject.caesarReductions?.reductions.length > 0)
      await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
      const task = store.workflowSteps.findTasksByType('transcription')[0]
      task.setActiveTool(0)
      const line = document.querySelector('g.complete.line')
      const popupTitle = 'SubjectViewer.InteractionLayer.TranscribedLines.ConsensusPopup.title'
      let popup = screen.queryByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.equal(null)
      line.focus()
      await user.keyboard('{Enter}')
      popup = await screen.findByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.exist
      const closeButton = screen.queryByRole('button', { name: 'Close' })
      closeButton.focus()
      await user.keyboard('{Enter}')
      popup = screen.queryByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.equal(null)
    })

    it('should show the ConsensusPopup onKeyDown with space', async function () {
      const user = userEvent.setup({ delay: null })
      const store = mockStore({ client, workflow: workflowSnapshot })
      render(<TranscribedLines />, { wrapper: withStore(store) })
      const subject = store.subjects.active
      await when(() => subject.caesarReductions?.reductions.length > 0)
      await waitFor(() => expect(document.querySelectorAll('g.line')).to.not.be.empty())
      const task = store.workflowSteps.findTasksByType('transcription')[0]
      task.setActiveTool(0)
      const line = document.querySelector('g.complete.line')
      const popupTitle = 'SubjectViewer.InteractionLayer.TranscribedLines.ConsensusPopup.title'
      let popup = screen.queryByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.equal(null)
      line.focus()
      await user.keyboard('{ }')
      popup = await screen.findByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.exist
      const closeButton = screen.queryByRole('button', { name: 'Close' })
      closeButton.focus()
      await user.keyboard('{ }')
      popup = screen.queryByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.equal(null)
    })

    describe('when there is an existing invalid mark', function () {
      before(async function () {
        const store = mockStore({ client, workflow: workflowSnapshot })
        render(<TranscribedLines />, { wrapper: withStore(store) })
        const subject = store.subjects.active
        await when(() => subject.caesarReductions?.reductions.length > 0)
        const task = store.workflowSteps.findTasksByType('transcription')[0]
        task.setActiveTool(0)
        const consensusLines = subject.caesarReductions.consensusLines(0)
        completeLines = consensusLines.filter(line => line.consensusReached)
        const [ transcribedLine ] = consensusLines.filter(line => !line.consensusReached)
        const { id, x1, y1 } = transcribedLine
        task.activeTool.createMark({ id, x1, y1, toolIndex: 0 })
      })

      it('should disable the lines', function () {
        const lines = document.querySelectorAll('g.complete.line')
        lines.forEach(line => {
          expect(line.getAttribute('aria-disabled')).to.equal('true')
          expect(line.tabIndex).to.equal(-1)
        })
      })
    })
  })

  describe('previously transcribed subjects', function () {
    let subject

    before(async function () {
      sinon.stub(auth, 'verify').resolves({
        data: { id: 1, login: 'testUser', dname: 'Test User', admin: false }
      })
      const authClient = {
        checkBearerToken: sinon.stub().resolves('fakeToken')
      }
      const store = mockStore({ authClient, client, workflow: workflowSnapshot })
      render(<TranscribedLines />, { wrapper: withStore(store) })
      subject = store.subjects.active
      await when(() => subject.caesarReductions?.reductions.length > 0)
    })

    after(function () {
      auth.verify.restore()
    })

    it('should be marked as already seen', function () {
      expect(subject.already_seen).to.equal(true)
    })
  })
})
