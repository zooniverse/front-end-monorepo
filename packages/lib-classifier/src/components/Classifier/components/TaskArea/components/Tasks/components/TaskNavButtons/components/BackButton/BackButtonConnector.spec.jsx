import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import mockStore from '@test/mockStore'
import mockWorkflow from '../../mocks/mockWorkflow.js'
import BackButtonConnector from './BackButtonConnector'

describe('Components > BackButtonConnector', function () {
  describe('when there is a previous step', function () {
    const classifierStore = mockStore({ workflow: mockWorkflow })
    // Select the first choice in a single answer question
    classifierStore.classifications.active.annotation({ taskKey: 'T0' }).update(0)
    // Advance to the next step
    classifierStore.subjects.active.stepHistory.next()
    it('should be visible', function () {
      render(
        <Grommet theme={zooTheme}>
          <Provider classifierStore={classifierStore}>
            <BackButtonConnector />
          </Provider>
        </Grommet>
      )
      expect(
        screen.getByRole('button', { name: 'TaskArea.Tasks.BackButton.back' })
      ).to.be.ok()
    })

    describe('when clicked', async function () {
      before(async function () {
        render(
          <Grommet theme={zooTheme}>
            <Provider classifierStore={classifierStore}>
              <BackButtonConnector />
            </Provider>
          </Grommet>
        )
        const user = userEvent.setup()
        const button = screen.getByRole('button', {
          name: 'TaskArea.Tasks.BackButton.back'
        })
        await user.click(button)
      })

      it('should undo the most recent step', function () {
        const { latest, steps } = classifierStore.subjects.active.stepHistory
        expect(steps.size).to.equal(1)
        expect(latest.step.stepKey).to.equal('P0')
      })

      it('should select the previous step', function () {
        const activeStep = classifierStore.workflowSteps.active
        expect(activeStep.stepKey).to.equal('P0')
      })

      it('should remove annotations for the current task', function () {
        const { annotations, steps } = classifierStore.subjects.active.stepHistory
        expect(steps.size).to.equal(1)
        const [annotation] = annotations.filter(
          annotation => annotation.task === 'T1'
        )
        expect(annotation).to.be.undefined()
      })
    })
  })
})
