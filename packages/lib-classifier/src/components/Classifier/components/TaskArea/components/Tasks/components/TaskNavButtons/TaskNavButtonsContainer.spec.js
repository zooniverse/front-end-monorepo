import React from 'react'
import { shallow } from 'enzyme'
import { observable } from 'mobx'
import { expect } from 'chai'
import sinon from 'sinon'
import TaskNavButtonsContainer from './TaskNavButtonsContainer'
import ClassificationStore from '../../../../../../../../store/ClassificationStore'
import SingleChoiceTask from '../../../../../../../../store/tasks/SingleChoiceTask'
import MultipleChoiceTask from '../../../../../../../../store/tasks/MultipleChoiceTask'
import { SubjectFactory, WorkflowFactory, ProjectFactory } from '../../../../../../../../../test/factories'

const steps = observable.map([
  ['S0', { taskKeys: ['T0'] }],
  ['S1', { taskKeys: ['T1'] }]
])

const tasks = [
  SingleChoiceTask.create({
    answers: [{ label: 'yes' }, { label: 'no' }],
    question: 'Is there a cat?',
    required: false,
    taskKey: 'init',
    type: 'single'
  }), MultipleChoiceTask.create({
    answers: [{ label: 'napping' }, { label: 'standing' }, { label: 'playing' }],
    question: 'What is/are the cat(s) doing?',
    required: false,
    taskKey: 'T1',
    type: 'multiple'
  })
]

const project = ProjectFactory.build()
const subject = SubjectFactory.build()
const workflow = WorkflowFactory.build()

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
    let addAnnotationSpy
    let selectStepSpy
    let classificationStore

    before(function () {
      selectStepSpy = sinon.spy()
      classificationStore = ClassificationStore.create()
      classificationStore.createClassification(subject, workflow, project)
      addAnnotationSpy = sinon.spy(classificationStore, 'addAnnotation')
      wrapper = shallow(
        <TaskNavButtonsContainer.wrappedComponent
          addAnnotation={classificationStore.addAnnotation}
          classification={classificationStore.active}
          isThereAPreviousStep={() => {}}
          isThereANextStep={() => {}}
          shouldWeShowDoneAndTalkButton={() => {}}
          selectStep={selectStepSpy}
          tasks={tasks}
        />
      )
    })

    afterEach(function () {
      addAnnotationSpy.resetHistory()
      selectStepSpy.resetHistory()
    })

    after(function () {
      addAnnotationSpy.restore()
    })

    it('should create a default annotation for each task if there is not an annotation for that task', function () {
      wrapper.instance().goToNextStep()
      const classification = classificationStore.active.toJSON()

      tasks.forEach((task) => {
        expect(addAnnotationSpy.withArgs(null, task)).to.have.been.calledOnce()
        expect(classification.annotations[task.taskKey]).to.deep.equal(task.defaultAnnotation)
      })
    })

    it('should call props.selectStep', function () {
      wrapper.instance().goToNextStep()
      expect(selectStepSpy).to.have.been.called()
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
      expect(selectStepSpy).to.have.not.been.called()
    })

    it('should call props.selectStep when there is a previous step', function () {
      const step = { stepKey: 'S1', taskKeys: ['T1'] }
      wrapper.setProps({ getPreviousStepKey: getPreviousStepKeyStub, isThereAPreviousStep: () => { return true }, step })
      wrapper.instance().goToPreviousStep()
      expect(selectStepSpy).to.have.been.called()
      expect(selectStepSpy.withArgs('S0')).to.have.been.calledOnce()
    })

    it('should call props.removeAnnotation when there is a previous step', function () {
      const step = { stepKey: 'S1', taskKeys: ['T1'] }
      wrapper.setProps({ getPreviousStepKey: getPreviousStepKeyStub, isThereAPreviousStep: () => { return true }, step })
      wrapper.instance().goToPreviousStep()
      expect(removeAnnotationSpy).to.have.been.called()
      expect(removeAnnotationSpy.withArgs('T1')).to.have.been.calledOnce()
    })
  })

  describe('#onSubmit', function () {
    let wrapper
    let completeClassificationSpy
    let addAnnotationSpy
    let onSubmitSpy
    let classificationStore
    const preventDefaultSpy = sinon.spy()

    before(function () {
      classificationStore = ClassificationStore.create()
      classificationStore.createClassification(subject, workflow, project)
      addAnnotationSpy = sinon.spy(classificationStore, 'addAnnotation')
      completeClassificationSpy = sinon.spy()
      onSubmitSpy = sinon.spy(TaskNavButtonsContainer.wrappedComponent.prototype, 'onSubmit')

      wrapper = shallow(
        <TaskNavButtonsContainer.wrappedComponent
          addAnnotation={classificationStore.addAnnotation}
          classification={classificationStore.active}
          completeClassification={completeClassificationSpy}
          isThereAPreviousStep={() => { }}
          isThereANextStep={() => { }}
          tasks={tasks}
        />
      )
    })

    afterEach(function () {
      completeClassificationSpy.resetHistory()
      addAnnotationSpy.resetHistory()
      onSubmitSpy.resetHistory()
      preventDefaultSpy.resetHistory()
    })

    after(function () {
      addAnnotationSpy.restore()
      onSubmitSpy.restore()
    })

    it('should create a default annotation for each task if there is not an annotation for that task', function () {
      wrapper.instance().onSubmit({ preventDefault: preventDefaultSpy })
      const classification = classificationStore.active.toJSON()

      tasks.forEach((task) => {
        expect(addAnnotationSpy.withArgs(null, task)).to.have.been.calledOnce()
        expect(classification.annotations[task.taskKey]).to.deep.equal(task.defaultAnnotation)
      })
    })

    it('should prevent the event default', function () {
      wrapper.instance().onSubmit({ preventDefault: preventDefaultSpy })
      expect(preventDefaultSpy).to.have.been.calledOnce()
    })

    it('should call completeClassification', function () {
      wrapper.instance().onSubmit({ preventDefault: preventDefaultSpy })
      expect(completeClassificationSpy).to.have.been.calledOnce()
    })
  })
})
