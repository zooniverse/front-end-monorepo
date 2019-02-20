import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'

import RootStore from './RootStore'
import TutorialStore from './TutorialStore'
import WorkflowStore from './WorkflowStore'
import {
  TutorialFactory,
  TutorialMediumFactory,
  WorkflowFactory
} from '../../test/factories'
import stubPanoptesJs from '../../test/stubPanoptesJs'

let rootStore

const tutorial = TutorialFactory.build()
const workflow = WorkflowFactory.build()

const panoptesClient = stubPanoptesJs({ tutorials: tutorial, workflows: workflow })

const medium = TutorialMediumFactory.build()

const getAttachedImages = () => {
  return Promise.resolve({
    body: {
      media: [medium]
    }
  })
}

const clientStub = Object.assign({}, panoptesClient,{ tutorials: { getAttachedImages } })

const authClientStubWithoutUser = {
  checkCurrent: sinon.stub().callsFake(() => Promise.resolve(null)),
  checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(null))
}

const authClientStubWithUser = {
  checkCurrent: sinon.stub().callsFake(() => Promise.resolve(user)),
  checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(token))
}

describe.only('Model > TutorialStore', function () {
  it('should exist', function () {
    expect(TutorialStore).to.be.an('object')
  })

  it('should remain in an initialized state if there is no workflow', function () {
    rootStore = RootStore.create({
      tutorials: TutorialStore.create(),
      workflows: WorkflowStore.create()
    }, { authClient: authClientStubWithoutUser, client: clientStub })

    expect(rootStore.tutorials.loadingState).to.equal(asyncStates.initialized)
  })

  it('should set the tutorial if there is a workflow', function (done) {
    rootStore = RootStore.create({
      tutorials: TutorialStore.create(),
      workflows: WorkflowStore.create()
    }, { authClient: authClientStubWithUser, client: clientStub })
    rootStore.workflows.setActive(workflow.id)
      .then(() => {
        const tutorialInStore = rootStore.tutorials.resources.get(tutorial.id)
        expect(tutorialInStore.toJSON()).to.deep.equal(tutorial)
      }).then(done, done)
  })

  describe('actions', function () {

  })
})
