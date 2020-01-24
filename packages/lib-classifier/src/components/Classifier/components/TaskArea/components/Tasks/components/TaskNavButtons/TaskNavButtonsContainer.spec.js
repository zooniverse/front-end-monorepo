import { types } from 'mobx-state-tree'
import React from 'react'
import { shallow } from 'enzyme'
import { observable } from 'mobx'
import { expect } from 'chai'
import sinon from 'sinon'
import TaskNavButtonsContainer from './TaskNavButtonsContainer'
import ClassificationStore from '@store/ClassificationStore'
import taskRegistry from '@plugins/tasks'
import Step from '@store/Step'
import { SubjectFactory, WorkflowFactory, ProjectFactory } from '@test/factories'

const SingleChoiceTask = taskRegistry.get('single')
const MultipleChoiceTask = taskRegistry.get('multiple')

const project = ProjectFactory.build()
const subject = SubjectFactory.build()
const workflow = WorkflowFactory.build()

describe('TaskNavButtonsContainer', function () {
  function setupMocks () {
    const steps = observable.map([
      Step.create({ stepKey: 'S0', taskKeys: ['T0'] }),
      Step.create({ stepKey: 'S1', taskKeys: ['T1'] })
    ])

    const singleChoiceTask = SingleChoiceTask.TaskModel.create({
      answers: [{ label: 'yes' }, { label: 'no' }],
      question: 'Is there a cat?',
      required: false,
      taskKey: 'init',
      type: 'single'
    })
    const multipleChoiceTask = MultipleChoiceTask.TaskModel.create({
      answers: [{ label: 'napping' }, { label: 'standing' }, { label: 'playing' }],
      question: 'What is/are the cat(s) doing?',
      required: false,
      taskKey: 'T1',
      type: 'multiple'
    })
    const activeStepTasks = [
      singleChoiceTask,
      multipleChoiceTask
    ]
    const classificationStore = ClassificationStore.create()
    classificationStore.createClassification(subject, workflow, project)
    const store = types.model('MockStore', {
      classifications: ClassificationStore,
      multipleChoiceTask: MultipleChoiceTask.TaskModel,
      singleChoiceTask: SingleChoiceTask.TaskModel
    })
    .create({
      classifications: classificationStore,
      multipleChoiceTask,
      singleChoiceTask
    })
    const classification = classificationStore.active
    classification.addAnnotation(multipleChoiceTask)
    classification.addAnnotation(singleChoiceTask)
    singleChoiceTask.setAnnotation(classification.annotation(singleChoiceTask))
    multipleChoiceTask.setAnnotation(classification.annotation(multipleChoiceTask))
    return {
      activeStepTasks,
      classificationStore,
      steps
    }
  }

  describe('when it renders', function () {
    let wrapper

    before(function () {
      const { activeStepTasks } = setupMocks()
      wrapper = shallow(
        <TaskNavButtonsContainer.wrappedComponent
          isThereAPreviousStep={() => {}}
          isThereANextStep={() => {}}
          shouldWeShowDoneAndTalkButton={() => {}}
          tasks={activeStepTasks}
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
    let selectStepSpy
    let activeStepTasks
    let classificationStore

    before(function () {
      ({
        activeStepTasks,
        classificationStore
      } = setupMocks())
      selectStepSpy = sinon.spy()
      wrapper = shallow(
        <TaskNavButtonsContainer.wrappedComponent
          classification={classificationStore.active}
          isThereAPreviousStep={() => false}
          isThereANextStep={() => false}
          shouldWeShowDoneAndTalkButton={() => {}}
          selectStep={selectStepSpy}
          tasks={activeStepTasks}
        />
      )
    })

    afterEach(function () {
      selectStepSpy.resetHistory()
    })

    it('should create a default annotation for each task if there is not an annotation for that task', function () {
      wrapper.instance().goToNextStep()
      const classification = classificationStore.active

      activeStepTasks.forEach((task) => {
        const { defaultAnnotation } = task
        expect(classification.annotation(task).task).to.equal(defaultAnnotation.task)
        expect(classification.annotation(task).value).to.deep.equal(defaultAnnotation.value)
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
    let activeStepTasks
    let steps

    before(function () {
      ({
        activeStepTasks,
        steps
      } = setupMocks())
      getPreviousStepKeyStub = sinon.stub().callsFake(() => { return 'S0' })
      selectStepSpy = sinon.spy()
      removeAnnotationSpy = sinon.spy()

      wrapper = shallow(
        <TaskNavButtonsContainer.wrappedComponent
          isThereAPreviousStep={() => false}
          isThereANextStep={() => false}
          shouldWeShowDoneAndTalkButton={() => {}}
          removeAnnotation={removeAnnotationSpy}
          selectStep={selectStepSpy}
          steps={steps}
          tasks={activeStepTasks}
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
    let onSubmitSpy
    let activeStepTasks
    let classificationStore
    const preventDefaultSpy = sinon.spy()

    before(function () {
      ({
        activeStepTasks,
        classificationStore
      } = setupMocks())
      completeClassificationSpy = sinon.spy()

      wrapper = shallow(
        <TaskNavButtonsContainer.wrappedComponent
          classification={classificationStore.active}
          completeClassification={completeClassificationSpy}
          isThereAPreviousStep={() => { }}
          isThereANextStep={() => { }}
          tasks={activeStepTasks}
        />
      )
    })

    afterEach(function () {
      completeClassificationSpy.resetHistory()
      preventDefaultSpy.resetHistory()
    })

    it('should create a default annotation for each task if there is not an annotation for that task', function () {
      wrapper.instance().onSubmit({ preventDefault: preventDefaultSpy })
      const classification = classificationStore.active

      activeStepTasks.forEach((task) => {
        const { defaultAnnotation } = task
        expect(classification.annotation(task).task).to.equal(defaultAnnotation.task)
        expect(classification.annotation(task).value).to.deep.equal(defaultAnnotation.value)
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
