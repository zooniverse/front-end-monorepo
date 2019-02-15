import ProjectStore from './ProjectStore'
import RootStore from './RootStore'
import UserProjectPreferencesStore from './UserProjectPreferencesStore'
import {
  ProjectFactory,
  UPPFactory
} from '../../test/factories'
import stubPanoptesJs from '../../test/stubPanoptesJs'

const project = ProjectFactory.build({})

describe('Model > UserProjectPreferencesStore', function () {
  it('should exist', function () {
    expect(UserProjectPreferencesStore).to.be.an('object')
  })
})
