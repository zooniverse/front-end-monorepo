import { shallow } from 'enzyme'
import sinon from 'sinon'
import TranscriptionReductions from '@store/subjects/Subject/TranscriptionReductions'
import * as tasks from '@plugins/tasks'
import { TranscribedLines } from './TranscribedLines'
import { reducedSubject } from '@store/subjects/Subject/TranscriptionReductions/mocks'
import { TranscriptionLine } from '@plugins/drawingTools/components'
import ConsensusPopup from './components/ConsensusPopup'
import { expect } from 'chai'

describe('Component > TranscribedLines', function () {
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
    wrapper = shallow(<TranscribedLines
      annotation={annotation}
      frame={0}
      lines={consensusLines}
      task={task}
      marks={task.marks}
    />)
    expect(wrapper).to.be.ok()
  })

  describe('when on a step without the transcription task', function () {
    before(function () {
      wrapper = shallow(<TranscribedLines frame={0} lines={consensusLines} />)
    })

    it('should disable the incomplete lines', function () {
      const transcribedLines = wrapper.find(TranscriptionLine).find({ state: 'transcribed' })
      transcribedLines.forEach((line) => {
        const consensusLineWrapper = line.parent()
        expect(consensusLineWrapper.props()['aria-disabled']).to.equal('true')
      })
    })

    it('should not create a mark', function () {
      const spaceEventMock = { key: ' ', preventDefault: sinon.spy() }
      const enterEventMock = { key: 'Enter', preventDefault: sinon.spy() }
      const transcribedLines = wrapper.find(TranscriptionLine).find({ state: 'transcribed' })
      transcribedLines.forEach((line, index) => {
        expect(task.activeMark).to.be.undefined()
        wrapper.find({ 'aria-describedby': `transcribed-${index}` }).simulate('click')
        expect(task.activeMark).to.be.undefined()
        wrapper.find({ 'aria-describedby': `transcribed-${index}` }).simulate('keydown', spaceEventMock)
        expect(task.activeMark).to.be.undefined()
        wrapper.find({ 'aria-describedby': `transcribed-${index}` }).simulate('keydown', enterEventMock)
        expect(task.activeMark).to.be.undefined()
      })
    })

    it('should not disable the complete lines', function () {
      const completedLines = wrapper.find(TranscriptionLine).find({ state: 'completed' })
      completedLines.forEach((line) => {
        const consensusLineWrapper = line.parent()
        expect(consensusLineWrapper.props()['aria-disabled']).to.be.undefined()
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
        value: []
      }
      wrapper = shallow(<TranscribedLines
        annotation={annotation}
        frame={0}
        lines={consensusLines}
        marks={task.marks}
        task={task}
      />)
      lines = wrapper.find(TranscriptionLine).find({ state: 'transcribed' })
    })

    it('should render', function () {
      const transcribedLines = consensusLines.filter(line => !line.consensusReached)
      expect(lines).to.have.lengthOf(transcribedLines.length)
    })

    it('should not be disabled', function () {
      lines.forEach((component) => {
        const consensusLineWrapper = component.parent()
        expect(consensusLineWrapper.props()['aria-disabled']).to.equal('false')
      })
    })

    it('should be focusable', function () {
      lines.forEach((component) => {
        const consensusLineWrapper = component.parent()
        expect(consensusLineWrapper.props().tabIndex).to.equal(0)
      })
    })

    describe('when there is an existing invalid mark', function () {
      let wrapper, lines
      before(function () {
        wrapper = shallow(<TranscribedLines frame={0} invalidMark={true} lines={consensusLines} marks={task.marks} task={task} />)
        lines = wrapper.find(TranscriptionLine).find({ state: 'transcribed' })
      })

      it('should disable the lines', function () {
        lines.forEach((component) => {
          const consensusLineWrapper = component.parent()
          const props = consensusLineWrapper.props()
          expect(props['aria-disabled']).to.equal('true')
          expect(props.tabIndex).to.equal(-1)
          expect(props.onClick).to.be.undefined()
          expect(props.onKeyDown).to.be.undefined()
        })
      })
    })

    describe('when there is an existing volunteer mark created from a previous consensus mark', function () {
      let wrapper
      before(function () {
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
        wrapper = shallow(<TranscribedLines frame={0} lines={consensusLines} marks={task.marks} task={task} />)
      })

      it('should disable the existing mark', function () {
        const previousMarkProps = wrapper.find({ 'aria-describedby': 'transcribed-0' }).props()
        expect(previousMarkProps['aria-disabled']).to.equal('true')
      })

      it('should not define on click or on keydown handlers', function () {
        const previousMarkProps = wrapper.find({ 'aria-describedby': 'transcribed-0' }).props()
        expect(previousMarkProps.onClick).to.be.undefined()
        expect(previousMarkProps.onKeyDown).to.be.undefined()
      })

      it('should leave other previous marks interactive', function () {
        const previousMarkProps = wrapper.find({ 'aria-describedby': 'transcribed-1' }).props()
        expect(previousMarkProps['aria-disabled']).to.equal('false')
        expect(previousMarkProps.onClick).to.be.a('function')
        expect(previousMarkProps.onKeyDown).to.be.a('function')
      })
    })

    describe('on click', function () {
      const eventMock = { preventDefault: sinon.spy(), target: null }
      let wrapper, consensusLines, lines
      before(function () {
        task.reset()
        consensusLines = transcriptionReductions.consensusLines(0)
        const annotation = {
          taskKey: 'T1',
          taskType: 'transcription',
          update: sinon.stub(),
          value: []
        }
        wrapper = shallow(<TranscribedLines
          annotation={annotation}
          frame={0}
          lines={consensusLines}
          marks={task.marks}
          task={task}
        />)
        lines = wrapper.find(TranscriptionLine).find({ state: 'transcribed' })
      })

      it('should create a new mark', function () {
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        expect(task.marks.length).to.equal(0)
        lines.forEach((line, index) => {
          expect(task.activeMark).to.be.undefined()
          wrapper.find({ 'aria-describedby': `transcribed-${index}` }).simulate('click', eventMock)
          expect(task.activeMark.x1).to.equal(transcribedLines[index].points[0].x)
          expect(task.activeMark.y1).to.equal(transcribedLines[index].points[0].y)
          expect(task.activeMark.x2).to.equal(transcribedLines[index].points[1].x)
          expect(task.activeMark.y2).to.equal(transcribedLines[index].points[1].y)
          expect(task.activeMark.frame).to.equal(transcribedLines[index].frame)
          expect(task.marks.length).to.equal(index + 1)
          task.setActiveMark(undefined)
        })
      })

      it('should create only one mark per transcribed line', function () {
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        lines.forEach((line, index) => {
          wrapper.find({ 'aria-describedby': `transcribed-${index}` }).simulate('keydown', eventMock)
          task.setActiveMark(undefined)
        })
        expect(task.marks.length).to.equal(transcribedLines.length)
        lines.forEach((line, index) => {
          expect(task.activeMark).to.be.undefined()
          wrapper.find({ 'aria-describedby': `transcribed-${index}` }).simulate('click', eventMock)
          expect(task.activeMark.x1).to.equal(transcribedLines[index].points[0].x)
          expect(task.activeMark.y1).to.equal(transcribedLines[index].points[0].y)
          expect(task.activeMark.x2).to.equal(transcribedLines[index].points[1].x)
          expect(task.activeMark.y2).to.equal(transcribedLines[index].points[1].y)
          expect(task.activeMark.frame).to.equal(transcribedLines[index].frame)
          expect(task.marks.length).to.equal(transcribedLines.length)
          task.setActiveMark(undefined)
        })
      })

      it('should create a mark for the correct frame', function () {
        const consensusLines = transcriptionReductions.consensusLines(1)
        wrapper.setProps({ frame: 1, lines: consensusLines })
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)

        lines = wrapper.find(TranscriptionLine).find({ state: 'transcribed' })
        lines.forEach((line, index) => {
          wrapper.find({ 'aria-describedby': `transcribed-${index}` }).simulate('click', eventMock)
          expect(task.activeMark.frame).to.equal(1)
          expect(task.activeMark.frame).to.equal(transcribedLines[index].frame)
          task.setActiveMark(undefined)
        })
      })
    })

    describe('on Enter', function () {
      const eventMock = { key: 'Enter', preventDefault: sinon.spy(), target: null }
      let wrapper, consensusLines, lines
      beforeEach(function () {
        task.reset()
        consensusLines = transcriptionReductions.consensusLines(0)
        const annotation = {
          taskKey: 'T1',
          taskType: 'transcription',
          update: sinon.stub(),
          value: []
        }
        wrapper = shallow(<TranscribedLines
          annotation={annotation}
          frame={0}
          lines={consensusLines}
          marks={task.marks}
          task={task}
        />)
        lines = wrapper.find(TranscriptionLine).find({ state: 'transcribed' })
      })

      it('should create new marks', function () {
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        expect(task.marks.length).to.equal(0)
        lines.forEach((line, index) => {
          expect(task.activeMark).to.be.undefined()
          wrapper.find({ 'aria-describedby': `transcribed-${index}` }).simulate('keydown', eventMock)
          expect(task.activeMark.x1).to.equal(transcribedLines[index].points[0].x)
          expect(task.activeMark.y1).to.equal(transcribedLines[index].points[0].y)
          expect(task.activeMark.x2).to.equal(transcribedLines[index].points[1].x)
          expect(task.activeMark.y2).to.equal(transcribedLines[index].points[1].y)
          expect(task.activeMark.frame).to.equal(transcribedLines[index].frame)
          expect(task.marks.length).to.equal(index + 1)
          task.setActiveMark(undefined)
        })
      })

      it('should create only one mark per transcribed line', function () {
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        lines.forEach((line, index) => {
          wrapper.find({ 'aria-describedby': `transcribed-${index}` }).simulate('keydown', eventMock)
          task.setActiveMark(undefined)
        })
        expect(task.marks.length).to.equal(transcribedLines.length)
        lines.forEach((line, index) => {
          expect(task.activeMark).to.be.undefined()
          wrapper.find({ 'aria-describedby': `transcribed-${index}` }).simulate('keydown', eventMock)
          expect(task.activeMark.x1).to.equal(transcribedLines[index].points[0].x)
          expect(task.activeMark.y1).to.equal(transcribedLines[index].points[0].y)
          expect(task.activeMark.x2).to.equal(transcribedLines[index].points[1].x)
          expect(task.activeMark.y2).to.equal(transcribedLines[index].points[1].y)
          expect(task.marks.length).to.equal(transcribedLines.length)
          task.setActiveMark(undefined)
        })
      })

      it('should create a mark for the correct frame', function () {
        const consensusLines = transcriptionReductions.consensusLines(1)
        wrapper.setProps({ frame: 1, lines: consensusLines })
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)

        lines = wrapper.find(TranscriptionLine).find({ state: 'transcribed' })
        lines.forEach((line, index) => {
          wrapper.find({ 'aria-describedby': `transcribed-${index}` }).simulate('click', eventMock)
          expect(task.activeMark.frame).to.equal(1)
          expect(task.activeMark.frame).to.equal(transcribedLines[index].frame)
          task.setActiveMark(undefined)
        })
      })
    })

    describe('on Space', function () {
      const eventMock = { key: ' ', preventDefault: sinon.spy(), target: null }
      let wrapper, consensusLines
      beforeEach(function () {
        task.reset()
        consensusLines = transcriptionReductions.consensusLines(0)
        const annotation = {
          taskKey: 'T1',
          taskType: 'transcription',
          update: sinon.stub(),
          value: []
        }
        wrapper = shallow(<TranscribedLines
          annotation={annotation}
          frame={0}
          lines={consensusLines}
          marks={task.marks}
          task={task}
        />)
        lines = wrapper.find(TranscriptionLine).find({ state: 'transcribed' })
      })

      it('should create a new mark', function () {
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        expect(task.marks.length).to.equal(0)
        lines.forEach((line, index) => {
          expect(task.activeMark).to.be.undefined()
          wrapper.find({ 'aria-describedby': `transcribed-${index}` }).simulate('keydown', eventMock)
          expect(task.activeMark.x1).to.equal(transcribedLines[index].points[0].x)
          expect(task.activeMark.y1).to.equal(transcribedLines[index].points[0].y)
          expect(task.activeMark.x2).to.equal(transcribedLines[index].points[1].x)
          expect(task.activeMark.y2).to.equal(transcribedLines[index].points[1].y)
          expect(task.activeMark.frame).to.equal(transcribedLines[index].frame)
          expect(task.marks.length).to.equal(index + 1)
          task.setActiveMark(undefined)
        })
      })

      it('should create only one mark per transcribed line', function () {
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)
        lines.forEach((line, index) => {
          wrapper.find({ 'aria-describedby': `transcribed-${index}` }).simulate('keydown', eventMock)
          task.setActiveMark(undefined)
        })
        expect(task.marks.length).to.equal(transcribedLines.length)
        lines.forEach((line, index) => {
          expect(task.activeMark).to.be.undefined()
          wrapper.find({ 'aria-describedby': `transcribed-${index}` }).simulate('keydown', eventMock)
          expect(task.activeMark.x1).to.equal(transcribedLines[index].points[0].x)
          expect(task.activeMark.y1).to.equal(transcribedLines[index].points[0].y)
          expect(task.activeMark.x2).to.equal(transcribedLines[index].points[1].x)
          expect(task.activeMark.y2).to.equal(transcribedLines[index].points[1].y)
          expect(task.marks.length).to.equal(transcribedLines.length)
          task.setActiveMark(undefined)
        })
      })

      it('should create a mark for the correct frame', function () {
        const consensusLines = transcriptionReductions.consensusLines(1)
        wrapper.setProps({ frame: 1, lines: consensusLines })
        const transcribedLines = consensusLines.filter(line => !line.consensusReached)

        lines = wrapper.find(TranscriptionLine).find({ state: 'transcribed' })
        lines.forEach((line, index) => {
          wrapper.find({ 'aria-describedby': `transcribed-${index}` }).simulate('click', eventMock)
          expect(task.activeMark.frame).to.equal(1)
          expect(task.activeMark.frame).to.equal(transcribedLines[index].frame)
          task.setActiveMark(undefined)
        })
      })
    })

    it('should have an explanatory tooltip', function () {
      lines.forEach((component, index) => {
        const tooltip = wrapper.find({ id: `transcribed-${index}` })
        expect(tooltip).to.have.lengthOf(1)
      })
    })
  })

  describe('completed lines', function () {
    let lines, completeLines
    before(function () {
      wrapper = shallow(<TranscribedLines frame={0} lines={consensusLines} task={task} />)
      lines = wrapper.find(TranscriptionLine).find({ state: 'complete' })
      completeLines = consensusLines.filter(line => line.consensusReached)
    })

    it('should render', function () {
      expect(lines).to.have.lengthOf(completeLines.length)
    })

    it('should be labelled with the consensus text', function () {
      lines.forEach((component, index) => {
        const consensusLineWrapper = component.parent()
        expect(consensusLineWrapper.props()['aria-label']).to.equal(completeLines[index].consensusText)
      })
    })

    it('should be focusable', function () {
      lines.forEach((component) => {
        const consensusLineWrapper = component.parent()
        expect(consensusLineWrapper.props().tabIndex).to.equal(0)
      })
    })

    it('should have an explanatory tooltip', function () {
      lines.forEach((component, index) => {
        const tooltip = wrapper.find({ id: `complete-${index}` })
        expect(tooltip).to.have.lengthOf(1)
      })
    })

    it('should show the ConsensusPopup onClick', function () {
      lines.forEach((line, index) => {
        let popup = wrapper.find(ConsensusPopup)
        expect(popup.props().active).to.be.false()
        expect(popup.props().line).to.deep.equal({
          consensusText: '',
          textOptions: []
        })
        wrapper.find({ 'aria-describedby': `complete-${index}` }).simulate('click', { target: { getBoundingClientRect: sinon.spy() }})
        popup = wrapper.find(ConsensusPopup)
        expect(popup.props().active).to.be.true()
        expect(popup.props().line).to.deep.equal(completeLines[index])
        const closeFn = popup.props().closeFn
        closeFn()
        popup = wrapper.find(ConsensusPopup)
        expect(popup.props().active).to.be.false()
        expect(popup.props().line).to.deep.equal({
          consensusText: '',
          textOptions: []
        })
      })
    })

    it('should show the ConsensusPopup onKeyDown with enter', function () {
      const eventMock = { key: 'Enter', preventDefault: sinon.spy(), target: { getBoundingClientRect: sinon.spy() } }
      lines.forEach((line, index) => {
        let popup = wrapper.find(ConsensusPopup)
        expect(popup.props().active).to.be.false()
        expect(popup.props().line).to.deep.equal({
          consensusText: '',
          textOptions: []
        })
        wrapper.find({ 'aria-describedby': `complete-${index}` }).simulate('keydown', eventMock)
        popup = wrapper.find(ConsensusPopup)
        expect(eventMock.preventDefault).to.have.been.calledOnce()
        expect(popup.props().active).to.be.true()
        expect(popup.props().line).to.deep.equal(completeLines[index])
        const closeFn = popup.props().closeFn
        closeFn()
        popup = wrapper.find(ConsensusPopup)
        expect(popup.props().active).to.be.false()
        expect(popup.props().line).to.deep.equal({
          consensusText: '',
          textOptions: []
        })
        eventMock.preventDefault.resetHistory()
      })
    })

    it('should show the ConsensusPopup onKeyDown with space', function () {
      const eventMock = { key: ' ', preventDefault: sinon.spy(), target: { getBoundingClientRect: sinon.spy() } }
      lines.forEach((line, index) => {
        let popup = wrapper.find(ConsensusPopup)
        expect(popup.props().active).to.be.false()
        expect(popup.props().line).to.deep.equal({
          consensusText: '',
          textOptions: []
        })
        wrapper.find({ 'aria-describedby': `complete-${index}` }).simulate('keydown', eventMock)
        popup = wrapper.find(ConsensusPopup)
        expect(eventMock.preventDefault).to.have.been.calledOnce()
        expect(popup.props().active).to.be.true()
        expect(popup.props().line).to.deep.equal(completeLines[index])
        const closeFn = popup.props().closeFn
        closeFn()
        popup = wrapper.find(ConsensusPopup)
        expect(popup.props().active).to.be.false()
        expect(popup.props().line).to.deep.equal({
          consensusText: '',
          textOptions: []
        })
        eventMock.preventDefault.resetHistory()
      })
    })

    describe('when there is an existing invalid mark', function () {
      before(function () {
        wrapper = shallow(<TranscribedLines frame={0} invalidMark={true} lines={consensusLines} task={task} />)
        lines = wrapper.find(TranscriptionLine).find({ state: 'complete' })
        completeLines = consensusLines.filter(line => line.consensusReached)
      })

      it('should disable the lines', function () {
        lines.forEach((component) => {
          const consensusLineWrapper = component.parent()
          const props = consensusLineWrapper.props()
          expect(props['aria-disabled']).to.equal('true')
          expect(props.tabIndex).to.equal(-1)
          expect(props.onClick).to.be.undefined()
          expect(props.onKeyDown).to.be.undefined()
        })
      })
    })
  })
})
