import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'

import RootStore from './RootStore'
import ProjectStore from './ProjectStore'
import FieldGuideStore from './FieldGuideStore'

import {
  ProjectFactory,
  FieldGuideFactory,
  FieldGuideMediumFactory
} from '../../test/factories'
import stubPanoptesJs from '../../test/stubPanoptesJs'

const fieldGuide = FieldGuideFactory.build()
const medium = FieldGuideMediumFactory.build()
const project = ProjectFactory.build()

describe('Model > FieldGuideStore', function () {
  let clientStub
  let rootStore
  it('should exist', function () {
    expect(FieldGuideStore).to.be.an('object')
  })

  it('should remain in an initialized state if there is no project', function () {
    clientStub = stubPanoptesJs({
      field_guides: undefined,
      projects: undefined
    })
    rootStore = RootStore.create({
      fieldGuide: FieldGuideStore.create(),
      projects: ProjectStore.create()
    }, { client: clientStub })

    expect(rootStore.tutorials.loadingState).to.equal(asyncStates.initialized)
  })
})