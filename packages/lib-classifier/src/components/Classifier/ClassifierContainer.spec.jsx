import { within } from '@testing-library/dom'
import { render, screen, waitFor } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'
import { auth } from '@zooniverse/panoptes-js'
import { Grommet } from 'grommet'
import nock from 'nock'
import { Factory } from 'rosie'
import sinon from 'sinon'
import { SWRConfig } from 'swr'

import { cleanStore } from '@hooks/useHydratedStore.js'
import { ProjectFactory, SubjectFactory } from '@test/factories'
import { defaultAuthClient } from '@test/mockStore/mockStore.js'
import branchingWorkflow, { workflowStrings } from '@test/mockStore/branchingWorkflow.js'

import ClassifierContainer from '.'

describe('components > ClassifierContainer', function () {
  function mockPanoptesAPI() {
    return nock('https://panoptes-staging.zooniverse.org/api')
      .persist()
      .get('/field_guides')
      .reply(200, { field_guides: [] })
      .get('/tutorials')
      .query(true)
      .reply(200, { tutorials: [] })
  }

  class MockSubjectImage {
    constructor () {
      this.naturalHeight = 1000
      this.naturalWidth = 500
      const fakeLoadEvent = {
        ...new Event('load'),
        target: this
      }
      setTimeout(() => {
        this.onload(fakeLoadEvent)
      }, 500)
    }
  }

  function withGrommet(store) {
    /*
    The Classifier uses Grommet but isn't wrapped in the Grommet context,
    so add that here.
    Also reset the SWR cache between tests.
    https://swr.vercel.app/docs/advanced/cache#reset-cache-between-test-cases
    */
    return function Wrapper({ children }) {
      return (
        <SWRConfig value={{ provider: () => new Map() }}>
          <Grommet theme={zooTheme}>
            {children}
          </Grommet>
        </SWRConfig>
      )
    }
  }

  describe('anonymous volunteers', function () {
    let taskAnswers, firstSubjectsRequest, secondSubjectsRequest, workflowRequest
    const subjectSnapshot = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
    const workflowSnapshot = branchingWorkflow
    workflowSnapshot.strings = workflowStrings
    const projectSnapshot = ProjectFactory.build({
      links: {
        active_workflows: [workflowSnapshot.id],
        workflows: [workflowSnapshot.id]
      }
    })

    beforeEach(async function () {
      cleanStore()
      sinon.replace(window, 'Image', MockSubjectImage)
      const roles = []
      nock('https://panoptes-staging.zooniverse.org/oauth')
        .post('/token')
        .reply(401,{ error: 'invalid_grant' })

      mockPanoptesAPI()
        .get('/project_preferences')
        .query(true)
        .reply(200, { project_preferences: [] })
        .get('/project_roles')
        .query(true)
        .reply(200, { project_roles: [] })
        .get(`/translations`)
        .query(query => (
          query.language === 'en' &&
          query.translated_type === 'workflow' &&
          query.translated_id === workflowSnapshot.id.toString()
        ))
        .reply(200, { translations: [
          { language: 'en', strings: workflowStrings }
        ]})

      firstSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [subjectSnapshot, ...Factory.buildList('subject', 9)] })
      secondSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [...Factory.buildList('subject', 10)] })
      workflowRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get(`/workflows/${workflowSnapshot.id}`)
        .query(true)
        .reply(200, { workflows: [workflowSnapshot] })

      const checkBearerToken = sinon.stub().callsFake(() => Promise.resolve(''))
      const authClient = { ...defaultAuthClient, checkBearerToken }
      render(
        <ClassifierContainer
          authClient={authClient}
          project={projectSnapshot}
          workflowID={workflowSnapshot.id}
        />,
        {
          wrapper: withGrommet()
        }
      )
      const tabPanel = await screen.findByRole('tabpanel', { name: '1 Tab Contents'})
      const task = workflowSnapshot.tasks.T0
      const getAnswerInput = answer => within(tabPanel).findByRole('radio', { name: answer.label })
      taskAnswers = await Promise.all(task.answers.map(getAnswerInput))
    })

    afterEach(function () {
      sinon.restore()
      nock.cleanAll()
      cleanStore()
    })

    it('should be able to view active workflows', async function () {
      await waitFor(() => {
        const subjectImage = screen.getByRole('img', {name: `Subject ${subjectSnapshot.id}` })
        expect(subjectImage.getAttribute('href')).to.equal('https://foo.bar/example.png')
      })
      expect(workflowRequest.isDone()).to.equal(true)
      expect(firstSubjectsRequest.isDone()).to.equal(true)
      expect(secondSubjectsRequest.isDone()).to.equal(false)
      expect(taskAnswers).to.have.lengthOf(workflowSnapshot.tasks.T0.answers.length)
      taskAnswers.forEach(radioButton => {
        expect(radioButton.name).to.equal('T0')
        expect(radioButton.disabled).to.equal(false)
      })
    })
  })

  describe('signed-in volunteers without a stored Panoptes session', function () {
    let taskAnswers, firstSubjectsRequest, secondSubjectsRequest, workflowRequest
    const subjectSnapshot = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
    const workflowSnapshot = branchingWorkflow
    workflowSnapshot.strings = workflowStrings
    const projectSnapshot = ProjectFactory.build({
      links: {
        active_workflows: [workflowSnapshot.id],
        workflows: [workflowSnapshot.id]
      }
    })

    beforeEach(async function () {
      cleanStore()
      sinon.replace(window, 'Image', MockSubjectImage)
      const roles = []
      const mockUser = { id: 1, login: 'mockUser' }
      nock('https://panoptes-staging.zooniverse.org/oauth')
        .post('/token')
        .reply(200,{ access_token: 'mockToken', refresh_token: 'mockRefresh' })

      mockPanoptesAPI()
        .get('/project_preferences')
        .query(true)
        .reply(200, { project_preferences: [{
          activity_count: 24
        }] })
        .get('/project_roles')
        .query(true)
        .reply(200, { project_roles: [{ roles }] })
        .get('/me')
        .reply(200, { users: [mockUser] })
        .get(`/translations`)
        .query(query => (
          query.language === 'en' &&
          query.translated_type === 'workflow' &&
          query.translated_id === workflowSnapshot.id.toString()
        ))
        .reply(200, { translations: [
          { language: 'en', strings: workflowStrings }
        ]})

      firstSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [subjectSnapshot, ...Factory.buildList('subject', 9)] })
      secondSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [...Factory.buildList('subject', 10)] })
      workflowRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get(`/workflows/${workflowSnapshot.id}`)
        .query(true)
        .reply(200, { workflows: [workflowSnapshot] })

      const checkBearerToken = sinon.stub().callsFake(() => Promise.resolve(''))
      const authClient = { ...defaultAuthClient, checkBearerToken }
      render(
        <ClassifierContainer
          authClient={authClient}
          project={projectSnapshot}
          workflowID={workflowSnapshot.id}
        />,
        {
          wrapper: withGrommet()
        }
      )
      const tabPanel = await screen.findByRole('tabpanel', { name: '1 Tab Contents'})
      const task = workflowSnapshot.tasks.T0
      const getAnswerInput = answer => within(tabPanel).findByRole('radio', { name: answer.label })
      taskAnswers = await Promise.all(task.answers.map(getAnswerInput))
    })

    afterEach(function () {
      sinon.restore()
      nock.cleanAll()
      cleanStore()
    })

    it('should be able to view active workflows', async function () {
      await waitFor(() => {
        const subjectImage = screen.getByRole('img', {name: `Subject ${subjectSnapshot.id}` })
        expect(subjectImage.getAttribute('href')).to.equal('https://foo.bar/example.png')
      })
      expect(workflowRequest.isDone()).to.equal(true)
      expect(firstSubjectsRequest.isDone()).to.equal(true)
      expect(secondSubjectsRequest.isDone()).to.equal(false)
      expect(taskAnswers).to.have.lengthOf(workflowSnapshot.tasks.T0.answers.length)
      taskAnswers.forEach(radioButton => {
        expect(radioButton.name).to.equal('T0')
        expect(radioButton.disabled).to.equal(false)
      })
    })
  })

  describe('signed-in volunteers with a stored Panoptes session', function () {
    let taskAnswers, firstSubjectsRequest, secondSubjectsRequest, workflowRequest
    const subjectSnapshot = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
    const workflowSnapshot = branchingWorkflow
    workflowSnapshot.strings = workflowStrings
    const projectSnapshot = ProjectFactory.build({
      links: {
        active_workflows: [workflowSnapshot.id],
        workflows: [workflowSnapshot.id]
      }
    })

    beforeEach(async function () {
      cleanStore()
      sinon.replace(window, 'Image', MockSubjectImage)
      const roles = []
      mockPanoptesAPI()
        .get('/project_preferences')
        .query(true)
        .reply(200, { project_preferences: [{
          activity_count: 24
        }] })
        .get('/project_roles')
        .query(true)
        .reply(200, { project_roles: [{ roles }] })
        .get(`/translations`)
        .query(query => (
          query.language === 'en' &&
          query.translated_type === 'workflow' &&
          query.translated_id === workflowSnapshot.id.toString()
        ))
        .reply(200, { translations: [
          { language: 'en', strings: workflowStrings }
        ]})

      firstSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [subjectSnapshot, ...Factory.buildList('subject', 9)] })
      secondSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [...Factory.buildList('subject', 10)] })
      workflowRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get(`/workflows/${workflowSnapshot.id}`)
        .query(true)
        .reply(200, { workflows: [workflowSnapshot] })

      const mockUser = { id: 1, login: 'mockUser' }
      sinon.stub(auth, 'decodeJWT').resolves({
        user: mockUser,
        error: null
      })
      sinon.stub(auth, 'verify').resolves({
        data: mockUser
      })
      const checkBearerToken = sinon.stub().callsFake(() => Promise.resolve('mockAuth'))
      const authClient = { ...defaultAuthClient, checkBearerToken }
      render(
        <ClassifierContainer
          authClient={authClient}
          project={projectSnapshot}
          workflowID={workflowSnapshot.id}
        />,
        {
          wrapper: withGrommet()
        }
      )
      const tabPanel = await screen.findByRole('tabpanel', { name: '1 Tab Contents'})
      const task = workflowSnapshot.tasks.T0
      const getAnswerInput = answer => within(tabPanel).findByRole('radio', { name: answer.label })
      taskAnswers = await Promise.all(task.answers.map(getAnswerInput))
    })

    afterEach(function () {
      sinon.restore()
      nock.cleanAll()
      cleanStore()
    })

    it('should be able to view active workflows', async function () {
      await waitFor(() => {
        const subjectImage = screen.getByRole('img', {name: `Subject ${subjectSnapshot.id}` })
        expect(subjectImage.getAttribute('href')).to.equal('https://foo.bar/example.png')
      })
      expect(workflowRequest.isDone()).to.equal(true)
      expect(firstSubjectsRequest.isDone()).to.equal(true)
      expect(secondSubjectsRequest.isDone()).to.equal(false)
      expect(taskAnswers).to.have.lengthOf(workflowSnapshot.tasks.T0.answers.length)
      taskAnswers.forEach(radioButton => {
        expect(radioButton.name).to.equal('T0')
        expect(radioButton.disabled).to.equal(false)
      })
    })
  })

  describe('Project owner', function () {
    let taskAnswers, firstSubjectsRequest, secondSubjectsRequest, workflowRequest
    const subjectSnapshot = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
    const workflowSnapshot = branchingWorkflow
    workflowSnapshot.strings = workflowStrings
    const projectSnapshot = ProjectFactory.build({
      links: {
        active_workflows: [],
        workflows: [workflowSnapshot.id]
      }
    })

    beforeEach(async function () {
      cleanStore()
      sinon.replace(window, 'Image', MockSubjectImage)
      const roles = ['owner']
      mockPanoptesAPI()
        .get('/project_preferences')
        .query(true)
        .reply(200, { project_preferences: [{
          activity_count: 24
        }] })
        .get('/project_roles')
        .query(true)
        .reply(200, { project_roles: [{ roles }] })
        .get(`/translations`)
        .query(query => (
          query.language === 'en' &&
          query.translated_type === 'workflow' &&
          query.translated_id === workflowSnapshot.id.toString()
        ))
        .reply(200, { translations: [
          { language: 'en', strings: workflowStrings }
        ]})

      firstSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [subjectSnapshot, ...Factory.buildList('subject', 9)] })
      secondSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [...Factory.buildList('subject', 10)] })
      workflowRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get(`/workflows/${workflowSnapshot.id}`)
        .query(true)
        .reply(200, { workflows: [workflowSnapshot] })

      const mockUser = { id: 2, login: 'mockUser' }
      sinon.stub(auth, 'decodeJWT').resolves({
        user: mockUser,
        error: null
      })
      sinon.stub(auth, 'verify').resolves({
        data: mockUser
      })
      const checkBearerToken = sinon.stub().callsFake(() => Promise.resolve('mockAuth'))
      const authClient = { ...defaultAuthClient, checkBearerToken }
      render(
        <ClassifierContainer
          authClient={authClient}
          project={projectSnapshot}
          workflowID={workflowSnapshot.id}
        />,
        {
          wrapper: withGrommet()
        }
      )
      const tabPanel = await screen.findByRole('tabpanel', { name: '1 Tab Contents'})
      const task = workflowSnapshot.tasks.T0
      const getAnswerInput = answer => within(tabPanel).findByRole('radio', { name: answer.label })
      taskAnswers = await Promise.all(task.answers.map(getAnswerInput))
    })

    after(function () {
      sinon.restore()
      nock.cleanAll()
      cleanStore()
    })

    it('should be able to view inactive workflows', async function () {
      await waitFor(() => {
        const subjectImage = screen.getByRole('img', {name: `Subject ${subjectSnapshot.id}` })
        expect(subjectImage.getAttribute('href')).to.equal('https://foo.bar/example.png')
      })
      expect(workflowRequest.isDone()).to.equal(true)
      expect(firstSubjectsRequest.isDone()).to.equal(true)
      expect(secondSubjectsRequest.isDone()).to.equal(false)
      expect(taskAnswers).to.have.lengthOf(workflowSnapshot.tasks.T0.answers.length)
      taskAnswers.forEach(radioButton => {
        expect(radioButton.name).to.equal('T0')
        expect(radioButton.disabled).to.equal(false)
      })
    })
  })

  describe('Project collaborator', function () {
    let taskAnswers, firstSubjectsRequest, secondSubjectsRequest, workflowRequest
    const subjectSnapshot = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
    const workflowSnapshot = branchingWorkflow
    workflowSnapshot.strings = workflowStrings
    const projectSnapshot = ProjectFactory.build({
      links: {
        active_workflows: [],
        workflows: [workflowSnapshot.id]
      }
    })

    beforeEach(async function () {
      cleanStore()
      sinon.replace(window, 'Image', MockSubjectImage)
      const roles = ['collaborator']
      mockPanoptesAPI()
        .get('/project_preferences')
        .query(true)
        .reply(200, { project_preferences: [{
          activity_count: 24
        }] })
        .get('/project_roles')
        .query(true)
        .reply(200, { project_roles: [{ roles }] })
        .get(`/translations`)
        .query(query => (
          query.language === 'en' &&
          query.translated_type === 'workflow' &&
          query.translated_id === workflowSnapshot.id.toString()
        ))
        .reply(200, { translations: [
          { language: 'en', strings: workflowStrings }
        ]})

      firstSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [subjectSnapshot, ...Factory.buildList('subject', 9)] })
      secondSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [...Factory.buildList('subject', 10)] })
      workflowRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get(`/workflows/${workflowSnapshot.id}`)
        .query(true)
        .reply(200, { workflows: [workflowSnapshot] })

      const mockUser = { id: 3, login: 'mockUser' }
      sinon.stub(auth, 'decodeJWT').resolves({
        user: mockUser,
        error: null
      })
      sinon.stub(auth, 'verify').resolves({
        data: mockUser
      })
      const checkBearerToken = sinon.stub().callsFake(() => Promise.resolve('mockAuth'))
      const authClient = { ...defaultAuthClient, checkBearerToken }
      render(
        <ClassifierContainer
          authClient={authClient}
          project={projectSnapshot}
          workflowID={workflowSnapshot.id}
        />,
        {
          wrapper: withGrommet()
        }
      )
      const tabPanel = await screen.findByRole('tabpanel', { name: '1 Tab Contents'})
      const task = workflowSnapshot.tasks.T0
      const getAnswerInput = answer => within(tabPanel).findByRole('radio', { name: answer.label })
      taskAnswers = await Promise.all(task.answers.map(getAnswerInput))
    })

    after(function () {
      sinon.restore()
      nock.cleanAll()
      cleanStore()
    })

    it('should be able to view inactive workflows', async function () {
      await waitFor(() => {
        const subjectImage = screen.getByRole('img', {name: `Subject ${subjectSnapshot.id}` })
        expect(subjectImage.getAttribute('href')).to.equal('https://foo.bar/example.png')
      })
      expect(workflowRequest.isDone()).to.equal(true)
      expect(firstSubjectsRequest.isDone()).to.equal(true)
      expect(secondSubjectsRequest.isDone()).to.equal(false)
      expect(taskAnswers).to.have.lengthOf(workflowSnapshot.tasks.T0.answers.length)
      taskAnswers.forEach(radioButton => {
        expect(radioButton.name).to.equal('T0')
        expect(radioButton.disabled).to.equal(false)
      })
    })
  })

  describe('Project tester', function () {
    let taskAnswers, firstSubjectsRequest, secondSubjectsRequest, workflowRequest
    const subjectSnapshot = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
    const workflowSnapshot = branchingWorkflow
    workflowSnapshot.strings = workflowStrings
    const projectSnapshot = ProjectFactory.build({
      links: {
        active_workflows: [],
        workflows: [workflowSnapshot.id]
      }
    })

    beforeEach(async function () {
      cleanStore()
      sinon.replace(window, 'Image', MockSubjectImage)
      const roles = ['tester']
      mockPanoptesAPI()
        .get('/project_preferences')
        .query(true)
        .reply(200, { project_preferences: [{
          activity_count: 24
        }] })
        .get('/project_roles')
        .query(true)
        .reply(200, { project_roles: [{ roles }] })
        .get(`/translations`)
        .query(query => (
          query.language === 'en' &&
          query.translated_type === 'workflow' &&
          query.translated_id === workflowSnapshot.id.toString()
        ))
        .reply(200, { translations: [
          { language: 'en', strings: workflowStrings }
        ]})

      firstSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [subjectSnapshot, ...Factory.buildList('subject', 9)] })
      secondSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [...Factory.buildList('subject', 10)] })
      workflowRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get(`/workflows/${workflowSnapshot.id}`)
        .query(true)
        .reply(200, { workflows: [workflowSnapshot] })

      const mockUser = { id: 4, login: 'mockUser' }
      sinon.stub(auth, 'decodeJWT').resolves({
        user: mockUser,
        error: null
      })
      sinon.stub(auth, 'verify').resolves({
        data: mockUser
      })
      const checkBearerToken = sinon.stub().callsFake(() => Promise.resolve('mockAuth'))
      const authClient = { ...defaultAuthClient, checkBearerToken }
      render(
        <ClassifierContainer
          authClient={authClient}
          project={projectSnapshot}
          workflowID={workflowSnapshot.id}
        />,
        {
          wrapper: withGrommet()
        }
      )
      const tabPanel = await screen.findByRole('tabpanel', { name: '1 Tab Contents'})
      const task = workflowSnapshot.tasks.T0
      const getAnswerInput = answer => within(tabPanel).findByRole('radio', { name: answer.label })
      taskAnswers = await Promise.all(task.answers.map(getAnswerInput))
    })

    after(function () {
      sinon.restore()
      nock.cleanAll()
      cleanStore()
    })

    it('should be able to view inactive workflows', async function () {
      await waitFor(() => {
        const subjectImage = screen.getByRole('img', {name: `Subject ${subjectSnapshot.id}` })
        expect(subjectImage.getAttribute('href')).to.equal('https://foo.bar/example.png')
      })
      expect(workflowRequest.isDone()).to.equal(true)
      expect(firstSubjectsRequest.isDone()).to.equal(true)
      expect(secondSubjectsRequest.isDone()).to.equal(false)
      expect(taskAnswers).to.have.lengthOf(workflowSnapshot.tasks.T0.answers.length)
      taskAnswers.forEach(radioButton => {
        expect(radioButton.name).to.equal('T0')
        expect(radioButton.disabled).to.equal(false)
      })
    })
  })

  describe('admins: in admin mode', function () {
    let taskAnswers, firstSubjectsRequest, secondSubjectsRequest, workflowRequest
    const subjectSnapshot = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
    const workflowSnapshot = branchingWorkflow
    workflowSnapshot.strings = workflowStrings
    const projectSnapshot = ProjectFactory.build({
      links: {
        active_workflows: [],
        workflows: [workflowSnapshot.id]
      }
    })

    beforeEach(async function () {
      cleanStore()
      sinon.replace(window, 'Image', MockSubjectImage)
      const roles = []
      mockPanoptesAPI()
        .get('/project_preferences')
        .query(true)
        .reply(200, { project_preferences: [{
          activity_count: 24
        }] })
        .get('/project_roles')
        .query(true)
        .reply(200, { project_roles: [{ roles }] })
        .get(`/translations`)
        .query(query => (
          query.language === 'en' &&
          query.translated_type === 'workflow' &&
          query.translated_id === workflowSnapshot.id.toString()
        ))
        .reply(200, { translations: [
          { language: 'en', strings: workflowStrings }
        ]})

      firstSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [subjectSnapshot, ...Factory.buildList('subject', 9)] })
      secondSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [...Factory.buildList('subject', 10)] })
      workflowRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get(`/workflows/${workflowSnapshot.id}`)
        .query(true)
        .reply(200, { workflows: [workflowSnapshot] })

      const mockUser = { id: 5, login: 'mockUser', admin: true }
      sinon.stub(auth, 'decodeJWT').resolves({
        user: mockUser,
        error: null
      })
      sinon.stub(auth, 'verify').resolves({
        data: mockUser
      })
      const checkBearerToken = sinon.stub().callsFake(() => Promise.resolve('mockAuth'))
      const authClient = { ...defaultAuthClient, checkBearerToken }
      render(
        <ClassifierContainer
          adminMode
          authClient={authClient}
          project={projectSnapshot}
          workflowID={workflowSnapshot.id}
        />,
        {
          wrapper: withGrommet()
        }
      )
      const tabPanel = await screen.findByRole('tabpanel', { name: '1 Tab Contents'})
      const task = workflowSnapshot.tasks.T0
      const getAnswerInput = answer => within(tabPanel).findByRole('radio', { name: answer.label })
      taskAnswers = await Promise.all(task.answers.map(getAnswerInput))
    })

    afterEach(function () {
      sinon.restore()
      nock.cleanAll()
      cleanStore()
    })

    it('should be able to view inactive workflows', async function () {
      await waitFor(() => {
        const subjectImage = screen.getByRole('img', {name: `Subject ${subjectSnapshot.id}` })
        expect(subjectImage.getAttribute('href')).to.equal('https://foo.bar/example.png')
      })
      expect(workflowRequest.isDone()).to.equal(true)
      expect(firstSubjectsRequest.isDone()).to.equal(true)
      expect(secondSubjectsRequest.isDone()).to.equal(false)
      expect(taskAnswers).to.have.lengthOf(workflowSnapshot.tasks.T0.answers.length)
      taskAnswers.forEach(radioButton => {
        expect(radioButton.name).to.equal('T0')
        expect(radioButton.disabled).to.equal(false)
      })
    })
  })

  describe('admins: not in admin mode', function () {
    let taskAnswers, firstSubjectsRequest, secondSubjectsRequest, userRequests, workflowRequest
    const subjectSnapshot = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
    const workflowSnapshot = branchingWorkflow
    workflowSnapshot.strings = workflowStrings
    const projectSnapshot = ProjectFactory.build({
      links: {
        active_workflows: [],
        workflows: [workflowSnapshot.id]
      }
    })

    beforeEach(async function () {
      cleanStore()
      sinon.replace(window, 'Image', MockSubjectImage)
      const roles = []
      mockPanoptesAPI()
        .get(`/translations`)
        .query(query => (
          query.language === 'en' &&
          query.translated_type === 'workflow' &&
          query.translated_id === workflowSnapshot.id.toString()
        ))
        .reply(200, { translations: [
          { language: 'en', strings: workflowStrings }
        ]})
      userRequests = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/project_preferences')
        .query(true)
        .reply(200, { project_preferences: [{
          activity_count: 24
        }] })
        .get('/project_roles')
        .query(true)
        .reply(200, { project_roles: [{ roles }] })

      firstSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [subjectSnapshot, ...Factory.buildList('subject', 9)] })
      secondSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [...Factory.buildList('subject', 10)] })
      workflowRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get(`/workflows/${workflowSnapshot.id}`)
        .query(true)
        .reply(200, { workflows: [workflowSnapshot] })

      const mockUser = { id: 6, login: 'mockUser', admin: true }
      sinon.stub(auth, 'decodeJWT').resolves({
        user: mockUser,
        error: null
      })
      sinon.stub(auth, 'verify').resolves({
        data: mockUser
      })
      const checkBearerToken = sinon.stub().callsFake(() => Promise.resolve('mockAuth'))
      const authClient = { ...defaultAuthClient, checkBearerToken }
      render(
        <ClassifierContainer
          authClient={authClient}
          project={projectSnapshot}
          workflowID={workflowSnapshot.id}
        />,
        {
          wrapper: withGrommet()
        }
      )
    })

    afterEach(function () {
      sinon.restore()
      nock.cleanAll()
      cleanStore()
    })

    it('should not request a workflow', async function () {
      await waitFor(() => expect(userRequests.isDone()).to.equal(true))
      expect(workflowRequest.isDone()).to.equal(false)
    })

    it('should not load the subject queue', async function () {
      await waitFor(() => expect(userRequests.isDone()).to.equal(true))
      expect(firstSubjectsRequest.isDone()).to.equal(false)
      expect(secondSubjectsRequest.isDone()).to.equal(false)
    })
  })

  describe('when the locale changes', function () {
    let taskAnswers, firstSubjectsRequest, secondSubjectsRequest, translationRequests, workflowRequest
    const subjectSnapshot = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
    const workflowSnapshot = branchingWorkflow
    workflowSnapshot.strings = workflowStrings
    const projectSnapshot = ProjectFactory.build({
      links: {
        active_workflows: [workflowSnapshot.id],
        workflows: [workflowSnapshot.id]
      }
    })

    beforeEach(async function () {
      cleanStore()
      sinon.replace(window, 'Image', MockSubjectImage)
      const roles = []
      const frenchStrings = { ...workflowStrings }
      Object.entries(frenchStrings).forEach(([key, value]) => {
        const frenchValue = `${value} - French translation.`
        frenchStrings[key] = frenchValue
      })
      const frenchSnapshot = { ...workflowSnapshot, strings: frenchStrings }

      nock('https://panoptes-staging.zooniverse.org/oauth')
        .post('/token')
        .reply(401,{ error: 'invalid_grant' })

      mockPanoptesAPI()
        .get('/project_preferences')
        .query(true)
        .reply(200, { project_preferences: [] })
        .get('/project_roles')
        .query(true)
        .reply(200, { project_roles: [] })

      firstSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [subjectSnapshot, ...Factory.buildList('subject', 9)] })
      secondSubjectsRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects/queued')
        .query(true)
        .reply(200, { subjects: [...Factory.buildList('subject', 10)] })
      workflowRequest = nock('https://panoptes-staging.zooniverse.org/api')
        .get(`/workflows/${workflowSnapshot.id}`)
        .query(true)
        .reply(200, { workflows: [workflowSnapshot] })

      translationRequests = nock('https://panoptes-staging.zooniverse.org/api')
        .get(`/translations`)
        .query(query => (
          query.language === 'en' &&
          query.translated_type === 'workflow' &&
          query.translated_id === workflowSnapshot.id.toString()
        ))
        .reply(200, { translations: [
          { language: 'en', strings: workflowStrings }
        ]})
        .get(`/translations`)
        .query(query => (
          query.language === 'fr,en' &&
          query.translated_type === 'workflow' &&
          query.translated_id === workflowSnapshot.id.toString()
        ))
        .reply(200, { translations: [
          { language: 'fr', strings: frenchStrings },
          { language: 'en', strings: workflowStrings }
        ]})

      const checkBearerToken = sinon.stub().callsFake(() => Promise.resolve(''))
      const authClient = { ...defaultAuthClient, checkBearerToken }

      const { rerender } = render(
        <ClassifierContainer
          authClient={authClient}
          locale='en'
          project={projectSnapshot}
          workflowID={workflowSnapshot.id}
        />,
        {
          wrapper: withGrommet()
        }
      )
      await waitFor(() => {
        const subjectImage = screen.getByRole('img', {name: `Subject ${subjectSnapshot.id}` })
        expect(subjectImage.getAttribute('href')).to.equal('https://foo.bar/example.png')
      })

      // locale changes when the language menu changes.
      rerender(
        <ClassifierContainer
          authClient={authClient}
          locale='fr'
          project={projectSnapshot}
          workflowID={workflowSnapshot.id}
        />,
      )
      const tabPanel = await screen.findByRole('tabpanel', { name: '1 Tab Contents'})
      const task = frenchSnapshot.tasks.T0
      const getAnswerInput = (answer, index) => within(tabPanel).findByRole('radio', { name: frenchSnapshot.strings[`tasks.T0.answers.${index}.label`] })
      taskAnswers = await Promise.all(task.answers.map(getAnswerInput))
    })

    afterEach(function () {
      sinon.restore()
      nock.cleanAll()
    })

    it('should show tasks in French', async function () {
      expect(workflowRequest.isDone()).to.equal(true)
      expect(firstSubjectsRequest.isDone()).to.equal(true)
      expect(secondSubjectsRequest.isDone()).to.equal(false)
      expect(taskAnswers).to.have.lengthOf(workflowSnapshot.tasks.T0.answers.length)
      taskAnswers.forEach(radioButton => {
        expect(radioButton.name).to.equal('T0')
        expect(radioButton.disabled).to.equal(false)
      })
      expect(translationRequests.isDone()).to.equal(true)
    })
  })
})
