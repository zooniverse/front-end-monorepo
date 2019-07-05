import React from 'react'
import { shallow } from 'enzyme'
import { observable } from 'mobx'
import { expect } from 'chai'
import sinon from 'sinon'
import TaskNavButtonsContainer from './TaskNavButtonsContainer'

const steps = observable.map([
  ['S0', { taskKeys: ['T0'] }],
  ['S1', { taskKeys: ['T1'] }]
])

const tasks = [
  {
    answers: [{ label: 'yes' }, { label: 'no' }],
    question: 'Is there a cat?',
    required: true,
    taskKey: 'init',
    type: 'single'
  }, {
    answers: [{ label: 'napping' }, { label: 'standing' }, { label: 'playing' }],
    question: 'What is/are the cat(s) doing?',
    required: false,
    taskKey: 'T1',
    type: 'multiple'
  }
]

describe('TaskNavButtonsContainer', function () {
  describe('when it renders', function () {
    let wrapper
    before(function () {
      wrapper = shallow(
        <TaskNavButtonsContainer.wrappedComponent
          isThereAPreviousStep={() => {}}
          isThereANextStep={() => {}}
          shouldWeShowDoneAndTalkButton={() => {}}
          tasks={tasks}
        />
      )
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render TaskNavButtons', function () {
      expect(wrapper.find('TaskNavButtons')).to.have.lengthOf(1)
    })
  })

  describe('#goToNextStep', function () {
    let wrapper
    let createDefaultAnnotationIfThereIsNoneSpy
    let selectStepSpy

    before(function () {
      createDefaultAnnotationIfThereIsNoneSpy = sinon.spy(
        TaskNavButtonsContainer.wrappedComponent.prototype, 'createDefaultAnnotationIfThereIsNone'
      )
      selectStepSpy = sinon.spy()

      wrapper = shallow(
        <TaskNavButtonsContainer.wrappedComponent
          isThereAPreviousStep={() => {}}
          isThereANextStep={() => {}}
          shouldWeShowDoneAndTalkButton={() => {}}
          selectStep={selectStepSpy}
          tasks={tasks}
        />
      )
    })

    afterEach(function () {
      createDefaultAnnotationIfThereIsNoneSpy.resetHistory()
      selectStepSpy.resetHistory()
    })

    after(function () {
      createDefaultAnnotationIfThereIsNoneSpy.restore()
    })

    it('should call #createDefaultAnnotationIfThereIsNone', function () {
      wrapper.instance().goToNextStep()
      expect(createDefaultAnnotationIfThereIsNoneSpy.called).to.be.true()
    })

    it('should call props.selectStep', function () {
      wrapper.instance().goToNextStep()
      expect(selectStepSpy.called).to.be.true()
    })
  })

  describe('#goToPreviousStep', function () {
    let wrapper
    let getPreviousStepKeyStub
    let removeAnnotationSpy
    let selectStepSpy

    before(function () {
      getPreviousStepKeyStub = sinon.stub().callsFake(() => { return 'S0' })
      selectStepSpy = sinon.spy()
      removeAnnotationSpy = sinon.spy()

      wrapper = shallow(
        <TaskNavButtonsContainer.wrappedComponent
          isThereAPreviousStep={() => {}}
          isThereANextStep={() => {}}
          shouldWeShowDoneAndTalkButton={() => {}}
          removeAnnotation={removeAnnotationSpy}
          selectStep={selectStepSpy}
          steps={steps}
          tasks={tasks}
        />
      )
    })

    afterEach(function () {
      selectStepSpy.resetHistory()
      removeAnnotationSpy.resetHistory()
    })

    it('should not call props.selectStep if there is not a previous step', function () {
      const step = { stepKey: 'S0', taskKeys: ['T0'] }
      wrapper.setProps({ step })
      wrapper.instance().goToPreviousStep()
      expect(selectStepSpy.notCalled).to.be.true()
    })

    it('should call props.selectStep when there is a previous step', function () {
      const step = { stepKey: 'S1', taskKeys: ['T1'] }
      wrapper.setProps({ getPreviousStepKey: getPreviousStepKeyStub, isThereAPreviousStep: () => { return true }, step })
      wrapper.instance().goToPreviousStep()
      expect(selectStepSpy.called).to.be.true()
      expect(selectStepSpy.calledWith('S0')).to.be.true()
    })

    it('should call props.removeAnnotation when there is a previous step', function () {
      const step = { stepKey: 'S1', taskKeys: ['T1'] }
      wrapper.setProps({ getPreviousStepKey: getPreviousStepKeyStub, isThereAPreviousStep: () => { return true }, step })
      wrapper.instance().goToPreviousStep()
      expect(removeAnnotationSpy.called).to.be.true()
      expect(removeAnnotationSpy.calledWith('T1')).to.be.true()
    })
  })

  describe('#createDefaultAnnotationIfThereIsNone', function () {
    let wrapper
    let createDefaultAnnotationSpy

    before(function () {
      createDefaultAnnotationSpy = sinon.spy()

      wrapper = shallow(
        <TaskNavButtonsContainer.wrappedComponent
          createDefaultAnnotation={createDefaultAnnotationSpy}
          isThereAPreviousStep={() => {}}
          isThereANextStep={() => {}}
          shouldWeShowDoneAndTalkButton={() => {}}
          tasks={tasks}
        />
      )
    })

    afterEach(function () {
      createDefaultAnnotationSpy.resetHistory()
    })

    it('should not call props.createDefaultAnnotation if there is not a props.classification', function () {
      wrapper.instance().createDefaultAnnotationIfThereIsNone()
      expect(createDefaultAnnotationSpy.called).to.be.false()
    })

    it('should call props.createDefaultAnnotation if there is a props.classification and there aren\'t annotations for the tasks', function () {
      const classification = { annotations: observable.map() }
      wrapper.setProps({ classification })
      wrapper.instance().createDefaultAnnotationIfThereIsNone()
      tasks.forEach((task) => {
        expect(createDefaultAnnotationSpy.called).to.be.true()
        expect(createDefaultAnnotationSpy.calledWith(task)).to.be.true()
      })
    })

    it('should not call props.createDefaultAnnotation if props.classification has matching annotations for the tasks', function () {
      const annotations = observable.map()
      tasks.forEach(task => annotations.set(task.taskKey, task))
      wrapper.setProps({ classification: { annotations } })
      wrapper.instance().createDefaultAnnotationIfThereIsNone()
      expect(createDefaultAnnotationSpy.notCalled).to.be.true()
    })
  })

  describe('#onSubmit', function () {
    let wrapper
    let completeClassificationSpy
    let createDefaultAnnotationIfThereIsNoneSpy
    let onSubmitSpy
    const preventDefaultSpy = sinon.spy()

    before(function () {
      completeClassificationSpy = sinon.spy()
      createDefaultAnnotationIfThereIsNoneSpy = sinon.spy(TaskNavButtonsContainer.wrappedComponent.prototype, 'createDefaultAnnotationIfThereIsNone')
      onSubmitSpy = sinon.spy(TaskNavButtonsContainer.wrappedComponent.prototype, 'onSubmit')

      wrapper = shallow(
        <TaskNavButtonsContainer.wrappedComponent
          completeClassification={completeClassificationSpy}
          isThereAPreviousStep={() => { }}
          isThereANextStep={() => { }}
          tasks={tasks}
        />
      )
    })

    afterEach(function () {
      completeClassificationSpy.resetHistory()
      createDefaultAnnotationIfThereIsNoneSpy.resetHistory()
      onSubmitSpy.resetHistory()
      preventDefaultSpy.resetHistory()
    })

    after(function () {
      createDefaultAnnotationIfThereIsNoneSpy.restore()
      onSubmitSpy.restore()
    })

    it('should prevent the event default', function () {
      wrapper.instance().onSubmit({ preventDefault: preventDefaultSpy })
      expect(preventDefaultSpy).to.have.been.calledOnce()
    })

    it('should call createDefaultAnnotationIfThereIsNone', function () {
      wrapper.instance().onSubmit({ preventDefault: preventDefaultSpy })
      expect(createDefaultAnnotationIfThereIsNoneSpy).to.have.been.calledOnce()
    })

    it('should call completeClassification', function () {
      wrapper.instance().onSubmit({ preventDefault: preventDefaultSpy })
      expect(completeClassificationSpy).to.have.been.calledOnce()
    })
  })
})
