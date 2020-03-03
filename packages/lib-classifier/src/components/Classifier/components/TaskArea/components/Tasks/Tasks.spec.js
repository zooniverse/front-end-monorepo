import { observer } from 'mobx-react'
import { types } from 'mobx-state-tree'
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { Tasks } from './Tasks'
import asyncStates from '@zooniverse/async-states'
import SingleChoiceTask from '@plugins/tasks/SingleChoiceTask'
import ClassificationStore from '@store/ClassificationStore'
import taskRegistry from '@plugins/tasks'

describe('Tasks', function () {
  let addAnnotation
  let classification
  let step
  let tasks
  let TaskComponent

  const taskTypes = Object.keys(taskRegistry.register)

  taskTypes.forEach(function (taskType) {
    before(function () {
      const task = taskRegistry.get(taskType)
      TaskComponent = observer(task.TaskComponent)
      const taskModel = task.TaskModel.create({
        instruction: `${taskType} instructions`,
        question: `${taskType} question`,
        taskKey: 'init',
        type: taskType
      })
      tasks = [ taskModel ]
      step = {
        isComplete: true,
        stepKey: 'S1',
        taskKeys: ['init'],
        tasks: {
          init: tasks[0]
        }
      }
      /*
      TODO: use the RootStore here 
      */
      const classifications = ClassificationStore.create()
      const store = types.model('MockStore', {
        classifications: ClassificationStore,
        task: task.TaskModel
      })
      .create({
        classifications,
        task: taskModel
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
      const annotation = classifications.addAnnotation(taskModel)
      classification = classifications.active
      addAnnotation = classifications.addAnnotation
      taskModel.setAnnotation(annotation)
    })

    describe(`Task ${taskType}`, function () {
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
        expect(wrapper.find(TaskComponent.displayName)).to.have.lengthOf(1)
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
            taskWrapper = wrapper.find(TaskComponent.displayName)
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
            taskWrapper = wrapper.find(TaskComponent.displayName)
          })

          it('should be enabled', function () {
            expect(taskWrapper.prop('disabled')).to.be.false()
          })
        })
      })
    })
  })
})
