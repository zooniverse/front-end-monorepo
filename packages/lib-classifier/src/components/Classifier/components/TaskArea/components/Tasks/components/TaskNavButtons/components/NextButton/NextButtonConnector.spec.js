import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import mockStore from '@test/mockStore'
import mockWorkflow from '../../mocks/mockWorkflow.js'

import NextButtonConnector from './NextButtonConnector.js'

describe('Components > NextButtonConnector', function () {
  const classifierStore = mockStore({ workflow: mockWorkflow })
  // Select the first choice in a single answer question
  classifierStore.classifications.active.annotation({ taskKey: 'T0' }).update(0)

  describe('when there is a next step available in a workflow', function () {
    it('should be visible', function () {
      render(
        <Grommet theme={zooTheme}>
          <Provider classifierStore={classifierStore}>
            <NextButtonConnector />
          </Provider>
        </Grommet>
      )
      expect(
        screen.getByRole('button', { name: 'TaskArea.Tasks.NextButton.next' })
      ).to.be.ok()
    })
  })

  describe('on click', function () {
    before(async function () {
      render(
        <Grommet theme={zooTheme}>
          <Provider classifierStore={classifierStore}>
            <NextButtonConnector />
          </Provider>
        </Grommet>
      )
      const user = userEvent.setup()
      const button = screen.getByRole('button', {
        name: 'TaskArea.Tasks.NextButton.next'
      })
      await user.click(button)
    })

    it('should create a default annotation for each new task if there is not an annotation for that task', function () {
      const step = classifierStore.workflowSteps.active
      const classification = classifierStore.classifications.active
      step.tasks.forEach(task => {
        const { task: taskKey, value } = task.defaultAnnotation()
        const annotation = classification.annotation(task)
        expect(annotation.task).to.equal(taskKey)
        expect(annotation.value).to.deep.equal(value)
      })
    })

    it('should select the next step', function () {
      const step = classifierStore.workflowSteps.active
      expect(step.stepKey).to.equal('P1')
    })

    it('should complete the previous step tasks', function () {
      const firstStep = classifierStore.workflowSteps.steps.get('P0')
      const { annotations } = classifierStore.subjects.active.stepHistory
      expect(firstStep.isComplete(annotations)).to.be.true()
    })
  })
})
