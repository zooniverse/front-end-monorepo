import zooTheme from '@zooniverse/grommet-theme'
import { render, screen } from '@testing-library/react'
import { expect } from 'chai'
import { Grommet } from 'grommet'
import { when } from 'mobx'
import { Provider } from 'mobx-react'

import { SubjectFactory, SubjectSetFactory, WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'
import TaskAreaConnector from './TaskAreaConnector'

describe('TaskAreaConnector', function () {
  this.timeout(0)

  function withStore(store) {
    return function Wrapper({ children }) {
      return (
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            {children}
          </Provider>
        </Grommet>
      )
    }
  }

  function subjectsAreReady(subjects) {
    return function subjectsAreLoaded() {
      const { resources } = subjects
      return resources.size > 9
    }
  }

  describe('without indexed subjects', function () {

    let disabledTaskPopup
    let inputs

    before(function () {
      const store = mockStore()
      store.subjectViewer.onSubjectReady()

      render(
        <TaskAreaConnector />,
        {
          wrapper: withStore(store)
        }
      )
      disabledTaskPopup = screen.queryByRole('dialog')
      inputs = screen.queryAllByRole('radio')
    })

    it('should render the active task', function () {
      expect(inputs).to.not.be.empty()
      inputs.forEach(input => {
        expect(input.disabled).to.be.false()
      })
    })

    it('should not show the disabled task popup', function () {
      expect(disabledTaskPopup).to.be.null()
    })
  })

  describe('with an indexed subject set', function () {
    async function buildStore(subject) {
      const subjectSetSnapshot = SubjectSetFactory.build({
        metadata: {
          indexFields: 'date,title'
        }
      })
      const workflowSnapshot = WorkflowFactory.build({
        first_task: 'T0',
        grouped: true,
        prioritized: true,
        tasks: {
          T0: {
            answers: [{ label: 'yes', next: 'T1' }, { label: 'no', next: 'T2' }],
            question: 'Is there a cat?',
            required: false,
            taskKey: 'T0',
            type: 'single'
          }
        },
        links: {
          subject_sets: [subjectSetSnapshot.id]
        }
      })

      const store = mockStore({ subject, workflow: workflowSnapshot })
      store.subjectSets.setResources([subjectSetSnapshot])
      const workflow = store.workflows.active
      workflow.selectSubjectSet(subjectSetSnapshot.id)
      await when(subjectsAreReady(store.subjects))
      store.subjectViewer.onSubjectReady()
      return store
    }

    describe('with a retired subject', function () {
      let disabledTaskPopup
      let finishedMessage
      let selectButton
      let nextButton
      let dismissButton
      let inputs

      before(async function () {
        const subject = SubjectFactory.build({
          retired: true
        })
        const store = await buildStore(subject)
        render(
          <TaskAreaConnector />,
          {
            wrapper: withStore(store)
          }
        )
        disabledTaskPopup = screen.queryByRole('dialog')
        /** The translation function will simply return keys in a testing environment */
        finishedMessage = screen.queryByText('TaskArea.DisabledTaskPopup.body')
        selectButton = screen.queryByText('TaskArea.DisabledTaskPopup.options.select')
        nextButton = screen.queryByText('TaskArea.DisabledTaskPopup.options.next')
        dismissButton = screen.queryByText('TaskArea.DisabledTaskPopup.options.dismiss')
        inputs = screen.queryAllByRole('radio')
      })

      it('should show the disabled task popup', function () {
        expect(disabledTaskPopup.getAttribute('open')).to.exist()
      })

      it('should show a message that the subject is finished', function () {
        expect(finishedMessage).to.be.ok()
      })

      it('should show a button to choose a new subject', function () {
        expect(selectButton).to.be.ok()
      })

      it('should show a button to choose the next available subject', function () {
        expect(nextButton).to.be.ok()
      })

      it('should show a button to dismiss the popup', function () {
        expect(dismissButton).to.be.ok()
      })

      it('should disable the active task', function () {
        expect(inputs).to.not.be.empty()
        inputs.forEach(input => {
          expect(input.disabled).to.be.true()
        })
      })
    })

    describe('with an already seen subject', function () {
      let disabledTaskPopup
      let finishedMessage
      let selectButton
      let nextButton
      let dismissButton
      let inputs

      before(async function () {
        const subject = SubjectFactory.build({
          already_seen: true
        })
        const store = await buildStore(subject)
        render(
          <TaskAreaConnector />,
          {
            wrapper: withStore(store)
          }
        )
        disabledTaskPopup = screen.queryByRole('dialog')
        /** The translation function will simply return keys in a testing environment */
        finishedMessage = screen.queryByText('TaskArea.DisabledTaskPopup.body')
        selectButton = screen.queryByText('TaskArea.DisabledTaskPopup.options.select')
        nextButton = screen.queryByText('TaskArea.DisabledTaskPopup.options.next')
        dismissButton = screen.queryByText('TaskArea.DisabledTaskPopup.options.dismiss')
        inputs = screen.queryAllByRole('radio')
      })

      it('should show the disabled task popup', function () {
        expect(disabledTaskPopup.getAttribute('open')).to.exist()
      })

      it('should show a message that the subject is finished', function () {
        expect(finishedMessage).to.be.ok()
      })

      it('should show a button to choose a new subject', function () {
        expect(selectButton).to.be.ok()
      })

      it('should show a button to choose the next available subject', function () {
        expect(nextButton).to.be.ok()
      })

      it('should show a button to dismiss the popup', function () {
        expect(dismissButton).to.be.ok()
      })

      it('should disable the active task', function () {
        expect(inputs).to.not.be.empty()
        inputs.forEach(input => {
          expect(input.disabled).to.be.true()
        })
      })
    })

    describe('with an unfinished subject', function () {
      let disabledTaskPopup
      let inputs

      before(async function () {
        const subject = SubjectFactory.build()
        const store = await buildStore(subject)
        render(
          <TaskAreaConnector />,
          {
            wrapper: withStore(store)
          }
        )
        disabledTaskPopup = screen.queryByRole('dialog')
        inputs = screen.queryAllByRole('radio')
      })

      it('should not show the disabled task popup', function () {
        expect(disabledTaskPopup).to.be.null()
      })

      it('should not disable the active task', function () {
        expect(inputs).to.not.be.empty()
        inputs.forEach(input => {
          expect(input.disabled).to.be.false()
        })
      })
    })
  })
})
