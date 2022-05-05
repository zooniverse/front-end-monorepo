import * as React from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'

import { SubjectFactory } from '@test/factories'
import mockStore from '@test/mockStore'
import Classifier from './Classifier'

describe('Components > Classifier', function () {
  let subjectImage, tabPanel, taskAnswers, taskTab, tutorialTab, workflow

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

  describe('while the subject is loading', function () {
    before(function () {
      const subject = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
      const store = mockStore({ subject })
      const project = store.projects.active
      const projectSnapshot = { ...getSnapshot(project) }
      workflow = store.workflows.active
      const workflowSnapshot = { ...getSnapshot(workflow) }
      render(
        <Classifier
          classifierStore={store}
          project={projectSnapshot}
          subjectID={subject?.id}
          workflowID={workflowSnapshot?.id}
          workflowSnapshot={workflowSnapshot}
          workflowVersion={workflowSnapshot?.version}
        />,
        {
          wrapper: withStore(store)
        }
      )
      taskTab = screen.getByRole('tab', { name: 'TaskArea.task'})
      tutorialTab = screen.getByRole('tab', { name: 'TaskArea.tutorial'})
      subjectImage = screen.getByRole('img', { name: `Subject ${subject.id}` })
      tabPanel = screen.getByRole('tabpanel', { name: '1 Tab Contents'})
      const task = workflowSnapshot.tasks.T0
      const getAnswerInput = answer => within(tabPanel).getByRole('radio', { name: answer.label })
      taskAnswers = task.answers.map(getAnswerInput)
    })

    it('should have a task tab', function () {
      expect(taskTab).to.be.ok()
    })

    it('should have a tutorial tab', function () {
      expect(tutorialTab).to.be.ok()
    })

    it('should have a subject image', function () {
      expect(subjectImage).to.be.ok()
    })

    describe('task answers', function () {
      it('should be displayed', function () {
        expect(taskAnswers).to.have.lengthOf(workflow.tasks.T0.answers.length)
      })

      it('should be linked to the task', function () {
        taskAnswers.forEach(radioButton => {
          expect(radioButton.name).to.equal('T0')
        })
      })

      it('should be disabled', function () {
        taskAnswers.forEach(radioButton => {
          expect(radioButton.disabled).to.be.true()
        })
      })
    })
  })

  describe('after the subject has loaded', function () {
    before(function () {
      const subject = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
      const store = mockStore({ subject })
      const project = store.projects.active
      const projectSnapshot = { ...getSnapshot(project) }
      workflow = store.workflows.active
      const workflowSnapshot = { ...getSnapshot(workflow) }
      render(
        <Classifier
          classifierStore={store}
          project={projectSnapshot}
          subjectID={subject?.id}
          workflowID={workflowSnapshot?.id}
          workflowSnapshot={workflowSnapshot}
          workflowVersion={workflowSnapshot?.version}
        />,
        {
          wrapper: withStore(store)
        }
      )
      store.subjectViewer.onSubjectReady()
      taskTab = screen.getByRole('tab', { name: 'TaskArea.task'})
      tutorialTab = screen.getByRole('tab', { name: 'TaskArea.tutorial'})
      subjectImage = screen.getByRole('img', { name: `Subject ${subject.id}` })
      tabPanel = screen.getByRole('tabpanel', { name: '1 Tab Contents'})
      const task = workflowSnapshot.tasks.T0
      const getAnswerInput = answer => within(tabPanel).getByRole('radio', { name: answer.label })
      taskAnswers = task.answers.map(getAnswerInput)
    })

    it('should have a task tab', function () {
      expect(taskTab).to.be.ok()
    })

    it('should have a tutorial tab', function () {
      expect(tutorialTab).to.be.ok()
    })

    it('should have a subject image', function () {
      expect(subjectImage).to.be.ok()
    })

    describe('task answers', function () {
      it('should be displayed', function () {
        expect(taskAnswers).to.have.lengthOf(workflow.tasks.T0.answers.length)
      })

      it('should be linked to the task', function () {
        taskAnswers.forEach(radioButton => {
          expect(radioButton.name).to.equal('T0')
        })
      })

      it('should be enabled', function () {
        taskAnswers.forEach(radioButton => {
          expect(radioButton.disabled).to.be.false()
        })
      })
    })
  })

  describe('when the locale changes', function () {
    let locale

    before(function () {
      const subject = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
      const store = mockStore({ subject })
      const project = store.projects.active
      const projectSnapshot = { ...getSnapshot(project) }
      workflow = store.workflows.active
      const workflowSnapshot = { ...getSnapshot(workflow) }
      const { rerender } = render(
        <Classifier
          classifierStore={store}
          locale='en'
          project={projectSnapshot}
          subjectID={subject?.id}
          workflowID={workflowSnapshot?.id}
          workflowSnapshot={workflowSnapshot}
          workflowVersion={workflowSnapshot?.version}
        />,
        {
          wrapper: withStore(store)
        }
      )
      store.subjectViewer.onSubjectReady()
      rerender(
        <Classifier
          classifierStore={store}
          locale='fr'
          project={projectSnapshot}
          subjectID={subject?.id}
          workflowID={workflowSnapshot?.id}
          workflowSnapshot={workflowSnapshot}
          workflowVersion={workflowSnapshot?.version}
        />,
      )
      locale = store.locale
      taskTab = screen.getByRole('tab', { name: 'TaskArea.task'})
      tutorialTab = screen.getByRole('tab', { name: 'TaskArea.tutorial'})
      subjectImage = screen.getByRole('img', { name: `Subject ${subject.id}` })
      tabPanel = screen.getByRole('tabpanel', { name: '1 Tab Contents'})
      const task = workflowSnapshot.tasks.T0
      const getAnswerInput = answer => within(tabPanel).getByRole('radio', { name: answer.label })
      taskAnswers = task.answers.map(getAnswerInput)
    })

    it('should update the global locale', function () {
      expect(locale).to.equal('fr')
    })

    it('should have a task tab', function () {
      expect(taskTab).to.be.ok()
    })

    it('should have a tutorial tab', function () {
      expect(tutorialTab).to.be.ok()
    })

    it('should have a subject image', function () {
      expect(subjectImage).to.be.ok()
    })

    describe('task answers', function () {
      it('should be displayed', function () {
        expect(taskAnswers).to.have.lengthOf(workflow.tasks.T0.answers.length)
      })

      it('should be linked to the task', function () {
        taskAnswers.forEach(radioButton => {
          expect(radioButton.name).to.equal('T0')
        })
      })

      it('should be enabled', function () {
        taskAnswers.forEach(radioButton => {
          expect(radioButton.disabled).to.be.false()
        })
      })
    })
  })
})