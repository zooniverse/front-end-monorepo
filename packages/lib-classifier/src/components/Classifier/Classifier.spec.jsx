import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import { auth, panoptes } from '@zooniverse/panoptes-js'
import { Grommet } from 'grommet'
import { when } from 'mobx'
import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import nock from 'nock'
import { Factory } from 'rosie'
import sinon from 'sinon'

import RootStore from '@store'
import { ProjectFactory, SubjectFactory, SubjectSetFactory, TutorialFactory } from '@test/factories'
import mockStore, { defaultAuthClient, defaultClient } from '@test/mockStore/mockStore.js'
import branchingWorkflow, { workflowStrings } from '@test/mockStore/branchingWorkflow.js'
import Classifier from './Classifier'

describe('Components > Classifier', function () {
  function mockPanoptesAPI() {
    return nock('https://panoptes-staging.zooniverse.org/api')
      .persist()
      .get('/field_guides')
      .reply(200, { field_guides: [] })
      .get('/project_preferences')
      .query(true)
      .reply(200, { project_preferences: [] })
      .post('/project_preferences')
      .query(true)
      .reply(200, { project_preferences: [] })
  }

  class MockImage {
    constructor () {
      this.naturalHeight = 1000
      this.naturalWidth = 500
      const fakeLoadEvent = {
        ...new Event('load'),
        target: this
      }
      setTimeout(() => this.onload(fakeLoadEvent), 500)
    }
  }

  class MockSlowImage {
    constructor () {
      this.naturalHeight = 1000
      this.naturalWidth = 500
      const fakeLoadEvent = {
        ...new Event('load'),
        target: this
      }
      setTimeout(() => this.onload(fakeLoadEvent), 5000)
    }
  }

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
    let subjectImagePlaceholder, tabPanel, taskAnswers, taskTab, tutorialTab, workflow

    before(function () {
      sinon.replace(window, 'Image', MockSlowImage)
      const subject = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
      const store = mockStore({ subject })
      workflow = store.workflows.active
      const workflowSnapshot = { ...getSnapshot(workflow) }
      workflowSnapshot.strings = workflowStrings
      render(
        <Classifier
          workflowSnapshot={workflowSnapshot}
        />,
        {
          wrapper: withStore(store)
        }
      )
      taskTab = screen.getByRole('tab', { name: 'TaskArea.task'})
      tutorialTab = screen.getByRole('tab', { name: 'TaskArea.tutorial'})
      subjectImagePlaceholder = screen.getByTestId('placeholder-svg')
      tabPanel = screen.getByRole('tabpanel', { name: '1 Tab Contents'})
      const task = workflowSnapshot.tasks.T0
      const getAnswerInput = answer => within(tabPanel).getByRole('radio', { name: answer.label })
      taskAnswers = task.answers.map(getAnswerInput)
    })

    after(function () {
      sinon.restore()
    })

    it('should have a task tab', function () {
      expect(taskTab).to.exist
    })

    it('should have a tutorial tab', function () {
      expect(tutorialTab).to.exist
    })

    it('should have a placeholder', function () {
      expect(subjectImagePlaceholder).to.exist
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
          expect(radioButton.disabled).to.equal(true)
        })
      })
    })
  })

  describe('after the subject has loaded', function () {
    let subjectImage, tabPanel, taskAnswers, taskTab, tutorialTab, workflow

    before(async function () {
      sinon.replace(window, 'Image', MockImage)
      const subject = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
      const store = mockStore({ subject })
      const project = store.projects.active
      workflow = store.workflows.active
      const workflowSnapshot = { ...getSnapshot(workflow) }
      workflowSnapshot.strings = workflowStrings
      render(
        <Classifier
          workflowSnapshot={workflowSnapshot}
        />,
        {
          wrapper: withStore(store)
        }
      )
      await when(() => store.subjectViewer.loadingState === asyncStates.success)
      taskTab = screen.getByRole('tab', { name: 'TaskArea.task'})
      tutorialTab = screen.getByRole('tab', { name: 'TaskArea.tutorial'})
      subjectImage = screen.getByRole('img', { name: `Subject ${subject.id}` })
      tabPanel = screen.getByRole('tabpanel', { name: '1 Tab Contents'})
      const task = workflowSnapshot.tasks.T0
      const getAnswerInput = answer => within(tabPanel).getByRole('radio', { name: answer.label })
      taskAnswers = task.answers.map(getAnswerInput)
    })

    after(function () {
      sinon.restore()
    })

    it('should have a task tab', function () {
      expect(taskTab).to.exist
    })

    it('should have a tutorial tab', function () {
      expect(tutorialTab).to.exist
    })

    it('should have a subject image', function () {
      expect(subjectImage.getAttribute('href')).to.equal('https://foo.bar/example.png')
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
          expect(radioButton.disabled).to.equal(false)
        })
      })
    })
  })

  describe('when the workflow version changes', function () {
    let subjectImage, tabPanel, taskAnswers, taskTab, tutorialTab, workflow

    before(async function () {
      sinon.replace(window, 'Image', MockImage)
      const roles = []
      const subjectSnapshot = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
      const workflowSnapshot = branchingWorkflow
      workflowSnapshot.strings = workflowStrings
      const projectSnapshot = ProjectFactory.build({
        links: {
          active_workflows: [workflowSnapshot.id],
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
      const mockUser = { id: 123, login: 'mockUser' }
      sinon.stub(auth, 'decodeJWT').resolves({
        user: mockUser,
        error: null
      })
      sinon.stub(auth, 'verify').resolves({
        data: mockUser
      })
      const checkBearerToken = sinon.stub().resolves('mockAuth')
      const authClient = { ...defaultAuthClient, checkBearerToken }
      const client = { ...defaultClient, panoptes }
      const store = RootStore.create({
        projects: {
          active: projectSnapshot.id,
          resources: {
            [projectSnapshot.id]: projectSnapshot
          }
        }
      }, { authClient, client })
      store.workflows.setResources([workflowSnapshot])
      const { rerender } = render(
        <Classifier
          workflowSnapshot={workflowSnapshot}
        />,
        {
          wrapper: withStore(store)
        }
      )
      await when(() => store.subjectViewer.loadingState === asyncStates.success)
      const newSnapshot = {
        ...workflowSnapshot,
        version: '0.1',
        strings: {
          ...workflowSnapshot.strings,
          'tasks.T0.answers.0.label': 'Answer one',
          'tasks.T0.answers.1.label': 'Answer two'
        },
        tasks: {
          ...workflowSnapshot.tasks,
          T0: {
            ...workflowSnapshot.tasks.T0,
            answers: [{ label: 'Answer one', next: 'T1' }, { label: 'Answer two', next: 'T2' }]
          }
        }
      }
      store.workflows.setResources([newSnapshot])
      rerender(
        <Classifier
          classifierStore={store}
          workflowSnapshot={newSnapshot}
        />,
        {
          wrapper: withStore(store)
        }
      )
      workflow = store.workflows.active
      await when(() => store.subjectViewer.loadingState === asyncStates.success)
      taskTab = screen.getByRole('tab', { name: 'TaskArea.task'})
      tutorialTab = screen.getByRole('tab', { name: 'TaskArea.tutorial'})
      subjectImage = screen.getByRole('img', { name: `Subject ${subjectSnapshot.id}` })
      tabPanel = screen.getByRole('tabpanel', { name: '1 Tab Contents'})
      const task = newSnapshot.tasks.T0
      const getAnswerInput = answer => within(tabPanel).queryByRole('radio', { name: answer.label })
      taskAnswers = task.answers.map(getAnswerInput)
    })

    after(function () {
      sinon.restore()
    })

    it('should have a task tab', function () {
      expect(taskTab).to.exist
    })

    it('should have a tutorial tab', function () {
      expect(tutorialTab).to.exist
    })

    it('should have a subject image', function () {
      expect(subjectImage.getAttribute('href')).to.equal('https://foo.bar/example.png')
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
          expect(radioButton.disabled).to.equal(false)
        })
      })
    })
  })

  describe('with showTutorial', function () {
    let tutorialHeading

    before(async function () {
      sinon.replace(window, 'Image', MockImage)
      const subject = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
      const steps = [
        { content: "Hello" },
        { content: "Step 2" }
      ]
      const workflowTutorial = TutorialFactory.build({ steps })
      const store = mockStore({ subject })
      store.userProjectPreferences.clear()
      store.tutorials.setResources([workflowTutorial])
      store.tutorials.setActive(workflowTutorial.id)
      const workflowSnapshot = { ...getSnapshot(store.workflows.active) }
      workflowSnapshot.strings = workflowStrings
      render(
        <Classifier
          locale='en'
          showTutorial
          workflowSnapshot={workflowSnapshot}
        />,
        {
          wrapper: withStore(store)
        }
      )
      tutorialHeading = await screen.findByRole('heading', { name: 'ModalTutorial.title' })
    })

    after(function () {
      sinon.restore()
    })

    it('should show the popup tutorial', function () {
      expect(tutorialHeading).to.exist
    })
  })

  describe('without showTutorial', function () {
    let tutorialHeading

    before(async function () {
      sinon.replace(window, 'Image', MockImage)
      const subject = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
      const steps = [
        { content: "Hello" },
        { content: "Step 2" }
      ]
      const workflowTutorial = TutorialFactory.build({ steps })
      const store = mockStore({ subject })
      store.userProjectPreferences.clear()
      store.tutorials.setResources([workflowTutorial])
      store.tutorials.setActive(workflowTutorial.id)
      const workflowSnapshot = { ...getSnapshot(store.workflows.active) }
      workflowSnapshot.strings = workflowStrings
      render(
        <Classifier
          locale='en'
          workflowSnapshot={workflowSnapshot}
        />,
        {
          wrapper: withStore(store)
        }
      )
      await when(() => store.tutorials.active.hasNotBeenSeen)
      tutorialHeading = screen.queryByRole('heading', { name: 'ModalTutorial.title' })
    })

    after(function () {
      sinon.restore()
    })

    it('should not show the popup tutorial', function () {
      expect(tutorialHeading).to.equal(null)
    })
  })

  describe('when the subject set changes', function () {
    let subjectImage, tabPanel, taskAnswers, taskTab, tutorialTab, workflow

    before(async function () {
      sinon.replace(window, 'Image', MockImage)

      const roles = []
      const subjectOneSnapshot = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example1.png' }] })
      const subjectTwoSnapshot = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example2.png' }] })
      const workflowSnapshot = branchingWorkflow
      workflowSnapshot.strings = workflowStrings
      workflowSnapshot.grouped = true
      const projectSnapshot = ProjectFactory.build({
        links: {
          active_workflows: [workflowSnapshot.id],
          workflows: [workflowSnapshot.id]
        }
      })

      mockPanoptesAPI()
        .get('/project_roles')
        .reply(200, { project_roles: [{ roles }]})
        .get('/subjects/queued')
        .query(query => query.subject_set_id === '1')
        .reply(200, { subjects: [subjectOneSnapshot, ...Factory.buildList('subject', 9)] })
        .get('/subjects/queued')
        .query(query => query.subject_set_id === '2')
        .reply(200, { subjects: [subjectTwoSnapshot, ...Factory.buildList('subject', 9)] })
        .get('/subject_sets/1')
        .query(true)
        .reply(200, { subject_sets: [SubjectSetFactory.build({ id: '1' })] })
        .get('/subject_sets/2')
        .query(true)
        .reply(200, { subject_sets: [SubjectSetFactory.build({ id: '2' })] })

      const mockUser = { id: 123, login: 'mockUser' }
      sinon.stub(auth, 'decodeJWT').resolves({
        user: mockUser,
        error: null
      })
      sinon.stub(auth, 'verify').resolves({
        data: mockUser
      })

      const checkBearerToken = sinon.stub().resolves('mockAuth')
      const authClient = { ...defaultAuthClient, checkBearerToken }
      const client = { ...defaultClient, panoptes }
      const store = RootStore.create({
        projects: {
          active: projectSnapshot.id,
          resources: {
            [projectSnapshot.id]: projectSnapshot
          }
        }
      }, { authClient, client })
      const { rerender } = render(
        <Classifier
          subjectSetID='1'
          workflowSnapshot={workflowSnapshot}
        />,
        {
          wrapper: withStore(store)
        }
      )
      await when(() => store.subjectViewer.loadingState === asyncStates.success)
      rerender(
        <Classifier
          classifierStore={store}
          subjectSetID='2'
          workflowSnapshot={workflowSnapshot}
        />,
        {
          wrapper: withStore(store)
        }
      )
      workflow = store.workflows.active
      await when(() => store.subjectViewer.loadingState === asyncStates.loading)
      await when(() => store.subjectViewer.loadingState === asyncStates.success)
      taskTab = screen.getByRole('tab', { name: 'TaskArea.task'})
      tutorialTab = screen.getByRole('tab', { name: 'TaskArea.tutorial'})
      subjectImage = screen.getByRole('img', { name: `Subject ${subjectTwoSnapshot.id}` })
      tabPanel = screen.getByRole('tabpanel', { name: '1 Tab Contents'})
      const task = workflowSnapshot.tasks.T0
      const getAnswerInput = answer => within(tabPanel).queryByRole('radio', { name: answer.label })
      taskAnswers = task.answers.map(getAnswerInput)
    })

    after(function () {
      sinon.restore()
      nock.cleanAll()
    })

    it('should have a task tab', function () {
      expect(taskTab).to.exist
    })

    it('should have a tutorial tab', function () {
      expect(tutorialTab).to.exist
    })

    it('should show a subject image from the selected set', function () {
      expect(subjectImage.getAttribute('href')).to.equal('https://foo.bar/example2.png')
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
          expect(radioButton.disabled).to.equal(false)
        })
      })
    })
  })
})
