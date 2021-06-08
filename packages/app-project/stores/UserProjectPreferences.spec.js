import sinon from 'sinon'
import nock from 'nock'
import initStore from './initStore'
import asyncStates from '@zooniverse/async-states'
import { statsClient } from './YourStats'
import { expect } from 'chai'

describe.only('Stores > UserProjectPreferences', function () {
  let nockScope, rootStore;
  const project = {
    id: '2',
    display_name: 'Hello',
    slug: 'test/project'
  }
  const user = {
    id: '123'
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
    settings: {}
  }

  before(function () {
    sinon.stub(console, 'error')
    sinon.stub(statsClient, 'request')
    nockScope = nock('https://panoptes-staging.zooniverse.org/api')
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

    rootStore = initStore(true, {
      project,
      user
    })
    sinon.spy(rootStore.client.panoptes, 'get')
  })

  after(function () {
    console.error.restore()
    nock.cleanAll()
    rootStore.client.panoptes.get.restore()
    statsClient.request.restore()
    nockScope = null
    rootStore = null
  })

  it('should exist', function () {
    expect(rootStore.user.personalization.projectPreferences).to.be.an('object')
  })

  describe('Action > fetchResource', function () {
    describe('when there is a resource in the response', function () {
      it('should request the user project preferences resource', function () {
        const authorization = 'Bearer '
        const endpoint = '/project_preferences'
        const query = {
          project_id: '2',
          user_id: '123'
        }
        expect(rootStore.client.panoptes.get.withArgs(endpoint, query, { authorization })).to.have.been.calledOnce()
      })

      it('should store the UPP resource', function () {
        const storedUPP = Object.assign({}, upp, { error: undefined, loadingState: asyncStates.success })
        expect(rootStore.user.personalization.projectPreferences).to.deep.equal(storedUPP)
        expect(rootStore.user.personalization.projectPreferences.loadingState).to.equal(asyncStates.success)
      })

      it('should set the total classification count on the parent node', function () {
        expect(rootStore.user.personalization.totalClassificationCount).to.equal(23)
      })
    })

    describe('when there are no user project preferences in the response', function () {
      before(function () {
        nockScope = nock('https://panoptes-staging.zooniverse.org/api')
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

        rootStore = initStore(true, {
          project,
          user
        })
      })

      after(function () {
        nockScope = null
        rootStore = null
      })

      it('should not apply the UPP resource', function () {
        expect(rootStore.user.personalization.projectPreferences.loadingState).to.equal(asyncStates.success)
        expect(rootStore.user.personalization.projectPreferences.id).to.be.undefined()
      })

      it('should not set the total classification count on the parent node', function () {
        expect(rootStore.user.personalization.totalClassificationCount).to.equal(0)
      })
    })

    describe('when the request errors', function () {
      before(function () {
        nockScope = nock('https://panoptes-staging.zooniverse.org/api')
          .get('/project_preferences')
          .query(true)
          .replyWithError('Error!') // Note this is an error on the request object, not the response
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
      })

      it('should store the error', function () {
        expect(rootStore.user.personalization.projectPreferences.error).to.equal('Error!')
        expect(rootStore.user.personalization.projectPreferences.loadingState).to.equal(asyncStates.error)
      })
    })
  })
})