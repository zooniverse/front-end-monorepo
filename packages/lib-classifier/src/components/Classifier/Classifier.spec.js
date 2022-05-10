import * as React from 'react'
import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import { panoptes } from '@zooniverse/panoptes-js'
import { Grommet } from 'grommet'
import { when } from 'mobx'
import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import { Factory } from 'rosie'
import sinon from 'sinon'

import RootStore from '@store'
import { ProjectFactory, SubjectFactory } from '@test/factories'
import mockStore, { defaultAuthClient, defaultClient } from '@test/mockStore/mockStore'
import branchingWorkflow from '@test/mockStore/branchingWorkflow'
import stubPanoptesJs from '@test/stubPanoptesJs'
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

  describe('with permission to view an inactive workflow', function () {
    const allowedRoles = ['owner', 'collaborator', 'tester']
    allowedRoles.forEach(function (role) {
      describe(role, function () {
        before(async function () {
          const roles = [role]
          const subjectSnapshot = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
          const workflowSnapshot = branchingWorkflow
          const projectSnapshot = ProjectFactory.build({
            links: {
              active_workflows: [],
              workflows: [workflowSnapshot.id]
            }
          })
          sinon.stub(panoptes, 'get').callsFake((endpoint, query, headers) => {
            switch (endpoint) {
              case '/field_guides': {
                const field_guides = []
                return Promise.resolve({ body: { field_guides }})
              }
              case '/project_preferences': {
                const project_preferences = []
                return Promise.resolve({ body: { project_preferences }})
              }
              case '/project_roles': {
                const project_roles = [{ roles }]
                return Promise.resolve({ body: { project_roles }})
              }
              case '/subjects/queued': {
                const subjects = [subjectSnapshot, ...Factory.buildList('subject', 9)]
                return Promise.resolve({ body: { subjects }})
              }
            }
          })
          sinon.stub(panoptes, 'post').callsFake((...args) => {
            return Promise.resolve({ headers: {}, body: { project_preferences: []}})
          })
          const checkBearerToken = sinon.stub().callsFake(() => Promise.resolve('mockAuth'))
          const checkCurrent = sinon.stub().callsFake(() => Promise.resolve({ id: 123, login: 'mockUser' }))
          const authClient = { ...defaultAuthClient, checkBearerToken, checkCurrent }
          const client = { ...defaultClient, panoptes }
          const store = RootStore.create({}, { authClient, client })
          render(
            <Classifier
              classifierStore={store}
              project={projectSnapshot}
              workflowID={workflowSnapshot.id}
              workflowSnapshot={workflowSnapshot}
              workflowVersion={workflowSnapshot.version}
            />,
            {
              wrapper: withStore(store)
            }
          )
          await when(() => store.subjects.loadingState === asyncStates.success)
          store.subjectViewer.onSubjectReady()
          taskTab = screen.getByRole('tab', { name: 'TaskArea.task'})
          tutorialTab = screen.getByRole('tab', { name: 'TaskArea.tutorial'})
          subjectImage = screen.queryByRole('img', { name: `Subject ${subjectSnapshot.id}` })
          tabPanel = screen.getByRole('tabpanel', { name: '1 Tab Contents'})
          const task = workflowSnapshot.tasks.T0
          const getAnswerInput = answer => within(tabPanel).getByRole('radio', { name: answer.label })
          taskAnswers = task.answers.map(getAnswerInput)
        })

        after(function () {
          panoptes.get.restore()
          panoptes.post.restore()
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
  })

  describe('without permission to view an inactive workflow', function () {
    before(async function () {
      const roles = []
      const subjectSnapshot = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
      const workflowSnapshot = branchingWorkflow
      const projectSnapshot = ProjectFactory.build({
        links: {
          active_workflows: [],
          workflows: [workflowSnapshot.id]
        }
      })
      sinon.stub(panoptes, 'get').callsFake((endpoint, query, headers) => {
        switch (endpoint) {
          case '/field_guides': {
            const field_guides = []
            return Promise.resolve({ body: { field_guides }})
          }
          case '/project_preferences': {
            const project_preferences = []
            return Promise.resolve({ body: { project_preferences }})
          }
          case '/project_roles': {
            const project_roles = [{ roles }]
            return Promise.resolve({ body: { project_roles }})
          }
          case '/subjects/queued': {
            const subjects = [subjectSnapshot, ...Factory.buildList('subject', 9)]
            return Promise.resolve({ body: { subjects }})
          }
        }
      })
      sinon.stub(panoptes, 'post').callsFake((...args) => {
        return Promise.resolve({ headers: {}, body: { project_preferences: []}})
      })
      const checkBearerToken = sinon.stub().callsFake(() => Promise.resolve('mockAuth'))
      const checkCurrent = sinon.stub().callsFake(() => Promise.resolve({ id: 123, login: 'mockUser' }))
      const authClient = { ...defaultAuthClient, checkBearerToken, checkCurrent }
      const client = { ...defaultClient, panoptes }
      const store = RootStore.create({}, { authClient, client })
      render(
        <Classifier
          classifierStore={store}
          project={projectSnapshot}
          workflowID={workflowSnapshot.id}
          workflowSnapshot={workflowSnapshot}
          workflowVersion={workflowSnapshot.version}
        />,
        {
          wrapper: withStore(store)
        }
      )
      store.subjectViewer.onSubjectReady()
      taskTab = screen.queryByRole('tab', { name: 'TaskArea.task'})
      tutorialTab = screen.queryByRole('tab', { name: 'TaskArea.tutorial'})
      subjectImage = screen.queryByRole('img', { name: `Subject ${subjectSnapshot.id}` })
      tabPanel = screen.queryByRole('tabpanel', { name: '1 Tab Contents'})
      const task = workflowSnapshot.tasks.T0
      const getAnswerInput = answer => within(tabPanel).queryByRole('radio', { name: answer.label })
      taskAnswers = task.answers.map(getAnswerInput)
    })

    after(function () {
      panoptes.get.restore()
      panoptes.post.restore()
    })

    it('should have a task tab', function () {
      expect(taskTab).to.be.ok()
    })

    it('should have a tutorial tab', function () {
      expect(tutorialTab).to.be.ok()
    })

    it('should not have a subject image', function () {
      expect(subjectImage).to.be.null()
    })

    describe('task answers', function () {
      it('should not be displayed', function () {
        taskAnswers.forEach(radioButton => {
          expect(radioButton).to.be.null()
        })
      })
    })
  })
})