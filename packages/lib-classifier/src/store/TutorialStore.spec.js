import { getEnv, types } from 'mobx-state-tree'

import TutorialStore from './TutorialStore'
import {
  TutorialFactory,
  TutorialMediumFactory,
  WorkflowFactory
} from '../../test/factories'
import stubPanoptesJs from '../../test/stubPanoptesJs'

const tutorial = TutorialFactory.build()

const get = () => {
  return Promise.resolve({
    body: {
      tutorials: [tutorial]
    }
  })
}

const medium = TutorialMediumFactory.build()

const getAttachedImages = () => {
  return Promise.resolve({ 
    body: { 
      media: [medium]
    }
  })
}

const clientStub = { panoptes: { get }, tutorials: { getAttachedImages } }

const ROOT_STORE = types
  .model('RootStore', {
    tutorials: types.optional(TutorialStore, TutorialStore.create()),
    workflows: types.frozen({})
  })
  .views(self => ({
    get client() {
      return getEnv(self).client
    }
  }))

xdescribe('Model > TutorialStore', function () {
  it('should exist', function () {
    expect(TutorialStore).to.be.an('object')
  })

  describe('when the observer observes that there is a workflow', function () {
    let ROOT_STORE_INSTANCE = null
    let WORKFLOW = null
    before(function () {
      WORKFLOW = WorkflowFactory.build()

      ROOT_STORE_INSTANCE = ROOT_STORE.create({
        workflows: {
          active: WORKFLOW
        }
      }, { client: clientStub })
    })

    after(function () {
      ROOT_STORE_INSTANCE = null
      WORKFLOW = null
    })

    it('should set the resources', function () {
      console.log('tutorials store', ROOT_STORE_INSTANCE.tutorials.resources)
      const resources = ROOT_STORE_INSTANCE.tutorials.resources
      expect(resources).to.have.lengthOf(1)
      resources.forEach(resource => expect(resource).to.equal(tutorial))
    })
  })
})
