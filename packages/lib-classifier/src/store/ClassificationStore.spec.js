import Classification from './Classification'
import ClassificationStore from './ClassificationStore'
import Project from './Project'
import ProjectStore from './ProjectStore'
import Subject from './Subject'
import SubjectStore from './SubjectStore'
import UserProjectPreferences from './UserProjectPreferences'
import UserProjectPreferencesStore from './UserProjectPreferencesStore'
import Workflow from './Workflow'
import WorkflowStore from './WorkflowStore'

import { types } from 'mobx-state-tree'

let rootStore

const RootStub = types
  .model('RootStore', {
    classifications: ClassificationStore,
    projects: types.frozen(),
    subjects: types.frozen(),
    workflows: types.frozen() 
  })

describe.only('Model > ClassificationStore', function () {
  let subject
  before(function () {
    subject = Subject.create({
      already_seen: true,
      favorite: true,
      finished_workflow: true,
      id: '3333',
      locations: [
        { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/335/0/44a48dd2-23b3-4bb5-9aa4-0e803ac4fe6d.jpeg' }
      ],
      metadata: {},
      retired: false,
      selection_state: 'normal',
      user_has_finished_workflow: true
    })
    
    rootStore = RootStub.create({
      classifications: ClassificationStore.create({
        active: undefined,
        resources: {},
        type: 'classifications'
      }),
      projects: { active: { id: '1111' } },
      subjects: { active: undefined },
      workflows: { active: { id: '2222', version: 'v0.2' } }
    })
  })
  
  it('should exist', function () {
    expect(ClassificationStore).to.exist
    expect(ClassificationStore).to.be.an('object')
  })
  
  it('should create an empty Classification that matches a Subject', function () {
    rootStore.classifications.createClassification(subject)
    
    console.log('+++ C\n', rootStore.classifications.resources.get(0))
  })
})
