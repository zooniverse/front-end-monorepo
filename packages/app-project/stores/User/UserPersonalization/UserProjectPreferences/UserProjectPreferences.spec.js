import asyncStates from '@zooniverse/async-states'
import sinon from 'sinon'
import nock from 'nock'

import initStore from '@stores/initStore'
import { statsClient } from '../YourStats'
import UserProjectPreferences from './UserProjectPreferences'

describe('Stores > UserProjectPreferences', function () {
  let nockScope, rootStore
  const project = {
    id: '2',
    display_name: 'Hello',
    slug: 'test/project'
  }
  const user = {
    id: '123',
    login: 'test-user',
    personalization: {
      projectPreferences: {
        id: '5'
      }
    }
  }
  const initialState = {
    activity_count: undefined,
    activity_count_by_workflow: undefined,
    error: undefined,
    id: undefined,
    links: undefined,
    loadingState: asyncStates.initialized,
    preferences: undefined,
    settings: undefined
  }
  const upp = {
    activity_count: 23,
    activity_count_by_workflow: {},
    id: '555',
    links: {
      project: '2',
      user: '123'
    },
    preferences: {
      minicourses: undefined,
      selected_workflow: undefined,
      tutorials_completed_at: undefined
    },
    settings: {
      workflow_id: '999'
    }
  }
  const authorization = 'Bearer '
  const endpoint = '/project_preferences'
  const query = {
    project_id: '2',
    user_id: '123'
  }

  before(function () {
    sinon.stub(console, 'error')
    sinon.stub(statsClient, 'request')
    nockScope = nock('https://panoptes-staging.zooniverse.org/api')
      .get('/collections') // This is to prevent the collections store from making real requests
      .query(true)
      .reply(200)
      .post('/collections')
      .query(true)
      .reply(200)
    rootStore = initStore(true, {
      project,
      user
    })
    sinon.spy(rootStore.client.panoptes, 'get')
  })

  beforeEach(function () {
    rootStore.client.panoptes.get.resetHistory()
  })

  after(function () {
    nock.cleanAll()
    statsClient.request.restore()
    rootStore.client.panoptes.get.restore()
    console.error.restore()
    rootStore = null
  })

  it('should exist', function () {
    expect(UserProjectPreferences).to.be.an('object')
  })

  it('should not request for the resource if a snapshot has been applied', function () {
    expect(rootStore.client.panoptes.get.withArgs(endpoint, query, { authorization })).to.not.have.been.called()
  })

  describe('fetching the resource', function () {
    describe('when there is a resource in the response', function () {
      let nockScope
      before(function () {
        nockScope = nock('https://panoptes-staging.zooniverse.org/api')
          .persist()
          .get('/project_preferences')
          .query(true)
          .reply(200, {
            project_preferences: [
              upp
            ]
          })
          .get('/collections') // This is to prevent the collections store from making real requests
          .query(true)
          .reply(200)
          .post('/collections')
          .query(true)
          .reply(200)

        // resetting for a clean test from the prior upper scope
        rootStore.user.personalization.projectPreferences.reset()
      })

      after(function () {
        rootStore.user.personalization.projectPreferences.reset()
        rootStore.user.personalization.setTotalClassificationCount(0)
        nock.cleanAll()
        nockScope = null
      })

      it('should request the user project preferences resource', async function () {
        expect(rootStore.client.panoptes.get).to.not.have.been.called()
        expect(rootStore.user.personalization.projectPreferences.loadingState).to.equal(asyncStates.initialized)
        await rootStore.user.personalization.projectPreferences.fetchResource()
        expect(rootStore.client.panoptes.get.withArgs(endpoint, query, { authorization })).to.have.been.calledOnce()
        expect(rootStore.user.personalization.projectPreferences.loadingState).to.equal(asyncStates.success)
        rootStore.user.personalization.projectPreferences.reset()
      })

      it('should store the UPP resource', async function () {
        expect(rootStore.user.personalization.projectPreferences).to.deep.equal(initialState)
        await rootStore.user.personalization.projectPreferences.fetchResource()
        const storedUPP = Object.assign({}, upp, { error: undefined, loadingState: asyncStates.success })
        expect(rootStore.user.personalization.projectPreferences).to.deep.equal(storedUPP)
      })

      it('should set the total classification count on the parent node', function () {
        expect(rootStore.user.personalization.totalClassificationCount).to.equal(23)
      })
    })

    describe('when there are no user project preferences in the response', function () {
      let nockScope
      before(function () {
        nockScope = nock('https://panoptes-staging.zooniverse.org/api')
          .persist()
          .get('/project_preferences')
          .query(true)
          .reply(200, {
            project_preferences: []
          })
          .get('/collections') // This is to prevent the collections store from making real requests
          .query(true)
          .reply(200)
          .post('/collections')
          .query(true)
          .reply(200)
      })

      after(function () {
        nock.cleanAll()
        rootStore.user.personalization.projectPreferences.reset()
        nockScope = null
      })

      it('should not apply the UPP resource', async function () {
        expect(rootStore.user.personalization.projectPreferences.loadingState).to.equal(asyncStates.initialized)
        await rootStore.user.personalization.projectPreferences.fetchResource()
        expect(rootStore.user.personalization.projectPreferences.loadingState).to.equal(asyncStates.success)
        expect(rootStore.user.personalization.projectPreferences.id).to.be.undefined()
      })

      it('should not set the total classification count on the parent node', function () {
        expect(rootStore.user.personalization.totalClassificationCount).to.equal(0)
      })
    })

    describe('when the request errors', function () {
      let nockScope
      before(function () {
        nockScope = nock('https://panoptes-staging.zooniverse.org/api')
          .persist()
          .get('/project_preferences')
          .query(true)
          .replyWithError('Error!')
          .get('/collections') // This is to prevent the collections store from making real requests
          .query(true)
          .reply(200)
          .post('/collections')
          .query(true)
          .reply(200)

      })

      after(function () {
        rootStore.user.personalization.projectPreferences.reset()
        nock.cleanAll()
        nockScope = null
      })

      it('should store the error', async function () {
        expect(rootStore.user.personalization.projectPreferences.loadingState).to.equal(asyncStates.initialized)
        expect(rootStore.user.personalization.projectPreferences.error).to.be.undefined()
        await rootStore.user.personalization.projectPreferences.fetchResource()
        expect(rootStore.user.personalization.projectPreferences.error.message).to.equal('Error!')
        expect(rootStore.user.personalization.projectPreferences.loadingState).to.equal(asyncStates.error)
      })
    })

    describe('when the response errors', function () {
      let nockScope
      before(function () {
        nockScope = nock('https://panoptes-staging.zooniverse.org/api')
          .persist()
          .get('/project_preferences')
          .query(true)
          .reply(401, {
            project_preferences: []
          })
          .get('/collections') // This is to prevent the collections store from making real requests
          .query(true)
          .reply(200)
          .post('/collections')
          .query(true)
          .reply(200)

        rootStore.user.personalization.projectPreferences.reset()
      })

      after(function () {
        nockScope = null
      })

      it('should store the error', async function () {
        expect(rootStore.user.personalization.projectPreferences.loadingState).to.equal(asyncStates.initialized)
        expect(rootStore.user.personalization.projectPreferences.error).to.be.undefined()
        await rootStore.user.personalization.projectPreferences.fetchResource()
        expect(rootStore.user.personalization.projectPreferences.error.message).to.equal('Unauthorized')
        expect(rootStore.user.personalization.projectPreferences.loadingState).to.equal(asyncStates.error)
      })
    })
  })

  describe('Views > promptAssignment', function () {
    let nockScope

    before(function () {
      nockScope = nock('https://panoptes-staging.zooniverse.org/api')
        .get('/collections') // This is to prevent the collections store from making real requests
        .query(true)
        .reply(200)
        .post('/collections')
        .query(true)
        .reply(200)
    })

    after(function () {
      nockScope = null
      nock.cleanAll()
    })

    describe('when a workflow is not currently selected', function () {
      let rootStore
      const user = {
        id: '5',
        personalization: {
          projectPreferences: {
            id: '10',
            settings: {
              workflow_id: '555'
            }
          }
        }
      }

      before(function () {
        const project = {
          id: '2',
          links: {
            active_workflows: ['555']
          }
        }

        rootStore = initStore(true, {
          project,
          user
        })
      })

      after(function () {
        rootStore = null
      })

      it('should not prompt the user', function () {
        expect(rootStore.user.personalization.projectPreferences.promptAssignment()).to.be.false()
      })
    })

    describe('when the assigned workflow is not active', function () {
      before(function () {
        const project = {
          id: '2',
          links: {
            active_workflows: ['123']
          }
        }

        rootStore = initStore(true, {
          project,
          user
        })
      })

      it('should not prompt the user', function () {
        expect(rootStore.user.personalization.projectPreferences.promptAssignment('123')).to.be.false()
        expect(rootStore.project.links.active_workflows.includes('555')).to.be.false()
      })
    })

    describe('when the assigned workflow is the same as the current workflow', function () {
      before(function () {
        const project = {
          id: '2',
          links: {
            active_workflows: ['555']
          }
        }

        rootStore = initStore(true, {
          project,
          user
        })
      })

      it('should not prompt the user', function () {
        expect(rootStore.user.personalization.projectPreferences.promptAssignment('555')).to.be.false()
        expect(rootStore.project.links.active_workflows.includes('555')).to.be.true()
      })
    })

    describe('when the assigned workflow is not the same as the current workflow', function () {
      before(function () {
        const project = {
          id: '2',
          links: {
            active_workflows: ['555', '123']
          }
        }

        rootStore = initStore(true, {
          project,
          user
        })
      })

      it('should prompt the user', function () {
        expect(rootStore.user.personalization.projectPreferences.promptAssignment('123')).to.be.false()
        expect(rootStore.project.links.active_workflows.includes('123')).to.be.true()
        expect(rootStore.project.links.active_workflows.includes('555')).to.be.true()
      })
    })
  })
})