import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import TranscriptionReductions from '@store/TranscriptionReductions'
import taskRegistry from '@plugins/tasks'
import { TranscribedLines } from './TranscribedLines'
import { reducedSubject } from '@store/TranscriptionReductions/mocks'
import { TranscriptionLine } from '@plugins/drawingTools/components'
import ConsensusPopup from './components/ConsensusPopup'

describe.only('Component > TranscribedLines', function () {
  let wrapper, task, consensusLines
  before(function () {
    const transcriptionReductions = TranscriptionReductions.create({
      reductions: [{ data: reducedSubject }],
      subjectId: '1234',
      workflowId: '5678'
    })
    consensusLines = transcriptionReductions.consensusLines
    const transcriptionModels = taskRegistry.get('transcription')
    task = transcriptionModels.TaskModel.create({
      instruction: 'Transcribe the text',
      taskKey: 'T1',
      type: 'transcription'
    })
    wrapper = shallow(<TranscribedLines lines={consensusLines} task={task} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('incomplete lines', function () {
    let lines
    before(function () {
      lines = wrapper.find(TranscriptionLine).find({ state: 'transcribed' })
    })

    it('should render', function () {
      const transcribedLines = consensusLines.filter(line => !line.consensusReached)
      expect(lines).to.have.lengthOf(transcribedLines.length)
    })

    it('should be focusable', function () {
      lines.forEach((component) => {
        const consensusLineWrapper = component.parent()
        expect(consensusLineWrapper.props().tabIndex).to.equal(0)
      })
    })

    xit('should create a new mark on click', function () {
      
    })

    it('should have an explanatory tooltip', function () {
      lines.forEach((component, index) => {
        const tooltip = wrapper.find({ id: `transcribed-${index}`})
        expect(tooltip).to.have.lengthOf(1)
      })
    })
  })

  describe('completed lines',function () {
    let lines, completeLines, useRefStub, useStateStub
    before(function () {
      useRefStub = sinon.stub(React, 'useRef').callsFake(() => {
        return { 
          current: { getBoundingClientRect: { x: Math.random(), y: Math.random() }}
        }
      })
      // useStateStub = sinon.stub(React, 'useState').callsFake((initState) => {
      //   console.log('initState', initState)
      //   return [initState, sinon.spy()]
      // })
      lines = wrapper.find(TranscriptionLine).find({ state: 'complete' })
      completeLines = consensusLines.filter(line => line.consensusReached)
    })

    after(function () {
      useRefStub.restore()
      // useStateStub.restore()
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

    it.only('should show the ConsensusPopup onClick', function () {
      lines.forEach((line, index) => {
        let popup = wrapper.find(ConsensusPopup)
        expect(popup.props().active).to.be.false()
        expect(popup.props().line).to.deep.equal({
          consensusText: '',
          textOptions: []
        })
        expect(popup.props().bounds).to.be.empty()
        wrapper.find({ 'aria-describedby': `complete-${index}`}).simulate('click')
        popup = wrapper.find(ConsensusPopup)
        console.log(popup.debug())
        expect(popup.props().active).to.be.true()
        expect(popup.props().line).to.deep.equal({
          consensusText: completeLines[index].consensusText,
          textOptions: completeLines[index].textOptions
        })
        expect(popup.props().bounds.x).to.be.a('number')
        expect(popup.props().bounds.y).to.be.a('number')
        wrapper.instance().close()
        popup = wrapper.find(ConsensusPopup)
        expect(popup.props().active).to.be.false()
        expect(popup.props().line).to.deep.equal({
          consensusText: '',
          textOptions: []
        })
        expect(popup.props().bounds).to.be.empty()
      })
    })

    it('should show the ConsensusPopup onKeyDown with enter', function () {
      const eventMock = { key: 'Enter', preventDefault: sinon.spy() }
      lines.forEach((line, index) => {
        let popup = wrapper.find(ConsensusPopup)
        expect(popup.props().active).to.be.false()
        expect(popup.props().line).to.deep.equal({
          consensusText: '',
          textOptions: []
        })
        expect(popup.props().bounds).to.be.empty()
        wrapper.find({ 'aria-describedby': `complete-${index}` }).simulate('keydown', eventMock)
        popup = wrapper.find(ConsensusPopup)
        expect(eventMock.preventDefault).to.have.been.calledOnce()
        expect(popup.props().active).to.be.true()
        expect(popup.props().line).to.deep.equal({
          consensusText: completeLines[index].consensusText,
          textOptions: completeLines[index].textOptions
        })
        expect(popup.props().bounds.x).to.be.a('number')
        expect(popup.props().bounds.y).to.be.a('number')
        wrapper.instance().close()
        popup = wrapper.find(ConsensusPopup)
        expect(popup.props().active).to.be.false()
        expect(popup.props().line).to.deep.equal({
          consensusText: '',
          textOptions: []
        })
        expect(popup.props().bounds).to.be.empty()
        eventMock.preventDefault.resetHistory()
      })
    })

    it('should show the ConsensusPopup onKeyDown with space', function () {
      const eventMock = { key: ' ', preventDefault: sinon.spy() }
      lines.forEach((line, index) => {
        let popup = wrapper.find(ConsensusPopup)
        expect(popup.props().active).to.be.false()
        expect(popup.props().line).to.deep.equal({
          consensusText: '',
          textOptions: []
        })
        expect(popup.props().bounds).to.be.empty()
        wrapper.find({ 'aria-describedby': `complete-${index}` }).simulate('keydown', eventMock)
        popup = wrapper.find(ConsensusPopup)
        expect(eventMock.preventDefault).to.have.been.calledOnce()
        expect(popup.props().active).to.be.true()
        expect(popup.props().line).to.deep.equal({
          consensusText: completeLines[index].consensusText,
          textOptions: completeLines[index].textOptions
        })
        expect(popup.props().bounds.x).to.be.a('number')
        expect(popup.props().bounds.y).to.be.a('number')
        wrapper.instance().close()
        popup = wrapper.find(ConsensusPopup)
        expect(popup.props().active).to.be.false()
        expect(popup.props().line).to.deep.equal({
          consensusText: '',
          textOptions: []
        })
        expect(popup.props().bounds).to.be.empty()
        eventMock.preventDefault.resetHistory()
      })
    })
  })
})
