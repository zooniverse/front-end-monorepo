import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'
import { getEnv, types } from 'mobx-state-tree'
import merge from 'lodash/merge'

import ProjectStore from './ProjectStore'
import RootStore from './RootStore'
import UserProjectPreferencesStore from './UserProjectPreferencesStore'
import {
  ProjectFactory,
  TutorialFactory,
  UPPFactory,
  UserFactory
} from '../../test/factories'
import stubPanoptesJs from '../../test/stubPanoptesJs'

let rootStore
const project = ProjectFactory.build()
const upp = UPPFactory.build()
const user = UserFactory.build()
const token = '1234'
const etag = 'W/"8d26cb6718e250b"'

const clientStub = stubPanoptesJs({
  projects: project,
  project_preferences: upp
})

const clientStubWithoutUPP = stubPanoptesJs({
  projects: project,
  project_preferences: null
})

const authClientStubWithoutUser = {
  checkCurrent: sinon.stub().callsFake(() => Promise.resolve(null)),
  checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(null))
}

const authClientStubWithUser = {
  checkCurrent: sinon.stub().callsFake(() => Promise.resolve(user)),
  checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(token))
}

describe('Model > UserProjectPreferencesStore', function () {
  it('should exist', function () {
    expect(UserProjectPreferencesStore).to.be.an('object')
  })

  it('should remain in an initialized state if there is no project', function () {
    rootStore = RootStore.create({
      projects: ProjectStore.create(),
      userProjectPreferences: UserProjectPreferencesStore.create()
    }, { authClient: authClientStubWithoutUser, client: clientStub })

    expect(rootStore.userProjectPreferences.loadingState).to.equal(asyncStates.initialized)
  })

  it('should set project preferences if there is a user and a project', function (done) {
    rootStore = RootStore.create({
      projects: ProjectStore.create(),
      userProjectPreferences: UserProjectPreferencesStore.create()
    }, { authClient: authClientStubWithUser, client: clientStub })
    rootStore.projects.setActive(project.id)
      .then(() => {
        const uppInStore = rootStore.userProjectPreferences.active
        expect(uppInStore.toJSON()).to.deep.equal(upp)
      }).then(done, done)
  })

  describe('Actions > checkForUser', function () {
    it('should check for a user upon initialization when there is a project', function (done) {
      rootStore = RootStore.create({
        projects: ProjectStore.create(),
        userProjectPreferences: UserProjectPreferencesStore.create()
      }, { authClient: authClientStubWithoutUser, client: clientStub })

      rootStore.projects.setActive(project.id)
        .then(() => {
          expect(authClientStubWithoutUser.checkBearerToken).to.have.been.called
          expect(authClientStubWithoutUser.checkCurrent).to.have.been.called
        }).then(done, done)
    })

    it('should set to a successful state if there is no user', function (done) {
      rootStore = RootStore.create({
        projects: ProjectStore.create(),
        userProjectPreferences: UserProjectPreferencesStore.create()
      }, { authClient: authClientStubWithoutUser, client: clientStub })

      rootStore.projects.setActive(project.id)
        .then(() => {
          expect(rootStore.userProjectPreferences.loadingState).to.equal(asyncStates.success)
          expect(rootStore.userProjectPreferences.active).to.be.undefined
        }).then(done, done)
    })

    it('should set state to error upon error', function (done) {
      rootStore = RootStore.create({
        projects: ProjectStore.create(),
        userProjectPreferences: UserProjectPreferencesStore.create()
      }, { authClient: {
        checkBearerToken: () => Promise.reject('testing error handling'),
        checkCurrent: () => Promise.reject('testing error handling')
      },
      client: clientStub })

      rootStore.projects.setActive(project.id)
        .then(() => {
          expect(rootStore.userProjectPreferences.loadingState).to.equal(asyncStates.error)
        }).then(done, done)
    })

    it('should call fetchUPP if there is a user', function (done) {
      rootStore = RootStore.create({
        projects: ProjectStore.create(),
        userProjectPreferences: UserProjectPreferencesStore.create()
      }, { authClient: authClientStubWithUser, client: clientStub })
      const fetchUPPSpy = sinon.spy(rootStore.userProjectPreferences, 'fetchUPP')

      rootStore.projects.setActive(project.id)
        .then(() => {
          expect(fetchUPPSpy).to.have.been.called
        }).then(done, done)
    })
  })

  describe('Actions > fetchUPP', function () {
    let getSpy
    before(function () {
      getSpy = sinon.spy(clientStub.panoptes, 'get')
    })

    afterEach(function () {
      getSpy.resetHistory()
    })

    after(function () {
      getSpy.restore()
    })

    it('should set the loading state to loading then to success upon successful request', function (done) {
      rootStore = RootStore.create({
        projects: ProjectStore.create(),
        userProjectPreferences: UserProjectPreferencesStore.create()
      }, { authClient: authClientStubWithUser, client: clientStub })

      rootStore.projects.setActive(project.id)
        .then(() => {
          expect(rootStore.userProjectPreferences.loadingState).to.equal(asyncStates.success)
        }).then(done, done)

      expect(rootStore.userProjectPreferences.loadingState).to.equal(asyncStates.initialized)
    })

    it('should request for the user project preferences', function (done) {
      rootStore = RootStore.create({
        projects: ProjectStore.create(),
        userProjectPreferences: UserProjectPreferencesStore.create()
      }, { authClient: authClientStubWithUser, client: clientStub })

      rootStore.projects.setActive(project.id)
        .then(() => {
          expect(getSpy).to.have.been.calledWith(
            '/project_preferences',
            { project_id: project.id, user_id: user.id },
            { authorization: 'Bearer 1234' }
          )
        }).then(done, done)

      it('should call createUPP action upon successful request and there is not an existing UPP', function () {
        rootStore = RootStore.create({
          projects: ProjectStore.create(),
          userProjectPreferences: UserProjectPreferencesStore.create()
        }, {
          authClient: authClientStubWithUser, client: clientStubWithoutUPP })

        const createUPPSpy = sinon.spy(rootStore.userProjectPreferences, 'createUPP')
        rootStore.projects.createActive(project.id)
          .then(() => {
            expect(createUPPSpy).to.have.been.calledOnceWith(`Bearer ${token}`)
          }).then(createUPPSpy.restore()).then(done, done)
      })

      it('should call setUPP action upon successful request and there is an existing UPP', function () {
        rootStore = RootStore.create({
          projects: ProjectStore.create(),
          userProjectPreferences: UserProjectPreferencesStore.create()
        }, { authClient: authClientStubWithUser, client: clientStub })

        const setUPPSpy = sinon.spy(rootStore.userProjectPreferences, 'setUPP')
        rootStore.projects.setActive(project.id)
          .then(() => {
            expect(setUPPSpy).to.have.been.calledOnceWith(upp)
          }).then(setUPPSpy.restore()).then(done, done)
      })
    })
  })

  describe('Actions > createUPP', function () {
    it('should create new user project preferences', function (done) {
      const postStub = sinon.stub().callsFake(() => Promise.resolve({ body: { project_preferences: [upp] } }))
      rootStore = RootStore.create({
        projects: ProjectStore.create(),
        userProjectPreferences: UserProjectPreferencesStore.create()
      }, { authClient: authClientStubWithUser,
        client: {
          panoptes: {
            get: (url) => {
              if (url === `/projects/${project.id}`) return Promise.resolve({ body: { projects: [project] } })
              return Promise.resolve({ body: { project_preferences: [] } })
            },
            post: postStub
          }
        } })

      rootStore.projects.setActive(project.id)
        .then(() => {
          expect(postStub).to.have.been.calledOnceWith(
            '/project_preferences',
            { project_preferences: {
              links: { project: project.id },
              preferences: {}
            } },
            { authorization: `Bearer ${token}` }
          )
        }).then(done, done)
    })

    it('should set the loading state to error upon error', function (done) {
      rootStore = RootStore.create({
        projects: ProjectStore.create(),
        userProjectPreferences: UserProjectPreferencesStore.create()
      }, { authClient: authClientStubWithUser,
        client: {
          panoptes: {
            get: (url) => {
              if (url === `/projects/${project.id}`) return Promise.resolve({ body: { projects: [project] } })
              return Promise.resolve({ body: { project_preferences: [] } })
            },
            post: () => Promise.reject('testing error handling')
          }
        } })

      rootStore.projects.setActive(project.id)
        .then(() => {
          expect(rootStore.userProjectPreferences.loadingState).to.equal(asyncStates.error)
        }).then(done, done)
    })
  })

  describe('Actions > updateUPP', function () {
    let rootStore
    let changes
    let updatedUPP

    before(function () {
      const tutorial = TutorialFactory.build()
      const seen = new Date().toISOString()
      changes = {
        preferences: {
          tutorials_completed_at: {
            [tutorial.id]: seen
          }
        }
      }
      updatedUPP = merge({}, upp, changes)

      rootStore = RootStore.create({
        projects: ProjectStore.create(),
        userProjectPreferences: UserProjectPreferencesStore.create()
      }, {
        authClient: authClientStubWithUser,
        client: {
          panoptes: {
            get: sinon.stub().callsFake((url, params) => {
              if (url === `/projects/${project.id}`) {
                return Promise.resolve({ body: { projects: [project] } })
              }
              if (url === `/project_preferences` && params === { project_id: project.id, user_id: user.id }) {
                return Promise.resolve({ body: { project_preferences: [upp] } })
              }
              return Promise.resolve({ body: { project_preferences: [upp] }, headers: { etag } })
            }),
            put: sinon.stub().callsFake(() => Promise.resolve({ body: { project_preferences: [updatedUPP] } }))
          }
        }
      })
      rootStore.projects.setActive(project.id)
    })

    afterEach(function () {
      rootStore.userProjectPreferences.reset()
    })

    it('should update user project preferences', async function () {
      await rootStore.userProjectPreferences.updateUPP(changes)
      expect(rootStore.client.panoptes.put).to.have.been.calledOnceWith(
        `/project_preferences/${upp.id}`,
        {
          project_preferences: { preferences: updatedUPP.preferences }
        },
        { authorization: `Bearer ${token}`, etag }
      )

      expect(rootStore.userProjectPreferences.active).to.deep.equal(updatedUPP)
    })

    it('should re-request for the upp if the store does not have a stored etag header', async function () {
      expect(Object.keys(rootStore.userProjectPreferences.headers)).to.have.lengthOf(0)
      await rootStore.projects.setActive(project.id)
      await rootStore.userProjectPreferences.updateUPP(changes)
      expect(rootStore.client.panoptes.get.withArgs(
        `/project_preferences/${upp.id}`,
        null,
        { authorization: `Bearer ${token}` })
      ).to.have.been.calledOnce
      rootStore.client.panoptes.get.resetHistory()
    })

    it('should not re-request for the upp if the store has a stored etag header', async function () {
      await rootStore.userProjectPreferences.updateUPP(changes)
      expect(rootStore.client.panoptes.get.withArgs(
        `/project_preferences/${upp.id}`,
        null,
        { authorization: `Bearer ${token}` })
      ).to.not.have.been.called
      rootStore.client.panoptes.get.resetHistory()
    })
  })
})
