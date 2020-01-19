import { types } from 'mobx-state-tree'
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { Tasks } from './Tasks'
import asyncStates from '@zooniverse/async-states'
import SingleChoiceTask from '@plugins/tasks/SingleChoiceTask'
import ClassificationStore from '@store/ClassificationStore'

describe('Tasks', function () {
  const singleChoiceTask = SingleChoiceTask.TaskModel.create({
    answers: [{ label: 'yes' }, { label: 'no' }],
    question: 'Is there a cat?',
    required: true,
    taskKey: 'init',
    type: 'single'
  })
  const annotation = singleChoiceTask.createAnnotation()
  const tasks = [ singleChoiceTask ]
  const step = {
    isComplete: true,
    stepKey: 'S1',
    taskKeys: ['init'],
    tasks: {
      init: tasks[0]
    }
  }
  const classifications = ClassificationStore.create()
  const store = types.model('MockStore', {
    classifications: ClassificationStore,
    task: SingleChoiceTask.TaskModel
  })
  .create({
    classifications,
    task: singleChoiceTask
  })
  const mockSubject = {
    id: 'subject',
    metadata: {}
  }
  const mockWorkflow = {
    id: 'workflow',
    version: '1.0'
  }
  const mockProject = {
    id: 'project'
  }
  classifications.createClassification(mockSubject, mockWorkflow, mockProject)
  classifications.addAnnotation(singleChoiceTask)
  const classification = classifications.active
  const { addAnnotation } = classifications
  singleChoiceTask.setAnnotation(classification.annotation(singleChoiceTask))

  it('should render without crashing', function () {
    const wrapper = shallow(<Tasks />)
    expect(wrapper).to.be.ok()
  })

  it('should render null on initialization', function () {
    const wrapper = shallow(<Tasks />)
    expect(wrapper.type()).to.be.null()
  })

  it('should render a loading UI when the workflow loading', function () {
    const wrapper = shallow(<Tasks loadingState={asyncStates.loading} />)
    expect(wrapper.contains('Loading')).to.be.true()
  })

  it('should render an error message when there is a loading error', function () {
    const wrapper = shallow(<Tasks loadingState={asyncStates.error} />)
    expect(wrapper.contains('Something went wrong')).to.be.true()
  })

  it('should render null if the workflow is load but has no tasks', function () {
    const wrapper = shallow(<Tasks loadingState={asyncStates.success} ready />)
    expect(wrapper.type()).to.be.null()
  })

  it('should render the correct task component if the workflow is loaded', function () {
    const wrapper = shallow(
      <Tasks
        loadingState={asyncStates.success}
        ready
        addAnnotation={addAnnotation}
        classification={classification}
        tasks={tasks}
      />
    )
    // Is there a better way to do this?
    expect(wrapper.find('SingleChoiceTask')).to.have.lengthOf(1)
  })

  describe('task components', function () {
    let taskWrapper

    describe('while the subject is loading', function () {
      before(function () {
        const wrapper = shallow(
          <Tasks
            addAnnotation={addAnnotation}
            classification={classification}
            loadingState={asyncStates.success}
            subjectReadyState={asyncStates.loading}
            tasks={tasks}
          />
        )
        taskWrapper = wrapper.find('SingleChoiceTask')
      })

      it('should be disabled', function () {
        expect(taskWrapper.prop('disabled')).to.be.true()
      })
    })

    describe('when the subject viewer is ready', function () {
      before(function () {
        const wrapper = shallow(
          <Tasks
            addAnnotation={addAnnotation}
            classification={classification}
            loadingState={asyncStates.success}
            subjectReadyState={asyncStates.success}
            step={step}
            tasks={tasks}
          />
        )
        taskWrapper = wrapper.find('SingleChoiceTask')
      })

      it('should be enabled', function () {
        expect(taskWrapper.prop('disabled')).to.be.false()
      })
    })
  })
})
