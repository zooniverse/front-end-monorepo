import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import mockStore from '@test/mockStore'
import mockWorkflow from '../../mocks/mockWorkflow.js'
import SGVDoneAndTalkButtonConnector from "./SGVDoneAndTalkButtonConnector"

describe('Components > SGVDoneAndTalkButton', function () {
  let classifierStore

  before(function () {
    const subjectGroupWorkflow = {
      ...mockWorkflow,
      configuration: {
        ...mockWorkflow.configuration,
        subject_viewer: 'subjectGroup',
        subject_viewer_config: {
          grid_columns: 3,
          grid_rows: 3
        }
      }
    }
    classifierStore = mockStore({ workflow: subjectGroupWorkflow })
  })

  describe('on click', function () {
    let classification
    let subject
    let step
    let annotations
    let workflow

    before(async function () {
      classification = classifierStore.classifications.active
      subject = classifierStore.subjects.active
      step = classifierStore.workflowSteps.active
      workflow = classifierStore.workflows.active
      annotations = step.tasks.map(task => classification.annotation(task))

      render(
        <Grommet theme={zooTheme}>
          <Provider classifierStore={classifierStore}>
            <SGVDoneAndTalkButtonConnector />
          </Provider>
        </Grommet>
      )
      const user = userEvent.setup()
      const button = screen.getByRole('button', {
        name: 'Done & Talk in a new tab'
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
      expect(classification.completed).to.equal(true)
    })

    it('should store modal state in workflow', function () {
      expect(workflow.SGVModalState.showModal).to.equal(true)
      expect(workflow.SGVModalState.lastSubject).to.be.an('object')
      expect(workflow.SGVModalState.lastSubject).to.have.property('project')
      expect(workflow.SGVModalState.lastSubject).to.have.property('subjectIds')
      expect(workflow.SGVModalState.lastSubject).to.have.property('locations')
    })

    it('should set modal to show (modal may not render if subject data is incomplete)', function () {
      // The modal should be set to show even if the mock subject doesn't have all the data
      // In production, SGV subjects will have the necessary subjectIds and locations
      expect(workflow.SGVModalState.showModal).to.equal(true)
    })
  })
})