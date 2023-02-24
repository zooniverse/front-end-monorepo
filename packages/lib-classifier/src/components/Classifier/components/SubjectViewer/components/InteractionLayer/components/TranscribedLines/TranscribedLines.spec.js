import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { when } from 'mobx'
import { Provider } from 'mobx-react'
import sinon from 'sinon'

import RootStore from '@store'
import { reducedSubject } from '@store/subjects/Subject/TranscriptionReductions/mocks'
import { WorkflowFactory } from '@test/factories'
import mockStore, { defaultClient } from '@test/mockStore/mockStore.js'

import TranscriptionReductions from '@store/subjects/Subject/TranscriptionReductions'
import * as tasks from '@plugins/tasks'
import { TranscribedLines } from './TranscribedLines'

import { TranscriptionLine } from '@plugins/drawingTools/components'
import ConsensusPopup from './components/ConsensusPopup'
import { expect } from 'chai'

describe('Component > TranscribedLines', function () {
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

  const { TaskModel } = tasks.transcription

  let wrapper, task, consensusLines, transcriptionReductions
  before(function () {
    transcriptionReductions = TranscriptionReductions.create({
      reducer: 'alice',
      reductions: [{ data: reducedSubject }],
      subjectId: '1234',
      workflowId: '5678'
    })
    consensusLines = transcriptionReductions.consensusLines(0)
    task = TaskModel.create({
      tools: [{
        type: 'transcriptionLine',
        tasks: [{
          instruction: 'Transcribe the text',
          taskKey: 'T1.0.0',
          type: 'text'
        }]
      }],
      instruction: 'Underline and transcribe the text',
      taskKey: 'T1',
      type: 'transcription'
    })
    task.setActiveTool(0)
  })

  it('should render without crashing', function () {
    const annotation = {
      taskKey: 'T1',
      taskType: 'transcription',
      update: sinon.stub(),
      value: []
    }
    const store = mockStore({ workflow: workflowSnapshot })
    render(<TranscribedLines
      annotation={annotation}
      frame={0}
      lines={consensusLines}
      task={task}
      marks={task.marks}
    />, { wrapper: withStore(store) })
  })

  describe('when on a step without the transcription task', function () {
    beforeEach(function () {
      const store = mockStore()
      render(<TranscribedLines frame={0} lines={consensusLines} />, { wrapper: withStore(store) })
    })

    it('should disable the incomplete lines', function () {
      const transcribedLines = document.querySelectorAll('g.transcribed.line')
      transcribedLines.forEach((line) => {
        expect(line.getAttribute('aria-disabled')).to.equal('true')
      })
    })

    it('should not create a mark', async function () {
      const user = userEvent.setup({ delay: null })
      const line = document.querySelector('g.transcribed.line')
      expect(task.activeMark).to.be.undefined()
      await user.click(line)
      expect(task.activeMark).to.be.undefined()
      line.focus()
      await user.keyboard('{Enter}')
      expect(task.activeMark).to.be.undefined()
      line.focus()
      await user.keyboard('{ }')
      expect(task.activeMark).to.be.undefined()
    })

    it('should not disable the complete lines', function () {
      const completedLines = document.querySelectorAll('g.complete.line')
      completedLines.forEach((line) => {
        expect(line.getAttribute('aria-disabled')).to.equal('false')
      })
    })
  })

  describe('incomplete lines', function () {
    let lines
    let task
    let wrapper

    before(function () {
      task = TaskModel.create({
        tools: [{
          type: 'transcriptionLine',
          tasks: [{
            instruction: 'Transcribe the text',
            taskKey: 'T1.0.0',
            type: 'text'
          }]
        }],
        instruction: 'Underline and transcribe the text',
        taskKey: 'T1',
        type: 'transcription'
      })
      task.setActiveTool(0)
      const annotation = {
        taskKey: 'T1',
        taskType: 'transcription',
        update: sinon.stub(),
        value: []
      }
      const store = mockStore({ workflow: workflowSnapshot })
      render(<TranscribedLines
        annotation={annotation}
        frame={0}
        lines={consensusLines}
        marks={task.marks}
        task={task}
      />, { wrapper: withStore(store) })
      lines = document.querySelectorAll('g.transcribed.line')
    })

    it('should render', function () {
      const transcribedLines = consensusLines.filter(line => !line.consensusReached)
      expect(lines).to.have.lengthOf(transcribedLines.length)
    })

    it('should not be disabled', function () {
      lines.forEach(line => {
        expect(line.getAttribute('aria-disabled')).to.equal('false')
      })
    })

    it('should be focusable', function () {
      lines.forEach(line => {
        expect(line.tabIndex).to.equal(0)
      })
    })

    describe('when there is an existing invalid mark', function () {
      let lines
      before(function () {
        const store = mockStore({ workflow: workflowSnapshot })
        wrapper = render(<TranscribedLines
          frame={0}
          invalidMark={true}
          lines={consensusLines}
          marks={task.marks}
          task={task}
        />, { wrapper: withStore(store) })
        lines = document.querySelectorAll('g.transcribed.line')
      })

      it('should disable the lines', function () {
        lines.forEach(line => {
          expect(line.getAttribute('aria-disabled')).to.equal('true')
          expect(line.tabIndex).to.equal(-1)
          expect(line.onclick).to.be.null()
          expect(line.onkeydown).to.be.null()
        })
      })
    })

    describe('when there is an existing volunteer mark created from a previous consensus mark', function () {
      beforeEach(function () {
        transcriptionReductions = TranscriptionReductions.create({
          reducer: 'alice',
          reductions: [{ data: reducedSubject }],
          subjectId: '1234',
          workflowId: '5678'
        })
        const consensusLines = transcriptionReductions.consensusLines(0)
        const task = TaskModel.create({
          tools: [{
            type: 'transcriptionLine',
            tasks: [{
              instruction: 'Transcribe the text',
              taskKey: 'T1.0.0',
              type: 'text'
            }]
          }],
          instruction: 'Underline and transcribe the text',
          taskKey: 'T1',
          type: 'transcription'
        })
        task.setActiveTool(0)
        const [ transcribedLine ] = consensusLines.filter(line => !line.consensusReached)
        const { id, x1, x2, y1, y2 } = transcribedLine
        task.activeTool.createMark({ id, x1, y1, x2, y2, toolIndex: 0 })
        const store = mockStore({ workflow: workflowSnapshot })
        render(<TranscribedLines
          frame={0}
          lines={consensusLines}
          marks={task.marks}
          task={task}
        />, { wrapper: withStore(store) })
      })

      it('should disable the existing mark', function () {
        const previousMark = document.querySelector('[aria-describedby=transcribed-0]')
        expect(previousMark.getAttribute('aria-disabled')).to.equal('true')
      })

      it('should not define on click or on keydown handlers', function () {
        const previousMark = document.querySelector('[aria-describedby=transcribed-0]')
        expect(previousMark.onclick).to.be.null()
        expect(previousMark.onkeydown).to.be.null()
      })

      it('should leave other previous marks interactive', function () {
        const previousMark = document.querySelector('[aria-describedby=transcribed-1]')
        expect(previousMark.getAttribute('aria-disabled')).to.equal('false')
        expect(previousMark.onclick).to.be.a('function')
      })
    })

    describe('on click', function () {
      let annotation, consensusLines, line, result, user

      beforeEach(function () {
        user = userEvent.setup({ delay: null })
        task.reset()
        consensusLines = transcriptionReductions.consensusLines(0)
        annotation = {
          taskKey: 'T1',
          taskType: 'transcription',
          update: sinon.stub(),
          value: []
        }
        const store = mockStore({ workflow: workflowSnapshot })
        result = render(<TranscribedLines
          annotation={annotation}
          frame={0}
          lines={consensusLines}
          marks={task.marks}
          task={task}
        />, { wrapper: withStore(store) })
        line = document.querySelector('g.transcribed.line')
      })

      it('should create a new mark', async function () {
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        expect(task.marks.length).to.equal(0)
        expect(task.activeMark).to.be.undefined()
        await user.click(line)
        expect(task.activeMark.x1).to.equal(transcribedLines[0].points[0].x)
        expect(task.activeMark.y1).to.equal(transcribedLines[0].points[0].y)
        expect(task.activeMark.x2).to.equal(transcribedLines[0].points[1].x)
        expect(task.activeMark.y2).to.equal(transcribedLines[0].points[1].y)
        expect(task.activeMark.frame).to.equal(transcribedLines[0].frame)
        expect(task.marks.length).to.equal(1)
        task.setActiveMark(undefined)
      })

      it('should create only one mark per transcribed line', async function () {
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        await user.click(line)
        task.setActiveMark(undefined)
        expect(task.marks.length).to.equal(1)
        expect(task.activeMark).to.be.undefined()
        await user.click(line)
        expect(task.activeMark.x1).to.equal(transcribedLines[0].points[0].x)
        expect(task.activeMark.y1).to.equal(transcribedLines[0].points[0].y)
        expect(task.activeMark.x2).to.equal(transcribedLines[0].points[1].x)
        expect(task.activeMark.y2).to.equal(transcribedLines[0].points[1].y)
        expect(task.activeMark.frame).to.equal(transcribedLines[0].frame)
        expect(task.marks.length).to.equal(1)
        task.setActiveMark(undefined)
      })

      it('should create a mark for the correct frame', async function () {
        const consensusLines = transcriptionReductions.consensusLines(1)
        const store = mockStore({ workflow: workflowSnapshot })
        result.rerender(<TranscribedLines
          annotation={annotation}
          frame={1}
          lines={consensusLines}
          marks={task.marks}
          task={task}
        />, { wrapper: withStore(store) })
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)

        const line = document.querySelector('g.transcribed.line')
        expect(task.activeMark).to.be.undefined()
        await user.click(line)
        expect(task.activeMark.frame).to.equal(1)
        expect(task.activeMark.frame).to.equal(transcribedLines[0].frame)
        task.setActiveMark(undefined)
      })
    })

    describe('on Enter', function () {
      let annotation, consensusLines, line, result, user

      beforeEach(function () {
        user = userEvent.setup({ delay: null })
        task.reset()
        consensusLines = transcriptionReductions.consensusLines(0)
        annotation = {
          taskKey: 'T1',
          taskType: 'transcription',
          update: sinon.stub(),
          value: []
        }
        const store = mockStore({ workflow: workflowSnapshot })
        result = render(<TranscribedLines
          annotation={annotation}
          frame={0}
          lines={consensusLines}
          marks={task.marks}
          task={task}
        />, { wrapper: withStore(store) })
        line = document.querySelector('g.transcribed.line')
      })

      it('should create new marks', async function () {
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        expect(task.marks.length).to.equal(0)
        expect(task.activeMark).to.be.undefined()
        line.focus()
        await user.keyboard('{Enter}')
        expect(task.activeMark.x1).to.equal(transcribedLines[0].points[0].x)
        expect(task.activeMark.y1).to.equal(transcribedLines[0].points[0].y)
        expect(task.activeMark.x2).to.equal(transcribedLines[0].points[1].x)
        expect(task.activeMark.y2).to.equal(transcribedLines[0].points[1].y)
        expect(task.activeMark.frame).to.equal(transcribedLines[0].frame)
        expect(task.marks.length).to.equal(1)
        task.setActiveMark(undefined)
      })

      it('should create only one mark per transcribed line', async function () {
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        line.focus()
        await user.keyboard('{Enter}')
        task.setActiveMark(undefined)
        expect(task.marks.length).to.equal(1)
        expect(task.activeMark).to.be.undefined()
        await user.keyboard('{Enter}')
        expect(task.activeMark.x1).to.equal(transcribedLines[0].points[0].x)
        expect(task.activeMark.y1).to.equal(transcribedLines[0].points[0].y)
        expect(task.activeMark.x2).to.equal(transcribedLines[0].points[1].x)
        expect(task.activeMark.y2).to.equal(transcribedLines[0].points[1].y)
        expect(task.marks.length).to.equal(1)
        task.setActiveMark(undefined)
      })

      it('should create a mark for the correct frame', async function () {
        const consensusLines = transcriptionReductions.consensusLines(1)
        const store = mockStore({ workflow: workflowSnapshot })
        result.rerender(<TranscribedLines
          annotation={annotation}
          frame={1}
          lines={consensusLines}
          marks={task.marks}
          task={task}
        />, { wrapper: withStore(store) })
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)

        const line = document.querySelector('g.transcribed.line')
        line.focus()
        await user.keyboard('{Enter}')
        expect(task.activeMark.frame).to.equal(1)
        expect(task.activeMark.frame).to.equal(transcribedLines[0].frame)
        task.setActiveMark(undefined)
      })
    })

    describe('on Space', function () {
      let annotation, consensusLines, line, result, user

      beforeEach(function () {
        user = userEvent.setup({ delay: null })
        task.reset()
        consensusLines = transcriptionReductions.consensusLines(0)
        annotation = {
          taskKey: 'T1',
          taskType: 'transcription',
          update: sinon.stub(),
          value: []
        }
        const store = mockStore({ workflow: workflowSnapshot })
        result = render(<TranscribedLines
          annotation={annotation}
          frame={0}
          lines={consensusLines}
          marks={task.marks}
          task={task}
        />, { wrapper: withStore(store) })
        line = document.querySelector('g.transcribed.line')
      })

      it('should create a new mark', async function () {
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        expect(task.marks.length).to.equal(0)
        expect(task.activeMark).to.be.undefined()
        line.focus()
        await user.keyboard('{ }')
        expect(task.activeMark.x1).to.equal(transcribedLines[0].points[0].x)
        expect(task.activeMark.y1).to.equal(transcribedLines[0].points[0].y)
        expect(task.activeMark.x2).to.equal(transcribedLines[0].points[1].x)
        expect(task.activeMark.y2).to.equal(transcribedLines[0].points[1].y)
        expect(task.activeMark.frame).to.equal(transcribedLines[0].frame)
        expect(task.marks.length).to.equal(1)
        task.setActiveMark(undefined)
      })

      it('should create only one mark per transcribed line', async function () {
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        line.focus()
        await user.keyboard('{ }')
        task.setActiveMark(undefined)
        expect(task.marks.length).to.equal(1)
        expect(task.activeMark).to.be.undefined()
        await user.keyboard('{ }')
        expect(task.activeMark.x1).to.equal(transcribedLines[0].points[0].x)
        expect(task.activeMark.y1).to.equal(transcribedLines[0].points[0].y)
        expect(task.activeMark.x2).to.equal(transcribedLines[0].points[1].x)
        expect(task.activeMark.y2).to.equal(transcribedLines[0].points[1].y)
        expect(task.marks.length).to.equal(1)
        task.setActiveMark(undefined)
      })

      it('should create a mark for the correct frame', async function () {
        const consensusLines = transcriptionReductions.consensusLines(1)
        const store = mockStore({ workflow: workflowSnapshot })
        result.rerender(<TranscribedLines
          annotation={annotation}
          frame={1}
          lines={consensusLines}
          marks={task.marks}
          task={task}
        />, { wrapper: withStore(store) })
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)

        const line = document.querySelector('g.transcribed.line')
        line.focus()
        await user.keyboard('{ }')
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
    let lines, completeLines

    before(function () {
      const store = mockStore({ workflow: workflowSnapshot })
      render(<TranscribedLines frame={0} lines={consensusLines} task={task} />, { wrapper: withStore(store) })
      lines = document.querySelectorAll('g.complete.line')
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
      const store = mockStore({ workflow: workflowSnapshot })
      render(<TranscribedLines frame={0} lines={consensusLines} task={task} />, { wrapper: withStore(store) })
      const line = document.querySelector('g.complete.line')
      const popupTitle = 'SubjectViewer.InteractionLayer.TranscribedLines.ConsensusPopup.title'
      let popup = screen.queryByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.be.null()
      await user.click(line)
      popup = screen.getByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.exist()
      const closeButton = screen.queryByRole('button', { name: 'Close' })
      await user.click(closeButton)
      popup = screen.queryByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.be.null()
    })

    it('should show the ConsensusPopup onKeyDown with enter', async function () {
      const user = userEvent.setup({ delay: null })
      const store = mockStore({ workflow: workflowSnapshot })
      render(<TranscribedLines frame={0} lines={consensusLines} task={task} />, { wrapper: withStore(store) })
      const line = document.querySelector('g.complete.line')
      const popupTitle = 'SubjectViewer.InteractionLayer.TranscribedLines.ConsensusPopup.title'
      let popup = screen.queryByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.be.null()
      line.focus()
      await user.keyboard('{Enter}')
      popup = screen.getByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.exist()
      const closeButton = screen.queryByRole('button', { name: 'Close' })
      closeButton.focus()
      await user.keyboard('{Enter}')
      popup = screen.queryByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.be.null()
    })

    it('should show the ConsensusPopup onKeyDown with space', async function () {
      const user = userEvent.setup({ delay: null })
      const store = mockStore({ workflow: workflowSnapshot })
      render(<TranscribedLines frame={0} lines={consensusLines} task={task} />, { wrapper: withStore(store) })
      const line = document.querySelector('g.complete.line')
      const popupTitle = 'SubjectViewer.InteractionLayer.TranscribedLines.ConsensusPopup.title'
      let popup = screen.queryByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.be.null()
      line.focus()
      await user.keyboard('{ }')
      popup = screen.getByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.exist()
      const closeButton = screen.queryByRole('button', { name: 'Close' })
      closeButton.focus()
      await user.keyboard('{ }')
      popup = screen.queryByRole('heading', { level: 2, name: popupTitle})
      expect(popup).to.be.null()
    })

    describe('when there is an existing invalid mark', function () {
      before(function () {
        const store = mockStore({ workflow: workflowSnapshot })
        render(<TranscribedLines frame={0} invalidMark={true} lines={consensusLines} task={task} />, { wrapper: withStore(store) })
        lines = document.querySelectorAll('g.complete.line')
        completeLines = consensusLines.filter(line => line.consensusReached)
      })

      it('should disable the lines', function () {
        lines.forEach(line => {
          expect(line.getAttribute('aria-disabled')).to.equal('true')
          expect(line.tabIndex).to.equal(-1)
          expect(line.onclick).to.be.null()
          expect(line.onkeydown).to.be.null()
        })
      })
    })
  })
})
