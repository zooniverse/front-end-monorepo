import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import TranscriptionReductions from '@store/TranscriptionReductions'
import taskRegistry from '@plugins/tasks'
import { TranscribedLines } from './TranscribedLines'
import { reducedSubject } from '@store/TranscriptionReductions/mocks'
import { TranscriptionLine } from '@plugins/drawingTools/components'

describe('Component > TranscribedLines', function () {
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
    let lines, completeLines
    before(function () {
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

    xit('should show the label on hover', function () {
      lines.forEach((component, index) => {
        const consensusLineWrapper = wrapper.find({ ['aria-describedby']: `complete-${index}`})
        consensusLineWrapper.simulate('hover')
      })
    })

    it('should be focusable', function () {
      lines.forEach((component) => {
        const consensusLineWrapper = component.parent()
        expect(consensusLineWrapper.props().tabIndex).to.equal(0)
      })
    })

    xit('should show the label on focus', function () {})

    xit('should not be clickable', function () {
      // TODO update test when functionality is built out
    })

    it('should have an explanatory tooltip', function () {
      lines.forEach((component, index) => {
        const tooltip = wrapper.find({ id: `complete-${index}` })
        expect(tooltip).to.have.lengthOf(1)
      })
    })
  })
})
