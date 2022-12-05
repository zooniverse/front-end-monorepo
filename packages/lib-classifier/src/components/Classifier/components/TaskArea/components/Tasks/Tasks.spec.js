import { shallow } from 'enzyme'
import Tasks from './Tasks'
import asyncStates from '@zooniverse/async-states'
import * as tasks from '@plugins/tasks'
import { WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import Task from './components/Task'

describe('Tasks', function () {
  let classification
  let step

  Object.keys(tasks).forEach(function (taskType) {
    before(function () {
      // DrawingTask, TranscriptionTask, DataVisAnnotationTask, TextTask all use instruction
      // SingleChoiceTask, MultipleChoiceTask use question
      // keys that aren't defined on certain task models are ignored
      // but missing keys that aren't an optional or maybe type will throw an error
      const type = taskType === 'dropdownSimple' ? 'dropdown-simple' : taskType
      const taskSnapshot = {
        answers: [],
        instruction: `${taskType} instructions`,
        options: ['1', '2', '3', '4'],
        question: `${taskType} question`,
        taskKey: 'init',
        type
      }
      const workflowSnapshot = WorkflowFactory.build({
        id: 'tasksWorkflow',
        display_name: 'A test workflow',
        tasks: {
          init: taskSnapshot
        },
        version: '0.0'
      })
      const rootStore = mockStore({ workflow: workflowSnapshot })
      classification = rootStore.classifications.active
      step = rootStore.workflowSteps.active
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
        expect(wrapper.contains('TaskArea.Tasks.loading')).to.be.true()
      })

      it('should render an error message when there is a loading error', function () {
        const wrapper = shallow(<Tasks loadingState={asyncStates.error} />)
        expect(wrapper.contains('TaskArea.Tasks.error')).to.be.true()
        /** The translation function will simply return keys in a testing environment */
      })

      it('should render null if the workflow is loaded but has no tasks', function () {
        const wrapper = shallow(<Tasks loadingState={asyncStates.success} ready />)
        expect(wrapper.type()).to.be.null()
      })

      describe('without an active step', function () {
        let wrapper

        before(function () {
          wrapper = shallow(
            <Tasks
              loadingState={asyncStates.success}
              ready
              classification={classification}
            />
          )
        })

        it('should render without crashing', function () {
          expect(wrapper).to.be.ok()
        })

        it('should render null', function () {
          expect(wrapper.type()).to.be.null()
        })
      })

      describe('without an active classification', function () {
        let wrapper

        before(function () {
          wrapper = shallow(
            <Tasks
              loadingState={asyncStates.success}
              ready
              step={step}
            />
          )
        })

        it('should render without crashing', function () {
          expect(wrapper).to.be.ok()
        })

        it('should render null', function () {
          expect(wrapper.type()).to.be.null()
        })
      })

      it('should render a task component if the workflow is loaded', function () {
        const wrapper = shallow(
          <Tasks
            loadingState={asyncStates.success}
            ready
            classification={classification}
            step={step}
          />
        )
        // Is there a better way to do this?
        expect(wrapper.find(Task)).to.have.lengthOf(1)
      })

      it('should autofocus the task', function () {
        const wrapper = shallow(
          <Tasks
            loadingState={asyncStates.success}
            ready
            classification={classification}
            step={step}
          />
        )
        // Is there a better way to do this?
        expect(wrapper.find(Task).prop('autoFocus')).to.be.true()
      })

      it('should not render the demo mode messaging', function () {
        const wrapper = shallow(<Tasks />)
        expect(wrapper.contains('TaskArea.Tasks.demoMode')).to.be.false()
        /** The translation function will simply return keys in a testing environment */
      })

      it('should render the demo mode messaging when enabled', function () {
        const wrapper = shallow(
          <Tasks
            classification={classification}
            demoMode
            loadingState={asyncStates.success}
            subjectReadyState={asyncStates.success}
            step={step}
          />)
        expect(wrapper.contains('TaskArea.Tasks.demoMode')).to.be.true()
      })

      it('should disable the task while the subject loads', function () {
        const wrapper = shallow(
          <Tasks
            classification={classification}
            loadingState={asyncStates.success}
            step={step}
            subjectReadyState={asyncStates.loading}
          />
        )
        expect(wrapper.find(Task).prop('disabled')).to.be.true()
      })

      it('should enable the task when the subject media is loaded', function () {
        const wrapper = shallow(
          <Tasks
            classification={classification}
            loadingState={asyncStates.success}
            step={step}
            subjectReadyState={asyncStates.success}
          />
        )
        expect(wrapper.find(Task).prop('disabled')).to.be.false()
      })

      it('should disable the task if the subject media errors', function () {
        const wrapper = shallow(
          <Tasks
            classification={classification}
            loadingState={asyncStates.success}
            step={step}
            subjectReadyState={asyncStates.error}
          />
        )
        expect(wrapper.find(Task).prop('disabled')).to.be.true()
      })
    })
  })
})
