import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import mockStore from '@test/mockStore'
import mockWorkflow from '../../mocks/mockWorkflow.js'
import DoneAndTalkButtonConnector from './DoneAndTalkButtonConnector.js'

describe('Components > DoneAndTalkButtonConnector', function () {
  const classifierStore = mockStore({ workflow: mockWorkflow })
  const classification = classifierStore.classifications.active
  const subject = classifierStore.subjects.active
  const step = classifierStore.workflowSteps.active
  const annotations = step.tasks.map(task => classification.annotation(task))

  describe('on click', function () {
    before(async function () {
      render(
        <Grommet theme={zooTheme}>
          <Provider classifierStore={classifierStore}>
            <DoneAndTalkButtonConnector />
          </Provider>
        </Grommet>
      )
      const user = userEvent.setup()
      const button = screen.getByRole('button', {
        name: 'TaskArea.Tasks.DoneAndTalkButton.doneAndTalk TaskArea.Tasks.DoneAndTalkButton.newTab'
      })
      await user.click(button)
    })

    it('should create a default annotation for each task if there is not an annotation for that task', function () {
      annotations.forEach((annotation, index) => {
        const task = step.tasks[index]
        const { task: taskKey, value } = task.defaultAnnotation()
        expect(annotation.task).to.equal(taskKey)
        expect(annotation.value).to.deep.equal(value)
      })
    })

    it('should complete the classification', function () {
      expect(classification.completed).to.be.true()
    })

    it('should open the subject in Talk', function () {
      const talkURL = `https://example.org/projects/zooniverse/example/talk/subjects/${subject.id}`
      expect(subject.shouldDiscuss.url).to.equal(talkURL)
    })
  })
})
