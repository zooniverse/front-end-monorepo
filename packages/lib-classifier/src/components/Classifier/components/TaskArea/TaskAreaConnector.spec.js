import zooTheme from '@zooniverse/grommet-theme'
import { render, screen } from '@testing-library/react'
import { expect } from 'chai'
import { Grommet } from 'grommet'
import { when } from 'mobx'
import { Provider } from 'mobx-react'
import nock from 'nock'
import React from 'react'
import { Factory } from 'rosie'

import { SubjectFactory, SubjectSetFactory, WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'
import TaskAreaConnector from './TaskAreaConnector'

import DisabledTaskPopupLocale from './components/DisabledTaskPopup/locales/en'
const { DisabledTaskPopup: popupText } = DisabledTaskPopupLocale

describe('TaskAreaConnector', function () {

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
    let finishedMessage
    let selectButton
    let nextButton
    let dismissButton
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
      finishedMessage = screen.queryByText(popupText.body)
      selectButton = screen.queryByText(popupText.options.select)
      nextButton = screen.queryByText(popupText.options.next)
      dismissButton = screen.queryByText(popupText.options.dismiss)
      inputs = screen.queryAllByRole('radio')
    })

    it('should render the active task', function () {
      expect(inputs).to.not.be.empty()
      inputs.forEach(input => {
        expect(input.disabled).to.be.false()
      })
    })

    it('should not show a message that the subject is finished', function () {
      expect(finishedMessage).to.be.null()
    })

    it('should not show a button to choose a new subject', function () {
      expect(selectButton).to.be.null()
    })

    it('should not show a button to choose the next available subject', function () {
      expect(nextButton).to.be.null()
    })

    it('should not show a button to dismiss the popup', function () {
      expect(dismissButton).to.be.null()
    })
  })

  describe('with an indexed subject set', function () {

    function mockSubjectSetAPI(subjectSetSnapshot) {
      const response = {
        columns: ['subject_id'],
        rows: [
          ['1', '2', '3', '4', '5']
        ]
      }
      return nock('https://subject-set-search-api.zooniverse.org')
        .get(`/subjects/${subjectSetSnapshot.id}.json`)
        .query(true)
        .reply(200, response)
    }

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
      const subjectSetAPI = mockSubjectSetAPI(subjectSetSnapshot)

      const store = mockStore({ subject, workflow: workflowSnapshot })
      store.subjectSets.setResources([subjectSetSnapshot])
      const workflow = store.workflows.active
      workflow.selectSubjectSet(subjectSetSnapshot.id)
      await when(subjectsAreReady(store.subjects))
      store.subjectViewer.onSubjectReady()
      return store
    }

    describe('with a retired subject', function () {
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
        finishedMessage = screen.queryByText(popupText.body)
        selectButton = screen.queryByText(popupText.options.select)
        nextButton = screen.queryByText(popupText.options.next)
        dismissButton = screen.queryByText(popupText.options.dismiss)
        inputs = screen.queryAllByRole('radio')
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
        finishedMessage = screen.queryByText(popupText.body)
        selectButton = screen.queryByText(popupText.options.select)
        nextButton = screen.queryByText(popupText.options.next)
        dismissButton = screen.queryByText(popupText.options.dismiss)
        inputs = screen.queryAllByRole('radio')
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
      let finishedMessage
      let selectButton
      let nextButton
      let dismissButton
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
        finishedMessage = screen.queryByText(popupText.body)
        selectButton = screen.queryByText(popupText.options.select)
        nextButton = screen.queryByText(popupText.options.next)
        dismissButton = screen.queryByText(popupText.options.dismiss)
        inputs = screen.queryAllByRole('radio')
      })

      it('should not show a message that the subject is finished', function () {
        expect(finishedMessage).to.be.null()
      })

      it('should not show a button to choose a new subject', function () {
        expect(selectButton).to.be.null()
      })

      it('should not show a button to choose the next available subject', function () {
        expect(nextButton).to.be.null()
      })

      it('should not show a button to dismiss the popup', function () {
        expect(dismissButton).to.be.null()
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