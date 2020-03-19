import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import TranscriptionReductions from '@store/TranscriptionReductions'
import taskRegistry from '@plugins/tasks'
import { TranscribedLines, ConsensusLine } from './TranscribedLines'
import { reducedSubject } from '@store/TranscriptionReductions/mocks'
import { TranscriptionLine } from '@plugins/drawingTools/components'

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

  describe.only('incomplete lines', function () {
    let lines
    before(function () {
      lines = wrapper.find(TranscriptionLine).find({ state: 'transcribed' })
    })

    it('should be red', function () {
      const transcribedLines = consensusLines.filter(line => !line.consensusReached)
      expect(lines).to.have.lengthOf(transcribedLines.length)
    })

    it('should be focusable', function () {
      lines.forEach((component) => {
        const consensusLineWrappers = component.parent()
        expect(consensusLineWrappers.props().tabIndex).to.equal(0)
      })
    })

    it('should create a new mark on click', function () {
      
    })

    it('should have an explanatory tooltip', function () {
      
    })
  })

  describe('completed lines',function () {
    it('should be grey', function () {})

    it('should be labelled with the consensus text', function () {})

    it('should show the label on hover', function () {})

    it('should be focusable', function () {})

    it('should show the label on focus', function () {})

    it('should not be clickable', function () {
      // TODO update test when functionality is built out
      const alertStub = sinon.stub(window, 'alert')
      const consensusLineWrappers = wrapper.find(TranscriptionLine).find({ state: 'complete' }).parent()
      consensusLineWrappers.forEach((component) => {
        component.simulate('click')
        expect(alertStub).to.have.been.calledOnce()
        alertStub.resetHistory()
      })
      alertStub.restore()
    })

    it('should have an explanatory tooltip', function () {

    })
  })
})
